const puppeteer = require("puppeteer");
//  const cookieObecjts = require('./cookie.js');
async function start(){
  const browser = await puppeteer.launch({executablePath: './chrome-win/chrome.exe', headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 }); // 设置浏览器视窗大小

//   cookieObecjts.forEach((cookie) => {
//       page.setCookie(cookie);
//   });
  await page.goto("https://juejin.cn/pins");
  await page.waitForSelector("#juejin > div.view-container.pin_container > main > main > div.stream.no-topic-list.no-hot-new-tag > div.stream-wrapper > div.pin-list-view > div > ul  > li");
  

  let pins = []
  pins = await page.evaluate((pins) => {
    const list = document.querySelectorAll('#juejin > div.view-container.pin_container > main > main > div.stream.no-topic-list.no-hot-new-tag > div.stream-wrapper > div.pin-list-view > div > ul > li')
    list.forEach(item => {
      console.log(item)
      pins.push({
        title: item.querySelector('.username').innerText,
        description: item.querySelector('.content').innerText
      })
    })
    return pins
  }, pins)
  console.log('------------')
  console.log(pins)
  return pins
  
}

module.exports = start
