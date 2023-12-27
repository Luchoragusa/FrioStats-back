const { Sucursal, UsuarioSucursal } = require('../../database/models/index')
const Util = require('../../utilities/util')

const getSucursales = async (req, res) => {
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

const body = {
  id: 1,
  sucursales: [
    {
      idSucursal: 2,
      asignada: true
    },
    {
      idSucursal: 4,
      asignada: true
    },
    {
      idSucursal: 6,
      asignada: false
    }
  ]
}

const updateUsuarioSucursal = async (req, res) => {
  const idUsuario = req.body.id
  try {
    // Este metodo devuelve las sucursales del usuario
    const sucursalesUsuario = await UsuarioSucursal.findOne({
      where: { idUsuario }
    })

    // Recorro las sucursales del usuario si es que tiene
    if (sucursalesUsuario.leght > 0){
    }

  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: local.controller.js:23 ~ getLocals ~ error:')
  }
}

module.exports = {
  getSucursales,
  updateUsuarioSucursal
}
