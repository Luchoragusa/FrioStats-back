require('dotenv').config()
const express = require('express')
const cors = require('cors')
// eslint-disable-next-line no-unused-vars
const path = require('path')
const { json } = require('body-parser')
const app = express()

// Requerir rutas
const router = require('./routes/index.routes')

// Requerir bot
const { sendMessage } = require('./utilities/bot')

// Uso del bot
sendMessage(1612650323, 'Ola')

// Seteo la rutina

const schedule = require('node-schedule')
const rule = new schedule.RecurrenceRule()

const times = []
for (let i = 0; i < 60; i = i + 10) { // Creo un array con los tiempos en los que se va a ejecutar la rutina
  times.push(i)
}
rule.second = times // Seteo la rutina para que se ejecute cada 10 segundos

schedule.scheduleJob(rule, function () {
  console.log('The answer to life, the universe, and everything!' + new Date())
})

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
