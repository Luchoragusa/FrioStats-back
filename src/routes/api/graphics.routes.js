const Router = require('express')
const router = Router()
const { getInfo, pieChart, consumptionChart } = require('../../controllers/models/graphics.controller')

router.get('/', getInfo) // Muestra la información del usuario logueado y de sus sucursales
router.get('/pieChart/', pieChart) // Muestra los datos para el gráfico de torta
router.get('/consumptionChart/', consumptionChart) // Muestra los datos para el grafico de consumo

module.exports = router
