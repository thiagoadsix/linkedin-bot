const puppeteer = require("puppeteer");

module.exports = class BotMessagesService {
  async login(username, password) {
    const browser = await puppeteer.launch({ headless: false, args: ['--disable-features=site-per-process'], defaultViewport: { width: 1920, height: 1080 } });
    const page = await browser.newPage();

    await page.goto("https://www.linkedin.com/login", {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector("#username");
    await page.type("#username", username, { delay: 250 });
    await page.waitFor(1500);
    await page.type("#password", password, { delay: 250 });
    await page.waitFor(1500);
    await page.click(".login__form_action_container");
    await page.waitForNavigation();
    await page.goto("https://www.linkedin.com/search/results/people/", {
      waitUntil: "networkidle2",
    });
    await page.mouse.click(1000, 72, { button: "left" });
    await page.waitFor(5000);

    await page.mouse.click(1050, 210, { button: "left" });
    await page.keyboard.type("Itália", { delay: 250 });
    await page.waitFor(1500);
    await page.mouse.click(1050, 250, { button: "left" });
    await page.waitFor(1500);

    await page.mouse.click(800, 535, { button: "left" });
    await page.keyboard.type("Design", { delay: 250 });
    await page.waitFor(1500);
    await page.mouse.click(800, 560, { button: "left" });
    await page.waitFor(1500);

    // await page.keyboard.type("Itália");
    await page.mouse.click(1450, 75, { button: "left" });
    await page.waitFor(20000);

    // await page.click("#ember324 > span");
    // await page.waitForSelector("#ember424 > input[type=text]");
    // await page.type("#ember424 > input[type=text]", "Itália");
    // await page.keyboard.press("Enter");
    // await page.click("#ember405 > span")


    await page.screenshot({
      path: "./app/screenshots/example.png",
      fullPage: true
    });
    await browser.close();
  }
};

// peek-carousel js-slideshow
// 
