const { Parametro } = require('../../database/models/index')
const Util = require('../../utilities/util')

const getOne = async (req, res) => {
  const idMaquina = req.params.id
  try {
    await Parametro.findOne({
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

const updateOne = async (req, res) => {
  const id = req.params.id
  delete req.body.idMaquina
  delete req.body.id
  delete req.body.createdAt
  delete req.body.updatedAt
  try {
    const doc = await Parametro.update(req.body, {
      where: { id }
    })
    if (doc[0] <= 0) {
      return res.status(404).json({ message: 'No se encontraron datos o no se modifico ningun campo' })
    }
    res.status(200).json({ message: 'Parametros actualizados' })
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: importanciaParametro.controller.js:96 ~ updateOne ~ error:')
  }
}

module.exports = {
  getOne,
  updateOne
}
