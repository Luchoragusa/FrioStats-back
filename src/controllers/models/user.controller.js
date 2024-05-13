const { Usuario, Rol, UsuarioSucursal, Sucursal } = require('../../database/models/index')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const Util = require('../../utilities/util')
const Email = require('../../utilities/mail/sendEmail')
const { Op } = require('sequelize')

const register = async (req, res) => {
  // eslint-disable-next-line no-unused-vars, prefer-const
  try {
    const usuarioNew = {
      nombre: req.body.nombre ? req.body.nombre : null,
      apellido: req.body.apellido ? req.body.apellido : null,
      password: req.body.password,
      email: req.body.email ? req.body.email : null,
      idRol: 2, // Rol de usuario
      cuilEmpresa: req.body.cuilEmpresa ? req.body.cuilEmpresa : null,
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
      Email.sendConfirmationEmail(user)
      return res.status(201).json({ message: 'registrado' })
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
    recibeNotiTelegram: req.body.recibeNotiTelegram === 'True',
    recibeNotiMail: req.body.recibeNotiMail === 'True'
  }

  console.log( req.body)

  try {
    const userOld = await Usuario.findOne({ where: { id } })
    // Si el usuario actualizo el telegramId genro un nuevo token y envio el mensaje de verificacion
    if (u.telegramId !== userOld.telegramId) {
      console.log('entro')
      u.telegramToken = Util.createTelegramToken()
    }
    await Usuario.update(u, { where: { id } })
      .then(async () => {
        console.log(u)
        await Usuario.findOne({
          where: { id },
          attributes: ['id', 'nombre', 'apellido', 'email', 'recibeNotiTelegram', 'recibeNotiMail', 'telegramId', 'telegramToken']
        }).then((userUpdated) => {
          // Si el usuario actualizo el telegramId envio el mensaje de verificacion
          if (u.telegramId !== userOld.telegramId) {
            console.log('entro2')
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
    }).then(async (user) => {
      if (user) {
        const cuilEmpresa = user.cuilEmpresa
        // Obtengo los usuarios que trabajan en la misma empresa
        const empleados = await Usuario.findAll({
          include: [{
            model: Sucursal,
            attributes: ['id', 'nombre', 'direccion', 'ciudad'],
            through: {
              model: UsuarioSucursal
            },
            required: false // Establecer required en false
          }, {
            model: Rol,
            attributes: ['id', 'descripcion']
          }],
          where: { cuilEmpresa },
          attributes: ['id', 'nombre', 'apellido', 'email', 'cuilEmpresa']
        })
        const empleadosBaja = await Usuario.findAll({
          include: [{
            model: Sucursal,
            attributes: ['id', 'nombre', 'direccion', 'ciudad'],
            through: {
              model: UsuarioSucursal
            },
            required: false // Establecer required en false
          }, {
            model: Rol,
            attributes: ['id', 'descripcion']
          }],
          attributes: ['id', 'nombre', 'apellido', 'email', 'cuilEmpresa'],
          paranoid: false,
          where: { deletedAt: { [Op.ne]: null }, cuilEmpresa },
        })
          return res.status(200).json({empleados, empleadosBaja} )
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
    if (!token) {
      return res.status(400).json({ message: 'Token no proporcionado' })
    }
    const email = jwt.decode(token, process.env.SECRET_KEY)
    // Valido que el usuario exista
    await Usuario.findOne({ where: { email } }).then(async (user) => {
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
      if (user.emailConfirmado) return res.status(409).json({ message: 'El email ya fue validado' })
      // Valido que el token sea correcto
      await Usuario.update({ emailConfirmado: true }, { where: { email } })
        .then((user) => {
          if (user) {
            return res.status(200).json({ message: 'Email validado correctamente' })
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

const checkEmail = async (req, res) => {
  const email = req.body.email
  try {
    await Usuario.findOne({ where: { email } }).then(async (user) => {
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
      res.status(200).json({ elemt: user, message: 'Email encontrado' })
    })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: user.controller.js:252 ~ checkEmail ~ error:')
  }
}

const deleteOne = async (req, res) => {
  const id = req.params.id
  try {
    await Usuario.destroy({ where: { id } }).then((user) => {
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
      return res.status(200).json({ message: 'Usuario dado de baja' })
    })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: user.controller.js:252 ~ deleteOne ~ error:')
  }
}

const restore = async (req, res) => {
  const id = req.params.id
  try {
    const user = await Usuario.restore({ where: { id } })
    if (user <= 0) return res.status(404).json({ message: 'Usuario no encontrado' })
    return res.status(200).json({ message: 'Usuario restaurado'})
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: user.controller.js:252 ~ restore ~ error:')
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
  updateLocals,
  checkEmail,
  deleteOne,
  restore
}
