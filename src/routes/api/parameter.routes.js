const Router = require('express')
const router = Router()
const { getOne, updateOne } = require('../../controllers/models/parameter.controller')
const { checkParams } = require('../../utilities/middleware')

router.get('/:id', checkParams, getOne) // Muestra los parametros de una maquina

router.patch('/:id', checkParams, updateOne) // Actualiza los parametros de una maquina

module.exports = router
