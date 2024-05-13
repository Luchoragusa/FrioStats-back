const Router = require('express')
const router = Router()
// eslint-disable-next-line no-unused-vars
const { register, login, getEmployees, update, updateRole, validateTelegram, getOne, validateEmail, updateLocals, checkEmail, deleteOne, restore } = require('../../controllers/models/user.controller')
const GenericController = require('../../controllers/generic.controller')
const { Usuario } = require('../../database/models/index')
const { validateToken, policy, checkParams } = require('../../utilities/middleware')
const { validateRegister, validateLogin } = require('../../utilities/inputValidations')

//  Especificas
router.post('/', validateToken, policy, validateRegister, register) // Registrar un usuario en la DB
router.post('/registerSintoken', validateRegister, GenericController.createOne(Usuario)) // Registrar un usuario en la DB sin token
router.post('/login', validateLogin, login) // Loguear un usuario

router.patch('/', validateToken, update) // Acutaliza los datos de un usuario
router.patch('/:id', validateToken, policy, checkParams, updateRole) // Actualiza el rol de un usuario
router.patch('/restore/:id', validateToken, policy, checkParams, restore) // Restaura una key:value de la DB

//Revisar
router.patch('/local/:id', validateToken, policy, checkParams, updateLocals) // Actualiza las sucursales asignadas a un usuario

router.get('/', validateToken, getOne) // muestra los datos del usuario logueado
router.get('/getEmployees', validateToken, getEmployees) // muestra todos los empleados de la empresa
router.get('/confirmTelegram/:token', checkParams, validateTelegram) // Verifica el token de telegram
router.get('/confirmEmail/:token', checkParams, validateEmail) // Verifica la direccion de email
router.get('/checkEmail', validateToken, policy, checkEmail) // Es para verificar si el email ya esta registrado

router.delete('/:id', validateToken, policy, checkParams, deleteOne) // Baja logica

module.exports = router
