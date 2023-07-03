const app = require('./server')
const http = require('http').createServer(app)
const { sequelize } = require('./database/models/index')
const { sendInfoMessage, sendSuccessMessage } = require('./utilities/util')

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
  sendInfoMessage(`Running on a port: ${PORT}`)
  sequelize.sync({ alter: false }).then(() => {
    sendSuccessMessage('Conexion a DB exitosa')
  }).catch(error => {
    console.log('Se ha producido un error', error)
  })
})
