const Router = require('express')
const router = Router()
// eslint-disable-next-line no-unused-vars
const { checkNotificacion, getNotifications } = require('../../controllers/models/notificacion.controller')

// router.get('/getNotifications/:idSucursal', getNotifications) // Muestra las notificaciones de una sucursal
router.patch('/:idNotificacion', checkNotificacion) // Actualiza el estado de las notificaciones

module.exports = router
