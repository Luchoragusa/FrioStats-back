
const jwt = require('jwt-simple')
const moment = require('moment')
const { Usuario, Rol } = require('../database/models/index')
const { getId } = require('./util')

const validateToken = [
  async (req, res, next) => {
    if (!req.headers['user-token']) {
      return res.status(401).json({ msg: 'Es necesario incluir el token en la cabecera' })
    }
    const userToken = req.headers['user-token']

    if (userToken === 'null') {
      return res.status(401).json({ msg: 'No autorizado 1' })
    }

    let payload = {}

    try {
      payload = jwt.decode(userToken, process.env.SECRET_KEY)
    } catch (err) {
      return res.status(401).json({ msg: 'No autorizado 2 ' + err })
    }

    try {
      await Usuario.findOne({ where: { id: payload.userId } })
        .then((user) => {
          if (user) {
            // Valido el tiempo de expiración del token
            if (payload.expiredAt <= moment().unix()) {
              return res.status(401).json({ msg: 'Sesion expirada' })
            } else {
              return res.status(200).json({ msg: 'Sesion valida' })
            }
          } else {
            return res.status(401).json({ msg: 'El usuario no existe' })
          }
        })
    } catch (err) {
      return res.status(401).json({ msg: 'No autorizado 3 ' + err })
    }
    next()
  }
]

const policy = [
  async (req, res, next) => {
    const role = await Rol.findOne({ where: { descripcion: 'Admin' } })
    const user = await Usuario.findOne({ where: { id: getId } })
    if (user.idRol !== role.id) {
      res.status(401).json({ msg: 'No autorizado, tenes que ser admin' })
    }
    next()
  }
]

module.exports = {
  validateToken,
  policy
}
