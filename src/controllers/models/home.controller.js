const { Usuario, UsuarioSucursal, Sucursal, Empresa } = require('../../database/models/index')
const Util = require('../../utilities/util')

const getInfoHome = async (req, res) => {
  const id = req.userId
  try {
    await Usuario.findOne({
      where: { id },
      include: [{
        model: Sucursal,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        through: {
          model: UsuarioSucursal,
          attributes: []
        }
      },{
        model: Empresa,
        attributes: { exclude: ['createdAt', 'updatedAt', 'cuil']}
      }],
      attributes: ['id', 'nombre', 'apellido', 'email']
    })
      .then((elemts) => {
        if (!elemts) return res.status(404).json({ message: 'No se encontraron datos' })
        return res.status(200).json({ elemts })
      })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: usuario.controller.js:96 ~ getInfoHome ~ error:')
  }
}

module.exports = {
  getInfoHome
}
