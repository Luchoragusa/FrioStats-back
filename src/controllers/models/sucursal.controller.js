const { Sucursal, UsuarioSucursal, Usuario } = require('../../database/models/index')
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
      if (!sucursal) return res.status(200).json({ message: 'No se encontraron sucursales' })
      // Este metodo devuelve todas las sucursales de la empresa
      const elemts = await Sucursal.findAll({
        where: { cuilEmpresa: sucursal.Sucursal.cuilEmpresa },
        attributes: { exclude: ['createdAt', 'updatedAt', 'cuilEmpresa'] }
      })
      if (!elemts) return res.status(200).json({ message: 'No se encontraron sucursales' })
      res.status(200).json({ elemts })
    })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: local.controller.js:23 ~ getLocals ~ error:')
  }
}

const getSucursalEmail = async (req, res) => {
  const email = req.params.email
  try {
    // Obtenemos el id del usuario con el email
    await Usuario.findOne({
      where: { email },
      attributes: ['id']
    }).then(async usuario => {
      if (!usuario) return res.status(200).json({ message: 'No se encontro el email en la base de datos.' })
      const idUsuario = usuario.id

      await UsuarioSucursal.findOne({
        where: { idUsuario },
        include: [{
          model: Sucursal,
          attributes: ['cuilEmpresa']
        }]
      }).then(async sucursal => {
        if (!sucursal) return res.status(200).json({ message: 'El email ingresado no tiene sucursales asociadas.' })
        // Este metodo devuelve todas las sucursales de la empresa
        const sucursalesEmpresa = await Sucursal.findAll({
          where: { cuilEmpresa: sucursal.Sucursal.cuilEmpresa },
          attributes: { exclude: ['createdAt', 'updatedAt', 'cuilEmpresa'] }
        })
        if (!sucursalesEmpresa) return res.status(200).json({ message: 'La empresa no tiene ninguna sucursal asociada.' })

        // Ya tengo las sucursales de la empresa, ahora busco las sucursales asignadas al usuario 
        const elemts = await UsuarioSucursal.findAll({
          where: { idUsuario },
          attributes: ['idSucursal']
        })
        if (!elemts) return res.status(200).json({ message: 'No se encontraron sucursales' })
        
        // Comparo las sucursales de la empresa con las sucursales asignadas al usuario
        const sucursalUsuario = sucursalesEmpresa.filter(sucursal => {
          return elemts.some(elemts => elemts.idSucursal === sucursal.id)
        })

        // Devuelvo las sucursales asignadas al usuario y las sucursales de la empresa
        res.status(200).json({ sucursalUsuario, sucursalesEmpresa })
      })
    })

  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: sucursal.controller.js:60 ~ getSucursalEmail ~ error:')
  }
}

// const body = {
//   id: 1,
//   idSucursal: 4,
//   asignada: true
// }

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
  getSucursalEmail,
  updateUsuarioSucursal
}
