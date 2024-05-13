const Router = require('express')
const router = Router()
const GenericController = require('../../controllers/generic.controller')
const { getMaquinas } = require('../../controllers/models/maquina.controller')
const { MaquinaSucursal } = require('../../database/models/index')

router.get('/', GenericController.getAll(MaquinaSucursal)) // muestra todos
router.get('/:id', getMaquinas) // muestra por id de sucursal

module.exports = router
