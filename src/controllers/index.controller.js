const { User } = require('../database/models/index')
// const sequelize = require('sequelize')

// API

const store = async (req, res) => {
  const params = req.body
  const user = await User.create(params)
  if (user) {
    return res.status(200).json({ status: 200, user, msg: 'Creado correctamente' })
  } else {
    return res.status(404).json({ msg: 'No se recibieron los datos' })
  }
}

const update = async (req, res) => {
//   const params = req.body
  const id = req.params.id
  const user = await User.findByPk(id)
  if (id) {
    user.save().then(user => {
      res.status(201).json({ status: 201, user, msg: 'Editado correctamente' })
    })
  } else {
    return res.status(404).json({ msg: 'Usuario no encontrado' })
  }
}

const destroy = async (req, res) => {
  const id = req.params.id
  const user = await User.findByPk(id)
  if (!user) {
    return res.status(404).json({ msg: 'Usuario no encontrado' })
  } else {
    user.destroy().then(user => {
      res.status(200).json({ status: 200, user })
    })
  }
  return res.status(200).json({ status: 200, msg: 'Eliminado correctamente' })
}

const policy = async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.params.id } })
  // eslint-disable-next-line eqeqeq
  if (user.role == 'admin') {
    req.isAdmin = true
    next()
  } else {
    res.status(401).json({ msg: 'No autorizado' })
  }
}

module.exports = {
  store,
  destroy,
  update,
  policy
}
