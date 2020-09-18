const router = require('express').Router()
const BotMessagesController = require('../controllers/BotMessagesController')
const botMessagesController = new BotMessagesController()

router.get('/login', async (req, res) => {
  try {
    const username = await req.body.username
    const password = req.body.password
    const countries = req.body.countries
    const sectors = req.body.sectors
    await botMessagesController.principalController(
      username,
      password,
      countries,
      sectors
    )
    return res.json({ msg: 'Login was a success!' })
  } catch (error) {
    console.log(error.message)
  }
})

module.exports = router
