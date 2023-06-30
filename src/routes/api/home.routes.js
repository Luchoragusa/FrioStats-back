const Router = require('express')
const router = Router()
const { getInfoHome } = require('../../controllers/models/home.controller')
const { validateToken } = require('../../utilities/middleware')

router.get('/', validateToken, getInfoHome) // muestra todos

module.exports = router
