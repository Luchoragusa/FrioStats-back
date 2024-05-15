const { revisionMaquinas } = require('./utilities/verificator')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
// eslint-disable-next-line no-unused-vars
const { path } = require('path')
const json = require('body-parser')
const app = express()

// Requerir rutas
const router = require('./routes/index.routes')

// Seteo la rutina
const schedule = require('node-schedule')
const rule = new schedule.RecurrenceRule()

// Seteo para 10 segundos (para pruebas)
// const times = []
// for (let i = 0; i < 60; i = i + 10) {
//   times.push(i)
// }
// rule.second = times

// Seteo cada 4 hora y modificando el i+=1 se puede modificar el intervalo
// const hours = []
// for (let i = 0; i <= 24; i += 4) {
//   hours.push(i)
// }
// rule.hour = hours
// rule.minute = 10
// rule.second = 0

// schedule.scheduleJob(rule, function () {
  // setTimeout(revisionMaquinas, 2500)
// })

// Settings
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extend: false }))
app.use(json())

// Rutas
app.use('/', router)

app.use((req, res, next) => {
  res.status(404).json({
    status: '404',
    descripcion: 'Pagina no encontrada'
  })
})

module.exports = app
