const BotMessagesService = require('../services/BotMessagesService')
const botMessagesService = new BotMessagesService()

module.exports = class BotMessagesController {
  async principalController(username, password, countries, sectors) {
    try {
      return await botMessagesService.principal(
        username,
        password,
        countries,
        sectors
      )
    } catch (error) {
      console.log(error.message)
    }
  }
}
