const { Notificacion, MaquinaSucursal } = require('../../database/models/index')
const Util = require('../../utilities/util')

/**
 * Esto es un ejemplo de como debería ser el body de la request
 * Ose
 * {
 *  {
 *      "id": 1,
 *  },
 *  {
 *      "id": 1,
 *  },
 *  {
 *      "id": 1,
 *  },
 *  {
 *      "id": 1,
 *  },
 *  {
 *      "id": 1,
 *  }
 * }
 */
const checkNotifications = async (req, res) => {
  try {
    const notificaciones = req.body
    const notificacionesActualizadas = []
    for (const notificacion of notificaciones) {
      await Notificacion.findOne({ where: { id: notificacion.id } }).then(async (notificacionEncontrada) => {
        if (notificacionEncontrada) {
          notificacionEncontrada.update({ leida: true })
          notificacionesActualizadas.push(notificacionEncontrada)
        }
      })
    }
    res.status(200).json({ notificacionesActualizadas })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: notification.controller.js:96 ~ getInfoHome ~ error:')
  }
}

const getNotifications = async (req, res) => {
  try {
    const idSucursal = req.params.idSucursal
    // Obtengo todas las maquinas de la sucursal
    await MaquinaSucursal.findAll({
      where: { idSucursal },
      attributes: ['id'] // Solo me quedo con el id de la maquina
    }).then(maquinasSucursal => {
      if (!maquinasSucursal) return res.status(404).json({ message: 'No se encontraron maquinas para esa sucursal' })
      // Obtengo las mediciones de las maquinas de la sucursal
    })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: notification.controller.js:96 ~ getInfoHome ~ error:')
  }
}

module.exports = {
  checkNotifications,
  getNotifications
}
