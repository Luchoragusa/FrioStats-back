const { Notificacion } = require('../../database/models/index')
const { catchError } = require('../../utilities/util')

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
    catchError(res, error, '🚀 ~ file: notification.controller.js:96 ~ getInfoHome ~ error:')
  }
}

module.exports = {
  checkNotifications
}
