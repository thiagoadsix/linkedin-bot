"use-strict";

const puppeteer = require("puppeteer");

module.exports = class BotMessagesService {
  async principal(username, password, countries) {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-features=site-per-process"],
      defaultViewport: { width: 1920, height: 1080 },
    });
    const page = await browser.newPage();

    await page.goto("https://www.linkedin.com/login", {
      waitUntil: "networkidle2",
    });

    await this._toMakeLogin({ page, username, password });

    await page.goto("https://www.linkedin.com/search/results/people/", {
      waitUntil: "networkidle2",
    });

    await this._goToFilters({ page });

    await this._manyFields({
      countries,
      page,
      xPosition: 1050,
      xxPosition: 1050,
      yPosition: 210,
      yyPosition: 250,
    });

    // ! Try to find a better solution for this situation (here we could use a if conditional)
    await page.mouse.click(800, 535, { button: "left" });
    await page.keyboard.type("Design", { delay: 250 });
    await page.waitFor(1500);
    await page.mouse.click(800, 560, { button: "left" });
    await page.waitFor(1500);

    await page.mouse.click(1450, 75, { button: "left" });
    await page.waitFor(20000);

    // ! Try to find a solution for this situation
    // await page.click("#ember324 > span");
    // await page.waitForSelector("#ember424 > input[type=text]");
    // await page.type("#ember424 > input[type=text]", "Itália");
    // await page.keyboard.press("Enter");
    // await page.click("#ember405 > span")

    await page.screenshot({
      path: "./app/screenshots/example.png",
      fullPage: true,
    });
    await browser.close();
  }

  async _toMakeLogin(params) {
    const { page, username, password } = params;

    await page.waitForSelector("#username");
    await page.type("#username", username, { delay: 250 });
    await page.waitFor(1500);
    await page.type("#password", password, { delay: 250 });
    await page.waitFor(1500);
    await page.click(".login__form_action_container");
    await page.waitForNavigation();
  }

  async _goToFilters(params) {
    const { page } = params;
    await page.mouse.click(1000, 72, { button: "left" });
    await page.waitFor(5000);
  }

  async _manyFields(params) {
    const {
      countries,
      page,
      xPosition,
      xxPosition,
      yPosition,
      yyPosition,
    } = params;

    for (const element of countries) {
      await page.mouse.click(xPosition, yPosition, { button: "left" });
      await page.keyboard.type(element, { delay: 250 });
      await page.waitFor(1500);
      await page.mouse.click(xxPosition, yyPosition, { button: "left" });
      await page.waitFor(1500);
    }
  }
};
