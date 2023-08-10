const Router = require('express')
const router = Router()
const LocalController = require('../../controllers/models/local.controller')

router.get('/', LocalController.getLocals) // muestra todos

module.exports = router
