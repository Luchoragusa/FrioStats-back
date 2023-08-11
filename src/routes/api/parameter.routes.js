const Router = require('express')
const router = Router()
const { getOne } = require('../../controllers/models/parameter.controller')
const { checkParams } = require('../../utilities/middleware')

router.get('/:id', checkParams, getOne) // Muestra los parametros de una maquina

module.exports = router
