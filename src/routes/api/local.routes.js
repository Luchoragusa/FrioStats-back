const Router = require('express')
const router = Router()
const { getLocals } = require('../../controllers/models/local.controller')

router.get('/getLocals', getLocals) // muestra todos

module.exports = router
