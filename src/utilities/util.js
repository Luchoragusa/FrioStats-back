const jwt = require('jwt-simple')
const moment = require('moment')
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

module.exports = {
  createToken,
  createTelegramToken
}
