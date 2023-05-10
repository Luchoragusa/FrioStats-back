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
