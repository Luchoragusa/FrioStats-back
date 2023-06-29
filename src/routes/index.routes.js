const Router = require('express')
const router = Router()

// API

const usuarioRouter = require('./api/usuario.routes')
router.use('/usuario', usuarioRouter)

const homeRouter = require('./api/home.routes')
router.use('/home', homeRouter)

module.exports = router
