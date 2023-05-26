const puppeteer = require('puppeteer')
// const cookieObjects = require('./cookie');


 async function checkList() {
        const browser = await puppeteer.launch({
          executablePath: './chrome-win/chrome.exe',
          headless: false
        });
        const page = await browser.newPage();
        await page.setViewport({
          width: 1280,
          height: 800
        }); // 设置浏览器视窗大小
        // cookieObjects.forEach((cookie) => {
        //   page.setCookie(cookie);
        // });
        
        // 5. 监听接口，根据返回值来判断状态
        function getResponseBody(resolve, reject){
          page.on('response',async (response) => {
            if (['xhr', 'fetch'].includes(response.request().resourceType())) {
              if (response.url().indexOf('/short_msg/publish') >= 0) {
                if (response.ok()) {
                  let body = await response.json()
                  console.log(body)
                  if (body.err_msg !== 'success') {
                    reject(body)
                  } else {
                    resolve(true)
                  }
                }
                reject(false)
              }
            }
          })
        }
        // 5. 监听接口，根据返回值来判断状态
        waitForResponse = new Promise(getResponseBody)
        // 1. 等待页面跳转完成
        await page.goto("https://juejin.cn/pins", {
          waitUntil: 'networkidle0' // 接口都加载完 这样页面数据就ok了
      });
        // await page.content()
        // 进入新鲜事
        const newBtn = '#juejin > div.view-container.pin_container > main > main > div.dock.shadow > nav > div:nth-child(4) > div > a:nth-child(1)'
        // 2. 等待某个元素出现
        await page.waitForSelector(newBtn)
        
        
        const [response] = await Promise.all([
          page.waitForNavigation(),
          page.click(newBtn),
        ]);
        const inputSel = '.auth-card > div'
        // 3. 输入沸点内容
        await page.type(inputSel, 'hi')
      
        const submitBtn = '.submit > button'
        // 4. 点击按钮进行提交
        await page.click(submitBtn)
        // 5. 监听接口，根据返回值来判断状态
        return waitForResponse
      }
      

      module.exports = checkList