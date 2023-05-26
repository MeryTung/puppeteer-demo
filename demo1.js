const puppeteer = require('puppeteer')
const fs = require('fs')
const os = require('os')


let list = async () => {
       const browser = await puppeteer.launch({
        executablePath: './chrome-win/chrome.exe',
            headless:false,
            devtools:true
       })
       const page =await browser.newPage()
       await page.goto('https://www.baidu.com')
       const $input = await page.$('#kw')
       await $input.type('花艺培训')
       const $button = await page.$('#su')
       await $button.click()

       const itemList = await page.waitForSelector('#content_left')

       const collects = []

       
       const articles = await itemList.$$('.c-container')

       for(let article of articles) {
                collects.push(await page.evaluate(article=>{

                        const title = article.querySelector('a')
                        const description = article.querySelector('.ec_desc span')
                        
                        return {
                        title: (title?.innerHTML).replace(/<[^>]+>/g,''),
                        description: description?.innerHTML
                        }
                },article))
       }

        const data = await Promise.all(collects)
        return data
       await browser.close()

}

module.exports = list