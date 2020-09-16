const BotMessagesService = require("../services/BotMessagesService");
const botMessagesService = new BotMessagesService();

module.exports = class BotMessagesController {
  async principalController(username, password, countries) {
    try {
      return await botMessagesService.principal(username, password, countries);
    } catch (error) {
      console.log(error.message);
    }
  }
};
