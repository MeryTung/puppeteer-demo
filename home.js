const puppeteer = require('puppeteer')
const fs = require('fs')

// const cookies = require('./cookie')
async function home(){
        const browser = await puppeteer.launch({
                executablePath: './chrome-win/chrome.exe',
                headless:false
        })
        const page = await browser.newPage()
        await page.setViewport({
                width:1280,
                height:800
        })
        // cookies.forEach(cookie=>{
        //         page.setCookie(cookie)
        // })
        await page.goto('https://juejin.cn',{
                waitUntil:'networkidle0'
        })
        return true
}

module.exports = home
