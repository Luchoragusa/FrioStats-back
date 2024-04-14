const Router = require('express')
const router = Router()
const Sucursalontroller = require('../../controllers/models/sucursal.controller')

router.get('/', Sucursalontroller.getSucursales) // Muestra las sucursales que estan asociadas al usuario logeado
router.get('/:email', Sucursalontroller.getSucursalEmail) // Muestra las sucursales para ese email

router.put('/', Sucursalontroller.updateUsuarioSucursal)

module.exports = router
