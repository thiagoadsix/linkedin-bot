'use-strict'

const puppeteer = require('puppeteer')

module.exports = class BotMessagesService {
  async principal(username, password, countries, sectors) {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--disable-features=site-per-process'],
      defaultViewport: { width: 2048, height: 1080, isLandscape: true,  },
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

    await page.waitFor(2000)
    await page.mouse.click(1165, 350, {button: "left",})
    await page.waitFor(2000)
    await page.mouse.click(1165, 470, {button: "left"})
    await page.waitFor(2000)
    await page.mouse.click(1165, 600, {button: "left"})
    await page.waitFor(2000)
    await page.mouse.click(1165, 715, {button: "left"})
    await page.waitFor(2000)
    await page.mouse.click(1165, 840, {button: "left"})
    await page.waitFor(2000)
    await page.mouse.click(1165, 960, {button: "left"})
    await page.waitFor(2000)
    await page.mouse.click(1165, 1090, {button: "left"})
    await page.waitFor(2000)
    await page.mouse.click(1165, 1210, {button: "left"})
    await page.waitFor(2000)
    await page.mouse.click(1165, 1330, {button: "left"})
    await page.waitFor(2000)
    await page.mouse.click(1165, 1460, {button: "left"})
    await this._screenshot({ page, fileName: 'Test' })

    await page.waitFor(5000)

    // const escapeXpathString = str => {
    //   const splitedQuotes = str.replace(/'/g, `', "'", '`)
    //   return `concat('${splitedQuotes}', '')`
    // }

    // const clickByText = async (page, text) => {
    //   const escapedText = escapeXpathString(text)
    //   const linkHandlers = await page.$x(
    //     `//button[contains(text(), ${escapedText})]`
    //   )

    //   if (linkHandlers.length > 0) {
    //     await linkHandlers[0].click()
    //   } else {
    //     throw new Error(`Link not found: ${text}`)
    //   }
    // }
    // button[(data - control - name = 'people_profile_card_connect_button')]
    // await clickByText(page, 'Conectar')
    // await page.waitForNavigation({ waitUntil: 'load' })
    // await (await page.$("[data-control-name='srp_profile_actions']")).click({
    //   button: 'left',
    // })

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
