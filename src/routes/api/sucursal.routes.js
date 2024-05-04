const Router = require('express')
const router = Router()
const Sucursalontroller = require('../../controllers/models/sucursal.controller')

router.get('/:email', Sucursalontroller.getSucursalEmail) // Muestra las sucursales para ese email

router.put('/', Sucursalontroller.updateUsuarioSucursal) // Actualiza la asignacion de la sucursal

module.exports = router
