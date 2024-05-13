const Router = require('express')
const router = Router()
const GenericController = require('../../controllers/generic.controller')
const { MaquinaSucursal } = require('../../database/models/index')

router.get('/', GenericController.getAll(MaquinaSucursal)) // muestra todos
router.get('/:id', GenericController.getOne(MaquinaSucursal)) // muestra por id

module.exports = router
