const { MaquinaSucursal } = require('../../database/models/index')
const Util = require('../../utilities/util')

const getMaquinas = async (req, res) => {
  try {
    const idSucursal = req.params.id
    const maquina = await MaquinaSucursal.findAll({
      where: { idSucursal },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    if (maquina.length == 0) return res.status(200).json({ message: 'No se encontraron maquinas para esa sucursal en la base de datos.' })
    res.status(200).json(maquina)
  } catch (error) {
    Util.catchError(res, error, '🚀 ~ file: maquina.controller.js:60 ~ getMaquinas ~ error:')
  }
}

module.exports = {
    getMaquinas
}