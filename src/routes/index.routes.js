const Router = require('express')
const router = Router()

// API

const usuarioRouter = require('./api/usuario.routes')
router.use('/usuario', usuarioRouter)

module.exports = router
