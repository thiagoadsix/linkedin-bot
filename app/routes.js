const router = require("express").Router();

router.use("/bot-messages", require("./routes/BotMessagesRoutes"));

module.exports = router;