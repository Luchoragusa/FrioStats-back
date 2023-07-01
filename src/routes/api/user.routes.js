const Router = require('express')
const router = Router()
const { register, login, update, getEmployees, updateRole, validateTelegram } = require('../../controllers/models/user.controller')
const { createOne } = require('../../controllers/generic.controller')
const { Usuario } = require('../../database/models/index')
const { validateToken, policy, checkParams } = require('../../utilities/middleware')

//  Especificas
router.post('/register', validateToken, policy, register) // Registrar un usuario en la DB
router.post('/registerSintoken', createOne(Usuario)) // Registrar un usuario en la DB
router.post('/login', login) // crea uno

router.patch('/', validateToken, update) // actualiza uno
router.patch('/:id', validateToken, policy, updateRole) // actualiza uno
router.patch('/validateTelegram', validateToken, validateTelegram) // actualiza uno

router.get('/getEmployees', validateToken, policy, checkParams, getEmployees) // muestra todos los empleados de la empresa

module.exports = router
