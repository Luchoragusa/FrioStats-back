const Router = require('express')
const router = Router()
const GenericController = require('../../controllers/generic.controller')
const { Rol } = require('../../database/models/index')

router.get('/', GenericController.getAll(Rol)) // muestra todos

module.exports = router
