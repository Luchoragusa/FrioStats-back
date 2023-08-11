const Router = require('express')
const router = Router()
const { validateToken, policy } = require('../utilities/middleware')

// API

const userRouter = require('./api/user.routes')
router.use('/users', userRouter)

const homeRouter = require('./api/home.routes')
router.use('/home', validateToken, homeRouter)

const nottificationRouter = require('./api/notification.routes')
router.use('/notifications', validateToken, nottificationRouter)

const roleRouter = require('./api/role.routes')
router.use('/roles', validateToken, policy, roleRouter)

const localRouter = require('./api/local.routes')
router.use('/locals', validateToken, localRouter)

const measurementRouter = require('./api/measurement.routes')
router.use('/measurements', validateToken, measurementRouter)

const parameterRouter = require('./api/parameter.routes')
router.use('/parameters', validateToken, parameterRouter)

module.exports = router
