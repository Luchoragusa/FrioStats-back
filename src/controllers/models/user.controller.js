const { Usuario, Rol, UsuarioSucursal, Sucursal } = require('../../database/models/index')
const bcrypt = require('bcrypt')
const { createToken } = require('../../utilities/util')

const register = async (req, res) => {
  // eslint-disable-next-line no-unused-vars, prefer-const
  let band = false

  const usuarioNew = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    password: req.body.password,
    email: req.body.email,
    recibeNoti: req.body.recibeNoti,
    idRol: 2 // Rol de usuario
  }

  const email = usuarioNew.email

  try {
    // Valido que el mail no exista en la DB
    await Usuario.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          this.band = true
          return res.status(400).json({ message: 'El mail ya existe en el sistema' })
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
      return res.status(201).json({ message: 'Usuario creado', user })
    })
  } catch (error) {
    console.log('🚀 ~ file: user.controller.js:43 ~ register ~ error:', error)
    if (!this.band) {
      res.status(500).json({ message: error })
    }
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
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            // Remuevo el password del objeto user
            user.password = undefined
            const token = createToken(user)
            res.cookie('jwt', token, { httpOnly: true, secure: true })
            return res.status(200).json({ token, user })
          } else {
            return res.status(404).json({ message: 'Mail y/o contraseña incorrecto' })
          }
        } else {
          return res.status(404).json({ message: 'Mail y/o contraseña incorrecto' })
        }
      })
  } catch (error) {
    console.log('🚀 ~ file: user.controller.js:73 ~ login ~ error:', error)
    res.status(500).json({ message: error })
  }
}

const update = async (req, res) => {
  const id = req.userId
  const u = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    recibeNoti: req.body.recibeNoti,
    telegramId: req.body.telegramId
  }
  try {
    await Usuario.update(u, { where: { id } })
      .then(async (user) => {
        const userUpdated = await Usuario.findOne({
          where: { id },
          attributes: ['id', 'nombre', 'apellido', 'email', 'recibeNoti', 'telegramId']
        })
        if (user) {
          return res.status(200).json({ message: 'Usuario actualizado', userUpdated })
        } else {
          return res.status(404).json({ message: 'Usuario no encontrado' })
        }
      })
  } catch (error) {
    console.log('🚀 ~ file: user.controller.js:96 ~ update ~ error:', error)
    res.status(500).json({ message: error })
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
          }).then((users) => {
            if (users) {
              return res.status(200).json({ users })
            } else {
              return res.status(404).json({ message: 'No se encontraron usuarios' })
            }
          })
        } else {
          return res.status(404).json({ message: 'El usuario no tiene una sucursal asociada' })
        }
      } else {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }
    })
  } catch (error) {
    console.log('🚀 ~ file: user.controller.js:156 ~ getEmployees ~ error:', error)
    res.status(500).json({ message: error })
  }
}

const updateRole = async (req, res) => {
  const id = req.params.id
  try {
    const idRol = req.body.idRol
    if (!idRol) {
      return res.status(400).json({ message: 'Se debe enviar una idRol' })
    }
    console.log('🚀 ~ file: user.controller.js:165 ~ updateRole ~ idRol', req.body.idRol)
    await Usuario.update({ idRol }, { where: { id } })
      .then(async (user) => {
        if (user) {
          return res.status(200).json({ message: 'Rol actualizado' })
        } else {
          return res.status(404).json({ message: 'Usuario no encontrado' })
        }
      })
  } catch (error) {
    console.log('🚀 ~ file: user.controller.js:178 ~ updateRole ~ error:', error)
    res.status(500).json({ message: error })
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
  updateRole
}
