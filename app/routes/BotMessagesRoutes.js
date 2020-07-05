const router = require("express").Router();
const BotMessagesController = require("../controllers/BotMessagesController");
const botMessagesController = new BotMessagesController();

router.get("/login", async (req, res) => {
  try {
    const username = await req.body.username;
    const password = req.body.password;
    await botMessagesController.loginController(username, password)
    return res.json("Login was a success!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
