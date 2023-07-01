const { Usuario, UsuarioSucursal, Sucursal } = require('../../database/models/index')
const { catchError } = require('../../utilities/util')

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
      .then((elemts) => {
        if (elemts) {
          return res.status(200).json({ elemts })
        }
      })
  } catch (error) {
    catchError(res, error, '🚀 ~ file: usuario.controller.js:96 ~ getInfoHome ~ error:')
  }
}

module.exports = {
  getInfoHome
}
