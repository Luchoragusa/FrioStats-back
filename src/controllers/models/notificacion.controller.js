const { Notificacion, MaquinaSucursal } = require('../../database/models/index')
const Util = require('../../utilities/util')


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
  checkNotificacion,
  getNotifications
}
