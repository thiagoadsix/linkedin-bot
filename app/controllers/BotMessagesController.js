const BotMessagesService = require("../services/BotMessagesService");
const botMessagesService = new BotMessagesService();

module.exports = class BotMessagesController {
  async loginController(username, passowrd) {
    try {
      return await botMessagesService.login(username, passowrd);
    } catch (error) {
      console.log(error.message)
    }
  }
}