const Router = require('express')
const router = Router()
const { validateToken, policy } = require('../utilities/middleware')

// API

const userRouter = require('./api/user.routes')
router.use('/users', userRouter)

const homeRouter = require('./api/home.routes')
router.use('/home', validateToken, homeRouter)

const notificacionRouter = require('./api/notificacion.routes')
router.use('/notificaciones', validateToken, notificacionRouter)

const rolRouter = require('./api/rol.routes')
router.use('/roles', validateToken, policy, rolRouter)

const sucursalRouter = require('./api/sucursal.routes')
router.use('/sucursales', validateToken, sucursalRouter)

const medicionRouter = require('./api/medicion.routes')
router.use('/mediciones', validateToken, medicionRouter)

const parameterRouter = require('./api/parameter.routes')
router.use('/parameters', validateToken, parameterRouter)

const importanciaParametroRouter = require('./api/importanciaParametro.routes')
router.use('/importanciaParametro', validateToken, importanciaParametroRouter)

module.exports = router
