const Router = require('express')
const router = Router()
const { validateToken } = require('../utilities/middleware')

// API

const userRouter = require('./api/user.routes')
router.use('/users', userRouter)

const homeRouter = require('./api/home.routes')
router.use('/home', validateToken, homeRouter)

const nottificationRouter = require('./api/home.routes')
router.use('/notifications', validateToken, nottificationRouter)

const roleRouter = require('./api/role.routes')
router.use('/roles', validateToken, roleRouter)

module.exports = router
