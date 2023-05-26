const puppeteer = require("puppeteer");
const cookieObjects = require('./cookie');
(async  () => {
  const puppeteer = require('puppeteer');
const browser = await puppeteer.launch({ executablePath: './chrome-win/chrome.exe',headless: false })
const page = await browser.newPage()
const navigationPromise = page.waitForNavigation()

await page.goto('https://juejin.cn/')

await page.setViewport({ width: 1745, height: 852 })

await page.waitForSelector('.nav-list > .right-side-nav > .nav-item > .login-button-wrap > .login-button')
await page.click('.nav-list > .right-side-nav > .nav-item > .login-button-wrap > .login-button')

await page.waitForSelector('.login-main > .panel > .input-group > .dropdown-box > .input')
await page.click('.login-main > .panel > .input-group > .dropdown-box > .input')

await page.waitForSelector('.auth-body > .login-body > .login-main > .other-login-box > .clickable')
await page.click('.auth-body > .login-body > .login-main > .other-login-box > .clickable')

await page.waitForSelector('.login-main > .panel > .input-group > .focus > .input')
await page.click('.login-main > .panel > .input-group > .focus > .input')

await page.type('.login-main > .panel > .input-group > .focus > .input', '1234567')

await page.waitForSelector('.login-main > .panel > .input-group > .input-box > .login-password')
await page.click('.login-main > .panel > .input-group > .input-box > .login-password')

await page.type('.login-main > .panel > .input-group > .input-box > .login-password', '1234567')

await page.waitForSelector('.auth-body > .login-body > .login-main > .panel > .btn')
await page.click('.auth-body > .login-body > .login-main > .panel > .btn')

await page.waitForSelector('#secsdk-captcha-drag-wrapper > .secsdk-captcha-drag-icon > .sc-kkGfuU > svg > path')
await page.click('#secsdk-captcha-drag-wrapper > .secsdk-captcha-drag-icon > .sc-kkGfuU > svg > path')

await navigationPromise
})()
