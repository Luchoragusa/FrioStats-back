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
      if (!sucursal) return res.status(404).json({ message: 'No se encontraron sucursales' })
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

// const body = {
//   id: 1,
//   idSucursal: 4,
//   asignada: true
// }

const updateUsuarioSucursal = async (req, res) => {
  const idUsuario = req.body.id
  try {
    if (!req.body.idSucursal) return res.status(400).json({ message: 'Falta el id de la sucursal' })
    if (!req.body.asignada) return res.status(400).json({ message: 'Falta el estado de la asignacion' })
    if (req.body.asignada !== 'true' && req.body.asignada !== 'false') return res.status(400).json({ message: 'El estado de la asignacion debe ser true o false' })
    if (req.body.asignada) {
      await UsuarioSucursal.findOne({
        where: { idUsuario, idSucursal: req.body.idSucursal }
      }).then(async sucursal => {
        if (sucursal) {
          return res.status(200).json({ message: 'La sucursal ya esta asignada a ese usuario.' })
        } else {
          await UsuarioSucursal.create({
            idUsuario,
            idSucursal: req.body.idSucursal
          })
          return res.status(200).json({ message: 'Sucursal asignada correctamente.' })
        }
      })
    } else {
      await UsuarioSucursal.destroy({
        where: { idUsuario, idSucursal: req.body.idSucursal }
      })
      return res.status(200).json({ message: 'Sucursal desasignada correctamente' })
    }
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: local.controller.js:50 ~ updateUsuarioSucursal ~ error:')
  }
}

module.exports = {
  getSucursales,
  updateUsuarioSucursal
}
