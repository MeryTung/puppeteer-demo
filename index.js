const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

let getNewList = async () => {
        const browser = await puppeteer.launch({
                 executablePath: './chrome-win/chrome.exe',
                // args: ['--no-sandbox'],
                // dumpio: false
                headless: false,
                devtools: true,
        })
        
        const page = await browser.newPage()

        await page.goto('https://blog.csdn.net/qq_45484646?type=blog', {
  // 超时时间，0为禁用超时
  // timeout: 0,
});

// 相当于浏览器中的document.querySelectorAll，但是返回的是 ElementHandle 类型
const articles = await page.$$('.mainContent article a');
// 用于保存一组Promise，方便Promise.all直接处理
const collects = [];

// 获取文章信息

for (const article of articles) {
  // evaluate()，对Page上下文进行计算，并返回一个值
  collects.push(await page.evaluate(article => {
    // 这里的代码是放到Page 上下文中执行的，所以在这里是不能访问外部的作用域（也就是Node环境）

    // 获取文章标题节点
    const title = article.querySelector('h4');
    // 获取文章描述节点
    const description = article.querySelector('.blog-list-content');
    // 获取文章阅读数节点
    const readNum = article.querySelector('.blog-list-footer .view-num');

    // 提取我们需要的文章信息
    return {
      title: title?.innerText, 
      description: description?.innerText, 
      readNum: readNum?.childNodes[0].textContent,
    };
  }, article));
}


// 等待所有数据成功返回
     const data = await Promise.all(collects);
        await browser.close()
        return data
}


getNewList().then(res=>{
        let list = JSON.stringify(res);
        let file = path.join(__dirname,'newList.json');
        fs.writeFile(file,list,err=>{
                if(err){
                        console.log(err)
                }else{
                        console.log('success')
                }
        })
})
