const Router = require('express')
const router = Router()
// eslint-disable-next-line no-unused-vars
const { checkNotificacion, getCantNoti } = require('../../controllers/models/notificacion.controller')

router.get('/getCantNoti', getCantNoti) // Muestra la cantidad de notificaciones de cada tipo por maquina de una misma sucursal
router.patch('/:idNotificacion', checkNotificacion) // Actualiza el estado de las notificaciones

module.exports = router
