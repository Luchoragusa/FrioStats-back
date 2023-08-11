const Router = require('express')
const router = Router()
// eslint-disable-next-line no-unused-vars
const NotificationController = require('../../controllers/models/notification.controller')

// router.get('/getNotifications/:idSucursal', NotificationController.getNotifications) // Muestra las notificaciones de una sucursal

router.patch('/', NotificationController.checkNotifications) // Actualiza el estado de las notificaciones

module.exports = router
