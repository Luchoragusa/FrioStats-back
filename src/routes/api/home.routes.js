const Router = require('express')
const router = Router()
const { getInfoHome } = require('../../controllers/models/home.controller')

router.get('/', getInfoHome) // muestra todos

module.exports = router
