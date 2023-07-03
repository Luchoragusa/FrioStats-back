const { Usuario, Rol, UsuarioSucursal, Sucursal } = require('../../database/models/index')
const bcrypt = require('bcrypt')
const { createToken, createTelegramToken, sendTelegramVerification, catchError } = require('../../utilities/util')

const register = async (req, res) => {
  // eslint-disable-next-line no-unused-vars, prefer-const
  const idSucursal = req.body.idSucursal
  if (!idSucursal) {
    return res.status(400).json({ message: 'Debe ingresar una id de sucursal' })
  }
  const usuarioNew = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    password: req.body.password,
    email: req.body.email,
    idRol: 2, // Rol de usuario
    telegramToken: createTelegramToken(),
    telegramId: req.body.telegramId ? req.body.telegramId : null,
    recibeNoti: req.body.recibeNoti === 'true'
  }
  const email = usuarioNew.email

  try {
    // Valido que el mail no exista en la DB
    await Usuario.findOne({ where: { email } })
      .then(() => {
        return res.status(400).json({ message: 'El mail ya existe en el sistema' })
      })

    // Valido que el telegramId no exista en la DB
    if (usuarioNew.telegramId) {
      await Usuario.findOne({ where: { telegramId: usuarioNew.telegramId } })
        .then(() => {
          return res.status(400).json({ message: 'El id de telegram ya existe en el sistema' })
        })
    }

    // Creo el usuario
    await Usuario.create(usuarioNew).then(async (user) => {
      // Creo el usuarioSucursal
      await UsuarioSucursal.create({ idUsuario: user.id, idSucursal })
        .then(() => {
          // Si el usuario tiene telegramId, envio el mensaje de verificacion
          if (user.telegramId) {
            sendTelegramVerification(user)
          }
          return res.status(201).json({ message: 'Usuario creado', user })
        })
    })
  } catch (error) {
    catchError(res, error, '🚀 ~ file: user.controller.js:60 ~ register ~ error:')
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    await Usuario.findOne({
      where: { email },
      include: [{ model: Rol, attributes: ['id', 'descripcion'] }],
      attributes: ['id', 'nombre', 'apellido', 'email', 'password']
    })
      .then(async (user) => {
        if (!user) return res.status(401).json({ message: 'Mail y/o contraseña incorrecto' })
        if (bcrypt.compareSync(password, user.password)) {
          // Remuevo el password del objeto user
          user.password = undefined
          const token = createToken(user)
          res.cookie('jwt', token, { httpOnly: true, secure: true })
          return res.status(200).json({ token, user })
        } else {
          return res.status(401).json({ message: 'Mail y/o contraseña incorrecto' })
        }
      })
  } catch (error) {
    catchError(res, error, '🚀 ~ file: user.controller.js:91 ~ login ~ error:')
  }
}

const update = async (req, res) => {
  const id = req.userId
  const u = {
    telegramId: req.body.telegramId ? req.body.telegramId : null,
    recibeNotiTelegram: req.body.recibeNotiTelegram === 'true',
    recibeNotiMail: req.body.recibeNotiMail === 'true'

  }
  try {
    const userOld = await Usuario.findOne({ where: { id } })
    // Si el usuario actualizo el telegramId genro un nuevo token y envio el mensaje de verificacion
    if (u.telegramId !== userOld.telegramId) {
      u.telegramToken = createTelegramToken()
    }
    await Usuario.update(u, { where: { id } })
      .then(async () => {
        await Usuario.findOne({
          where: { id },
          attributes: ['id', 'nombre', 'apellido', 'email', 'recibeNoti', 'telegramId', 'telegramToken']
        }).then((userUpdated) => {
          // Si el usuario actualizo el telegramId envio el mensaje de verificacion
          if (u.telegramId !== userOld.telegramId) {
            sendTelegramVerification(userUpdated)
          }
          // Remuevo el Telegram Token del objeto user
          userUpdated.telegramToken = undefined
          return res.status(200).json({ message: 'Usuario actualizado', userUpdated })
        })
      })
  } catch (error) {
    catchError(res, error, '🚀 ~ file: user.controller.js:122 ~ update ~ error:')
  }
}

