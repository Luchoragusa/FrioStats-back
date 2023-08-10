const Router = require('express')
const router = Router()
const { getOne } = require('../../controllers/models/measurement.controller')
const { checkParams } = require('../../utilities/middleware')

router.get('/:id', checkParams, getOne) // Muestra la ultima medicion de una maquina

module.exports = router
