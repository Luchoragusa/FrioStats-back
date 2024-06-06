const chalk = require('chalk')
const jwt = require('jwt-simple')
const moment = require('moment')
const fecha = require('fecha')
const { sendMsg } = require('./bot')

/**
 *
 * @param {*} u Objeto usuario
 * @returns Token
 */
const createToken = (u) => {
  const payload = {
    userId: u.id,
    email: u.email,
    idRol: u.idRol,
    createdAt: moment().unix(),
    expiredAt: moment().add(1, 'hour').unix()
  }
  return jwt.encode(payload, process.env.SECRET_KEY)
}

/**
 *
 * @param {*} user
 */

const sendTelegramVerification = (user) => {
  sendInfoMessage(`Confirmacion enviada al telegramId [${user.telegramId}] con el token [${user.telegramToken}]`)

  const message = `🙋‍♂️Hola ${user.nombre} \n\n✅ Su cuenta fue confirmada corretamente.`

  // Uso del bot
  sendMsg(user.telegramId, message)
}

const sendTelegramNotification = (user) => {
  sendInfoMessage(`Notificacion enviada al telegramId [${user.telegramId}]`)
  const msg = `http://186.13.28.124/:5000/index`
  let sucursales = 'Las sucursales con alertas son:'
  // Reocorro las sucurales	con notificaciones del empleado y armo un mensaje detallando las sucursales con alertas
  for (const sucursal of user.Sucursals) {
    // Recorro las notificaciones de las maquinas
    sucursales += `\n📍 ${sucursal.direccion} - ${sucursal.ciudad}`
  }

  // Necesito la fecha en el formato DD/MM/YYYY - HH:mm
  const fechaFormateada = fecha.format(new Date(), 'HH:mm - DD/MM/YYYY')
  const message = `🙋‍♂️Hola ${user.nombre} \n\n❗ Se le notifica que se detectaron alertas en las maquinas asocidas a sus maquinarias \n\n ${sucursales}\n\n🗓️ Fecha de las alertas: ${fechaFormateada}  \n\n🌐 Haga click [aquí](${msg})`

  // Uso del bot
  sendMsg(user.telegramId, message)
}

/**
 *
 * @param {*} message String
 * @param {*} object Object
 */

const sendSuccessMessage = (message, object = null) => {
  const fechaFormateada = fecha.format(new Date(), 'DD/MM/YYYY HH:mm')
  if (object) {
    console.log(chalk.green(`[✅ - ${fechaFormateada}] || `), `${message}`, object)
  } else {
    console.log(chalk.green(`[✅ - ${fechaFormateada}] || `), `${message}`)
  }
}

/**
 *
 * @param {*} message String
 * @param {*} object Object
 */

const sendInfoMessage = (message, object = null) => {
  const fechaFormateada = fecha.format(new Date(), 'DD/MM/YYYY HH:mm')
  if (object) {
    console.log(chalk.yellow(`[❕ - ${fechaFormateada}] || `), `${message}`, object)
  } else {
    console.log(chalk.yellow(`[❕ - ${fechaFormateada}] || `), `${message}`)
  }
}

/**
 *
 * @param {*} message String
 * @param {*} object Object
 */
const sendErrorMessage = (message, object = null) => {
  const fechaFormateada = fecha.format(new Date(), 'DD/MM/YYYY HH:mm')
  if (object) {
    console.log(chalk.red(`[❌ - ${fechaFormateada}] || `), `${message}`, object)
  } else {
    console.log(chalk.red(`[❌ - ${fechaFormateada}] || `), `${message}`)
  }
}

const catchError = (res, error, message) => {
  if (error.code !== 'ERR_HTTP_HEADERS_SENT') {
    sendErrorMessage(message, error)
    console.log(error.name)
    const errorName = error.code === undefined ? { name: error.name } : { name: error.name, code: error.code }
    return res.status(500).json({ error })
  }
}

module.exports = {
  createToken,
  sendTelegramVerification,
  sendInfoMessage,
  sendErrorMessage,
  sendSuccessMessage,
  catchError,
  sendTelegramNotification
}
