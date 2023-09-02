const Router = require('express')
const router = Router()
const { getOne } = require('../../controllers/models/importanciaParametro.controller')
const { checkParams } = require('../../utilities/middleware')

router.get('/:id', checkParams, getOne) // Muestra la importancia de los parametros de una maquina

module.exports = router
