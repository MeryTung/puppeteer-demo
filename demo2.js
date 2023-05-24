//OpenAI写的一段代码
const puppeteer = require('puppeteer');

async function run() {
  const searchTerm = 'OpenAI'; // 要搜索的关键词

  // 启动浏览器实例
  const browser = await puppeteer.launch({
        executablePath: './chrome-win/chrome.exe',
        headless:false,
        devtools:true
  });
  const page = await browser.newPage();

  // 导航到百度首页
  await page.goto('https://www.baidu.com');

  // 在搜索框中输入关键词并提交搜索
  await page.type('#kw', searchTerm);
  await page.click('#su');

  // 等待搜索结果加载完成
  await page.waitForSelector('.result');

  // 提取搜索结果
  const searchResults = await page.$$eval('.result', (results) => {
        console.log(results);
    return results.map((result) => {
      const titleElement = result.querySelector('.t');
      const title = titleElement.textContent;
      const link = titleElement.href;
      const description = result.querySelector('.c-abstract').textContent;

      return { title, link, description };
    });
  });

  // 打印搜索结果
  searchResults.forEach((result, index) => {
    console.log(`Result ${index + 1}:`);
    console.log(`Title: ${result.title}`);
    console.log(`Link: ${result.link}`);
    console.log(`Description: ${result.description}`);
    console.log('---');
  });

  // 关闭浏览器实例
  await browser.close();
}

run();