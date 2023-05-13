const { Usuario } = require('../../database/models/index')
const jwtUtils = require('../../utilities/jwtUtils')

const register = async (req, res) => {
  const usuarioNew = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    password: req.body.password,
    email: req.body.email,
    recibeNoti: req.body.recibeNoti
  }

  const email = usuarioNew.email

  try {
    // Valido que el mail no exista en la DB
    await Usuario.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          return res.status(400).json({ message: 'El email ya existe' })
        }
      })

    // Valido el telegramId
    if (req.body.telegramId) {
      usuarioNew.telegramId = req.body.telegramId
    }
    if (req.body.recibeNoti === 'true') {
      usuarioNew.recibeNoti = true
    } else {
      usuarioNew.recibeNoti = false
    }
    await Usuario.create(usuarioNew).then((user) => {
      const jwt = jwtUtils.issueJWT(user)
      return res.status(201).json({ token: jwt.token, expiresIn: jwt.expires, user })
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    await Usuario.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          if (user.password === password) {
            const jwt = jwtUtils.issueJWT(user)
            return res.status(200).json({ token: jwt.token, expiresIn: jwt.expires, user })
          }
        } else {
          return res.status(404).json({ message: 'Usuario y/o contraseña incorrecto' })
        }
      })
  } catch (error) {
    res.status(500).json({ error })
  }
}

module.exports = {
  register,
  login
}
