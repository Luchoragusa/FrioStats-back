const Router = require('express')
const router = Router()
const HomeController = require('../../controllers/models/home.controller')

router.get('/', HomeController.getInfoHome) // muestra todos

module.exports = router
