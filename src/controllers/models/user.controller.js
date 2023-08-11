const { Usuario, Rol, UsuarioSucursal, Sucursal } = require('../../database/models/index')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const Util = require('../../utilities/util')
const Email = require('../../utilities/mail/sendEmail')

const register = async (req, res) => {
  // eslint-disable-next-line no-unused-vars, prefer-const
  try {
    const usuarioNew = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      password: req.body.password,
      email: req.body.email,
      idRol: 2, // Rol de usuario
      telegramToken: Util.createTelegramToken()
    }

    // Valido que el mail no exista en la DB
    const u = await Usuario.findOne({ where: { email: req.body.email } })
    if (u) { return res.status(400).json({ message: 'El mail ya existe en el sistema' }) }

    // Busco el cuil de la empresa del usuario logueado y se lo asigno al nuevo usuario
    await Usuario.findOne({ where: { id: req.userId } })
      .then((u) => {
        if (u) {
          usuarioNew.cuilEmpresa = u.cuilEmpresa
        }
      })

    // Creo el usuario
    await Usuario.create(usuarioNew).then(async (user) => {
      // Creo el usuarioSucursal
      await UsuarioSucursal.create({ idUsuario: user.id, idSucursal: usuarioNew.idSucursal })
        .then(() => {
          // Envio el mail de verificacion
          Email.sendConfirmationEmail(user)
          return res.status(201).json({ message: 'registrado' })
        })
    })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: user.controller.js:60 ~ register ~ error:')
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    await Usuario.findOne({
      where: { email },
      include: [{ model: Rol, attributes: ['id', 'descripcion'] }],
      attributes: ['id', 'nombre', 'apellido', 'email', 'password', 'emailConfirmado']
    })
      .then(async (user) => {
        if (!user) return res.status(401).json({ message: 'Mail y/o contraseña incorrecto' })
        if (!bcrypt.compareSync(password, user.password)) { return res.status(401).json({ message: 'Mail y/o contraseña incorrecto' }) }
        if (!user.emailConfirmado) { return res.status(403).json({ message: 'Es necesario verificar el email' }) }
        // Remuevo el password del objeto user
        user.password = undefined
        const token = Util.createToken(user)
        res.cookie('jwt', token, { httpOnly: true, secure: true })
        return res.status(200).json({ token, user })
      })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: user.controller.js:91 ~ login ~ error:')
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
      u.telegramToken = Util.createTelegramToken()
    }
    await Usuario.update(u, { where: { id } })
      .then(async () => {
        await Usuario.findOne({
          where: { id },
          attributes: ['id', 'nombre', 'apellido', 'email', 'recibeNotiTelegram', 'recibeNotiMail', 'telegramId', 'telegramToken']
        }).then((userUpdated) => {
          // Si el usuario actualizo el telegramId envio el mensaje de verificacion
          if (u.telegramId !== userOld.telegramId) {
            Util.sendTelegramVerification(userUpdated)
          }
          // Remuevo el Telegram Token del objeto user
          userUpdated.telegramToken = undefined
          return res.status(200).json({ message: 'Usuario actualizado', userUpdated })
        })
      })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: user.controller.js:122 ~ update ~ error:')
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
    Util.catchError(res, error, '🚀 ~ file: user.controller.js:177 ~ getEmployees ~ error:')
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
    Util.Util.catchError(res, error, '🚀 ~ file: user.controller.js:198 ~ updateRole ~ error:')
  }
}

const validateTelegram = async (req, res) => {
  const token = req.params.token
  const payload = jwt.decode(token, process.env.SECRET_KEY)
  const id = payload.id
  const telegramToken = payload.telegramToken
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
        const newToken = Util.createTelegramToken()
        await Usuario.update({ telegramToken: newToken }, { where: { id } })
        // Se envia el nuevo token al usuario
        user.telegramToken = newToken
        Util.sendTelegramVerification(newToken, user)
        return res.status(404).json({ message: 'Token incorrecto, se genero un token nuevo.' })
      }
    })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: user.controller.js:240 ~ validateTelegram ~ error:')
  }
}

const getOne = async (req, res) => {
  const id = req.userId
  try {
    await Usuario.findOne({
      where: { id },
      attributes: { exclude: ['password', 'telegramToken', 'createdAt', 'updatedAt'] }
    }).then((elemt) => {
      if (!elemt) return res.status(404).json({ message: 'Usuario no encontrado' })
      return res.status(200).json({ elemt })
    })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: user.controller.js:256 ~ getOne ~ error:')
  }
}

const validateEmail = async (req, res) => {
  try {
    const token = req.params.token
    const email = jwt.decode(token, process.env.SECRET_KEY)
    // Valido que el usuario exista
    await Usuario.findOne({ where: { email } }).then(async (user) => {
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
      if (user.emailConfirmado) return res.status(409).json({ message: 'El email ya fue validado' })
      // Valido que el token sea correcto
      await Usuario.update({ emailConfirmado: true }, { where: { email } })
        .then((user) => {
          if (user) {
            // Aca deberia redirigir a la vista de login
            return res.status(200).json({ message: 'Email validado', message2: 'Esto deberia llevar al login' })
          }
        })
    })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: user.controller.js:252 ~ validateEmail ~ error:')
  }
}

const updateLocals = async (req, res) => {
  const id = req.params.id
  try {
    // Esto deberia ser un json con todos las id de las sucursales del usuario q me pasa la id por parametro
    const locals = req.body.locals

    // Valido que el usuario exista
    await Usuario.findOne({ where: { id } }).then(async (user) => {
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    })

    // Traigo todas las sucursales del usuario
    const sucursales = await UsuarioSucursal.findAll({ where: { idUsuario: id } })

    // Recorro todas las sucursales del usuario
    if (locals.length > 0) {
      // Recorro locals para agregar las nuevas
      locals.forEach(async (local) => {
        // Valido que la sucursal no este asociada al usuario
        const sucursalExist = sucursales.find((s) => s.idSucursal === local)
        if (!sucursalExist) {
          // Si no esta asociada, la asocio
          await UsuarioSucursal.create({ idUsuario: id, idSucursal: local })
        }
      })
      // Recorro locals para eliminar las que no estan
      sucursales.forEach(async (sucursal) => {
        // Valido que la sucursal no este en locals
        const sucursalExist = locals.find((s) => s === sucursal.idSucursal)
        if (!sucursalExist) {
          // Si no esta, la elimino
          await UsuarioSucursal.destroy({ where: { idUsuario: id, idSucursal: sucursal.idSucursal } })
        }
      })
    } else {
      return res.status(409).json({ message: 'Debe seleccionar al menos una sucursal' })
    }
    return res.status(200).json({ message: 'Sucursales actualizadas' })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: user.controller.js:252 ~ updateLocals ~ error:')
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
  getOne,
  validateTelegram,
  validateEmail,
  updateLocals
}
