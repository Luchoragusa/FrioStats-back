const Router = require('express')
const router = Router()
const { validateToken } = require('../utilities/middleware')

// API

const userRouter = require('./api/user.routes')
router.use('/user', userRouter)

const homeRouter = require('./api/home.routes')
router.use('/home', validateToken, homeRouter)

const nottificationRouter = require('./api/home.routes')
router.use('/notification', validateToken, nottificationRouter)

module.exports = router
