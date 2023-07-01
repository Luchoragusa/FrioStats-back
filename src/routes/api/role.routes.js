const Router = require('express')
const router = Router()
const { getAll } = require('../../controllers/generic.controller')
const { Rol } = require('../../database/models/index')

router.get('/getRoles', getAll(Rol)) // muestra todos

module.exports = router
