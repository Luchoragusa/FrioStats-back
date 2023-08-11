const Router = require('express')
const router = Router()
const HomeController = require('../../controllers/models/home.controller')

router.get('/', HomeController.getInfoHome) // Muestra la información del usuario logueado y de sus sucursales

module.exports = router
