const puppeteer = require('puppeteer');

const sleep = async (ms) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms)
  });
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.linkedin.com/login');

  await page.waitForSelector("#username");

  await page.type("#username", "thiago.adsix@gmail.com");
  await page.type("#password", "deusefiel123.com");

  await sleep(500);

  await page.click(".login__form_action_container");

  await page.waitForNavigation();

  await page.goto("https://www.linkedin.com/mynetwork/invite-connect/connections/");

  console.log(await page.$("#ember50 > ul > li"));

  // await page.evaluate(() => {
  //   document.querySelector("#ember50 > ul");
  // });

  // await page.click(buttonSender);
  // await page.click("#ember65");

  console.log("login done");
  await page.screenshot({ path: 'example.png', fullPage: true });

  await browser.close();
})();