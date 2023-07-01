const Router = require('express')
const router = Router()
// eslint-disable-next-line no-unused-vars
const { checkNotifications, getNotifications } = require('../../controllers/models/notification.controller')

// router.get('/getNotifications/:idSucursal', getNotifications) // Muestra las notificaciones de una sucursal

router.patch('/checkNotifications', checkNotifications) // Actualiza el estado de las notificaciones

module.exports = router
