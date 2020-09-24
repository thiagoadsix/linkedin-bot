'use-strict'

const puppeteer = require('puppeteer')

module.exports = class BotMessagesService {
  async principal(username, password, countries, sectors) {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--disable-features=site-per-process'],
      defaultViewport: { width: 2048, height: 1080 },
    })
    const page = await browser.newPage()

    await page.goto('https://www.linkedin.com/login', {
      waitUntil: 'networkidle2',
    })

    await this._toMakeLogin({ page, username, password })

    await page.goto('https://www.linkedin.com/search/results/people/', {
      waitUntil: 'networkidle2',
    })

    await (await this._nthEmberElement({ n: 61, page })).click()

    await page.waitFor(5000)

    await this._screenshot({ page, fileName: 'filters' })

    await (await this._nthEmberElement({ n: 16, page })).click()
    await this._moreThanOne({ page, array: countries })
    await this._screenshot({ page, fileName: 'countries' })

    await (await this._nthEmberElement({ n: 30, page })).click()
    await this._moreThanOne({ page, array: sectors })
    await this._screenshot({ page, fileName: 'sectors' })

    await page.waitFor(2000)

    await (await this._nthEmberElement({ n: 5, page })).click()
    await this._screenshot({ page, fileName: 'apply' })

    await browser.close()
  }

  async _toMakeLogin(params) {
    const { page, username, password } = params

    await page.waitForSelector('#username')
    await page.type('#username', username, { delay: 250 })
    await page.waitFor(1500)
    await page.type('#password', password, { delay: 250 })
    await page.waitFor(1500)
    await page.click('.login__form_action_container')
    await page.waitForNavigation()
  }

  async _nthEmberElement(params) {
    const { n, page } = params

    return page.evaluateHandle(
      n =>
        Array.from(document.querySelectorAll('*')).filter(element =>
          element.id.startsWith('ember')
        )[n],
      n
    )
  }

  async _moreThanOne(params) {
    const { page, array } = params

    for (const iterator of array) {
      await page.keyboard.type(iterator, { delay: 500 })
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Enter')
    }
  }

  async _screenshot(params) {
    const { page, fileName } = params

    await page.screenshot({
      path: `./app/screenshots/example${fileName}.png`,
      fullPage: true,
    })
  }
}
