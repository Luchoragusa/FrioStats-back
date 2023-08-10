const Router = require('express')
const router = Router()
const { getOne } = require('../../controllers/models/measurement.controller')
const { checkParams } = require('../../utilities/middleware')

router.get('/:id', checkParams, getOne) // muestra todos

module.exports = router
