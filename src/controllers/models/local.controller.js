const { Sucursal, UsuarioSucursal } = require('../../database/models/index')
const Util = require('../../utilities/util')

const getLocals = async (req, res) => {
  const idUsuario = req.userId
  try {
    // Este metodo devuelve una sucursal de la cual obtengo el cuil de la empresa
    await UsuarioSucursal.findOne({
      where: { idUsuario },
      include: [{
        model: Sucursal,
        attributes: ['cuilEmpresa']
      }]
    }).then(async sucursal => {
      // Este metodo devuelve todas las sucursales de la empresa
      const elemts = await Sucursal.findAll({
        where: { cuilEmpresa: sucursal.Sucursal.cuilEmpresa },
        attributes: { exclude: ['createdAt', 'updatedAt', 'cuilEmpresa'] }
      })
      if (!elemts) return res.status(404).json({ message: 'No se encontraron sucursales' })
      res.status(200).json({ elemts })
    })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: local.controller.js:23 ~ getLocals ~ error:')
  }
}

module.exports = {
  getLocals
}
