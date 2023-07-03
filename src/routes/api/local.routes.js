const Router = require('express')
const router = Router()
const LocalController = require('../../controllers/models/local.controller')

router.get('/getLocals', LocalController.getLocals) // muestra todos

module.exports = router
