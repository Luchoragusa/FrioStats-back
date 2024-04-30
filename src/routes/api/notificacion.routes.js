const Router = require('express')
const router = Router()
// eslint-disable-next-line no-unused-vars
const { checkNotificacion, getCantNoti, getNotificaciones, checkAll } = require('../../controllers/models/notificacion.controller')

router.get('/getCantNoti', getCantNoti) // Muestra la cantidad de notificaciones de cada tipo por maquina de una misma sucursal
router.get('/getNotificaciones/:idSucursal', getNotificaciones) // Muestra las notificaciones de una sucursal
router.patch('/:idNotificacion', checkNotificacion) // Actualiza el estado de las notificaciones
router.patch('/checkAll/:idSucursal', checkAll) // Actualiza el estado de todas las notificaciones de una sucursal

module.exports = router
