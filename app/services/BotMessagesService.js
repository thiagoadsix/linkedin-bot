const puppeteer = require("puppeteer");

module.exports = class BotMessagesService {
  async login(username, password) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.linkedin.com/login");
    await page.waitForSelector("#username");
    await page.type("#username", username);
    await page.type("#password", password);
    await page.click(".login__form_action_container");
    await page.waitForNavigation();
    await page.screenshot({ path: './app/screenshots/example.png', fullPage: true });
    await browser.close();
  }
}