const Router = require('express')
const router = Router()
const Sucursalontroller = require('../../controllers/models/sucursal.controller')

router.get('/token/', Sucursalontroller.getSucursalToken) // Muestra las sucursales para el usuario logueado
router.get('/:id', Sucursalontroller.getSucursal) 
router.get('/email/:email', Sucursalontroller.getSucursalEmail) // Muestra las sucursales para ese email

router.put('/', Sucursalontroller.updateUsuarioSucursal) // Actualiza la asignacion de la sucursal

module.exports = router
