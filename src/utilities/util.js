const chalk = require('chalk')
const jwt = require('jwt-simple')
const moment = require('moment')
const fecha = require('fecha')
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

const createTelegramToken = () => {
  const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let token = ''
  for (let i = 0; i < 6; i++) {
    token += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
  }
  return token
}

/**
 *
 * @param {*} user
 */

const sendTelegramVerification = (user) => {
  sendSuccessMessage(`Confirmacion enviada al telegramId [${user.telegramId}] con el token [${user.telegramToken}]`)
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

module.exports = {
  createToken,
  createTelegramToken,
  sendTelegramVerification,
  sendInfoMessage,
  sendErrorMessage,
  sendSuccessMessage
}
