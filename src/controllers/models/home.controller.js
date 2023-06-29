const { Usuario, UsuarioSucursal, Sucursal } = require('../../database/models/index')

const getInfoHome = async (req, res) => {
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
    })
      .then((user) => {
        if (user) {
          return res.status(200).json({ user })
        }
      })
  } catch (error) {
    console.log('🚀 ~ file: usuario.controller.js:96 ~ getInfoHome ~ error:', error)
    res.status(500).json({ message: error.name })
  }
}

module.exports = {
  getInfoHome
}
