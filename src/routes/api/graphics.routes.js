const Router = require('express')
const router = Router()
const { getInfo } = require('../../controllers/models/graphics.controller')

router.get('/', getInfo) // Muestra la información del usuario logueado y de sus sucursales

module.exports = router
