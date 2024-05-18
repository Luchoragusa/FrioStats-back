const { Notificacion, MaquinaSucursal, Usuario, Sucursal, UsuarioSucursal, Tipo } = require('../../database/models/index')
const Util = require('../../utilities/util')
const moment = require('moment')

const checkNotificacion = async (req, res) => {
  try {
    const id = req.params.idNotificacion
    const notificacion = await Notificacion.findByPk(id)
    if (!notificacion) return res.status(404).json({ message: 'No se encontro la notificacion' })

    notificacion.update({ visto: true })
    return res.status(200).json({ message: 'Notificacion leida' })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: notificacion.controller.js:96 ~ checkNotificacion ~ error:')
  }
}

const checkAll = async (req, res) => {
  try {
    const idSucursal = req.params.idSucursal
    const notificaciones = await MaquinaSucursal.findAll({
      where: { idSucursal },
      attributes: ['id'],
      include: [{
        model: Notificacion,
        where: { visto: false },
        attributes: ['id', 'descripcion'],
        include: [{
          model: Tipo,
          attributes: ['id', 'descripcion']
        }]
      }]
    })

    notificaciones.forEach(async (maquina) => {
      maquina.Notificacions.forEach(async (notificacion) => {
        await Notificacion.update({ visto: true }, { where: { id: notificacion.id } })
      })
    })

    return res.status(200).json({ message: 'Notificaciones leidas' })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: notificacion.controller.js:96 ~ checkNotificacion ~ error:')
  }
}

const getCantNoti = async (req, res) => {
  try {
    const id = req.userId
    const notificaciones = []
    const notificacionesXSucursal = []
    let cont = 0
    await Usuario.findOne({
      where: { id },
      include: [{
        model: Sucursal,
        attributes: ['id'],
        through: {
          model: UsuarioSucursal,
          attributes: []
        }
      }],
      attributes: ['id']
    })
      .then(async (elemts) => {
        if (!elemts) return res.status(404).json({ message: 'No se encontraron datos' })
        // Recorro las sucursales del usuario
        const promises = elemts.Sucursals.map(async (sucursal) => {
          // Busco las maquinas de la sucursal y las notificaciones no vistas
          await MaquinaSucursal.findAll({
            where: { idSucursal: sucursal.id },
            attributes: ['id', 'idSucursal'],
            include: [{
              model: Notificacion,
              where: { visto: false },
              attributes: ['id', 'descripcion', 'idMaquina'],
              include: [{
                model: Tipo,
                attributes: ['id', 'descripcion']
              }]
            }]
          }).then(async (maquinas) => {
            if (maquinas) { // Aca entra por cada sucursal
              maquinas.forEach((maquina) => {
                if (maquina.Notificacions.length > 0) {
                  if (notificacionesXSucursal[cont]) {
                    notificacionesXSucursal[cont].Notificaciones.push(...maquina.Notificacions)
                  } else {
                    notificacionesXSucursal[cont] = {
                      idSucursal: maquina.idSucursal,
                      Notificaciones: maquina.Notificacions,
                      cantLeves: null,
                      cantGraves: null
                    }
                  }
                }
              })
              notificaciones.push(...maquinas)
            }
          })
          cont = cont + 1
        })
        // Recorro las sucursales haciendo un conteo de las notificaciones no vistas
        await Promise.all(promises)
        notificacionesXSucursal.forEach((sucursal, index) => {
          notificacionesXSucursal[index].cantLeves = sucursal.Notificaciones.filter((notificacion) => notificacion.Tipo.descripcion === 'Leve').length
          notificacionesXSucursal[index].cantGraves = sucursal.Notificaciones.filter((notificacion) => notificacion.Tipo.descripcion === 'Grave').length
        })
        return res.status(200).json({ elemts: notificacionesXSucursal })
      })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: notification.controller.js:96 ~ getCantNoti ~ error:')
  }
}

const getNotificaciones = async (req, res) => {
  try {
    const idSucursal = req.params.idSucursal
    const notificacionesXMaquina = []
    await MaquinaSucursal.findAll({
      where: { idSucursal },
      attributes: ['id', 'idSucursal'],
      include: [{
        model: Notificacion,
        where: { visto: false },
        attributes: ['id', 'descripcion', 'createdAt'],
        include: [{
          model: Tipo,
          attributes: ['id', 'descripcion']
        }]
      }]
    }).then(async (maquinas) => {
      maquinas.forEach((maquina, index) => {
        if (maquina.Notificacions.length > 0) {
          notificacionesXMaquina[index] = {
            idMaquina: maquina.id,
            idMaqSuc: (index + 1),
            Notificaciones: maquina.Notificacions
          }
          // Reseteo el array de notificaciones y en la descripcion le asigno descripcion + fecha
          notificacionesXMaquina[index].Notificaciones.forEach((notificacion, index2) => {
            const formattedDate = moment(notificacion.createdAt).format('HH:mm - DD/MM/YYYY');
            notificacionesXMaquina[index].Notificaciones[index2].descripcion = `${notificacion.descripcion} || ${formattedDate}`;
        });
        }
      })
      return res.status(200).json({ elemts: notificacionesXMaquina })
    })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: notification.controller.js:96 ~ getNotificaciones ~ error:')
  }
}

module.exports = {
  checkNotificacion,
  getCantNoti,
  getNotificaciones,
  checkAll
}