const getEmployees = async (req, res) => {
  const id = req.userId
  try {
    await Usuario.findOne({
      where: { id },
      include: [{
        model: Sucursal,
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        through: {
          model: UsuarioSucursal,
          attributes: []
        }
      }],
      attributes: ['id', 'nombre', 'apellido', 'email']
    }).then((user) => {
      if (user) {
        // Valido que el usuario tenga al menos 1 una sucursal asociada
        const sucursal = user.Sucursals.length > 0 ? user.Sucursals[0] : null
        if (sucursal) {
          // Obtengo el cuil de la empresa para la cual trabaja el usuario
          const cuilEmpresa = sucursal.cuilEmpresa
          // Obtengo los usuarios que trabajan en la misma empresa
          Usuario.findAll({
            include: [{
              model: Sucursal,
              attributes: ['id', 'nombre', 'direccion', 'ciudad'],
              through: {
                model: UsuarioSucursal
              },
              where: { cuilEmpresa }
            }, {
              model: Rol,
              attributes: ['id', 'descripcion']
            }],
            attributes: ['id', 'nombre', 'apellido', 'email']
          }).then((elemts) => {
            if (!elemts) return res.status(404).json({ message: 'No se encontraron usuarios' })
            return res.status(200).json({ elemts })
          })
        } else {
          return res.status(404).json({ message: 'El usuario no tiene una sucursal asociada' })
        }
      } else {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }
    })
  } catch (error) {
    catchError(res, error, '🚀 ~ file: user.controller.js:177 ~ getEmployees ~ error:')
  }
}

const updateRole = async (req, res) => {
  const id = req.params.id
  try {
    const idRol = req.body.idRol
    if (!idRol) {
      return res.status(400).json({ message: 'Se debe enviar una idRol' })
    }
    await Usuario.update({ idRol }, { where: { id } })
      .then((user) => {
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
        return res.status(200).json({ message: 'Rol actualizado' })
      })
  } catch (error) {
    catchError(res, error, '🚀 ~ file: user.controller.js:198 ~ updateRole ~ error:')
  }
}

const validateTelegram = async (req, res) => {
  const telegramToken = req.body.telegramToken
  if (!telegramToken) return res.status(400).json({ message: 'Se debe enviar un telegramToken' })
  const id = req.userId
  try {
    await Usuario.findOne({
      where: { id },
      attributes: ['telegramToken', 'telegramId']
    }).then(async (user) => {
      // Valido que el usuario exista
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

      // Valido que el usuario tenga un token de telegram
      if (!user.telegramToken) return res.status(409).json({ message: 'El Telegram id ya fue validado' })

      // Valido que el telegramToken ingreasdo sea el mismo que el que tiene el usuario en la DB
      if (user.telegramToken === telegramToken) {
        // Si el token es correcto, le asigno null al token de telegram
        await Usuario.update({ telegramToken: null }, { where: { id } })
          .then(async (user) => {
            if (user) {
              return res.status(200).json({ message: 'Telegram id validado' })
            }
          })
      } else {
        // Si ingresa un token incorrecto, se le genera uno nuevo
        const newToken = createTelegramToken()
        await Usuario.update({ telegramToken: newToken }, { where: { id } })
        // Se envia el nuevo token al usuario
        user.telegramToken = newToken
        sendTelegramVerification(newToken, user)
        return res.status(404).json({ message: 'Token incorrecto, se genero un token nuevo.' })
      }
    })
  } catch (error) {
    catchError(res, error, '🚀 ~ file: user.controller.js:240 ~ validateTelegram ~ error:')
  }
}

const getOne = async (req, res) => {
  const id = req.userId
  try {
    await Usuario.findOne({
      where: { id },
      attributes: { exclude: ['password', 'telegramToken', 'createdAt', 'updatedAt'] }
    }).then((user) => {
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
      return res.status(200).json({ user })
    })
  } catch (error) {
    catchError(res, error, '🚀 ~ file: user.controller.js:256 ~ getOne ~ error:')
  }
}

// const logOut = async (req, res, next) => {
//   //Eliminar cookie jwt
//   res.clearCookie('jwt')
//   //Redirigir a la vista de login
//   return res.redirect('/login')
// };

module.exports = {
  register,
  login,
  update,
  getEmployees,
  updateRole,
  validateTelegram,
  getOne
}
