const { Sucursal, UsuarioSucursal, Usuario } = require('../../database/models/index')
const Util = require('../../utilities/util')

const getSucursal = async (req, res) => {
  try {
    const id = req.params.id
    const sucursal = await Sucursal.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt', 'cuilEmpresa'] }
    })
    if (!sucursal) return res.status(200).json({ message: 'No se encontro la sucursal en la base de datos.' })
    res.status(200).json(sucursal)
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: sucursal.controller.js:60 ~ getSucursal ~ error:')
  }
}


const getSucursalEmail = async (req, res) => {
  const email = req.params.email
  try {
    // Obtenemos el id del usuario con el email
    await Usuario.findOne({
      where: { email }
    }).then(async usuario => {
      if (!usuario) return res.status(200).json({ message: 'No se encontro el email en la base de datos.' })
      const idUsuario = usuario.id

      // Este metodo devuelve todas las sucursales de la empresa
      const sucursalesEmpresa = await Sucursal.findAll({
        where: { cuilEmpresa: usuario.cuilEmpresa },
        attributes: { exclude: ['createdAt', 'updatedAt', 'cuilEmpresa'] }
      })
      if (!sucursalesEmpresa) return res.status(200).json({ message: 'La empresa no tiene ninguna sucursal asociada.' })

      var sucursalesUsuario = await UsuarioSucursal.findAll({
        where: { idUsuario },
        include: [{
          model: Sucursal,
          attributes: { exclude: ['createdAt', 'updatedAt', 'cuilEmpresa'] }
        }]
      })

      sucursalesUsuario = sucursalesUsuario.map(sucursal => sucursal.Sucursal)

      // Hago un listado patdiendo de sucursalesEmpresa, que son todas las sucursales de la empresa sin las asignadas al usuario
      const sucursalesNoAsignadas = sucursalesEmpresa.filter(sucursal => !sucursalesUsuario.some(sucursalesUsuario => sucursal.id === sucursalesUsuario.id));

      // Devuelvo las sucursales asignadas al usuario y las sucursales de la empresa
      res.status(200).json({ sucursalesUsuario, sucursalesNoAsignadas, sucursalesEmpresa })
    })

  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: sucursal.controller.js:60 ~ getSucursalEmail ~ error:')
  }
}

const updateUsuarioSucursal = async (req, res) => {
  try {
    if (!req.body.email) return res.status(400).json({ message: 'Falta el email' })
    const email = req.body.email
    if (!req.body.idSucursal) return res.status(400).json({ message: 'Falta el id de la sucursal' })
    if (!req.body.asignada) return res.status(400).json({ message: 'Falta el estado de la asignacion' })
    if (req.body.asignada !== 'true' && req.body.asignada !== 'false') return res.status(400).json({ message: 'El estado de la asignacion debe ser true o false' })

    const usuario = await Usuario.findOne({
      where: { email },
      attributes: ['id']
    })

    if (!usuario) return res.status(400).json({ message: 'No se encontro el email en la base de datos.' })
    const idUsuario = usuario.id

    if (req.body.asignada === 'true') {
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
  getSucursal,
  getSucursalEmail,
  updateUsuarioSucursal
}
