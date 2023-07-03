const Router = require('express')
const router = Router()
// eslint-disable-next-line no-unused-vars
const { register, login, getEmployees, update, updateRole, validateTelegram, getOne, validateEmail } = require('../../controllers/models/user.controller')
const GenericController = require('../../controllers/generic.controller')
const { Usuario } = require('../../database/models/index')
const { validateToken, policy, checkParams } = require('../../utilities/middleware')

//  Especificas
router.post('/register', validateToken, policy, register) // Registrar un usuario en la DB
router.post('/registerSintoken', GenericController.createOne(Usuario)) // Registrar un usuario en la DB
router.post('/login', login) // Loguear un usuario

router.patch('/', validateToken, update) // Acutaliza los datos de un usuario
router.patch('/:id', validateToken, policy, checkParams, updateRole) // Actualiza el rol de un usuario
router.patch('/confirmEmail/:token', checkParams, validateEmail) // Verifica la direccion de email
// router.patch('/confirmTelegram', validateToken, validateTelegram) // Verifica el token de telegram

router.get('/getOne', validateToken, getOne) // muestra todos los empleados de la empresa
router.get('/getEmployees', validateToken, policy, getEmployees) // muestra todos los empleados de la empresa

module.exports = router
