const { ImportanciaParametro } = require('../../database/models/index')
const Util = require('../../utilities/util')

const getOne = async (req, res) => {
  const idMaquina = req.params.id
  try {
    await ImportanciaParametro.findOne({
      where: { idMaquina }
    })
      .then((elemts) => {
        if (!elemts) return res.status(404).json({ message: 'No se encontraron datos' })
        return res.status(200).json({ elemts })
      })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: parameter.controller.js:96 ~ getInfoHome ~ error:')
  }
}

module.exports = {
  getOne
}
