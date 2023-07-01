const { catchError } = require('../utilities/util')

exports.getAll = Model =>
  async (req, res, next) => {
    try {
      const elemts = await Model.findAll(
        { attributes: { exclude: ['createdAt', 'updatedAt'] } }
      )
      if (elemts.length === 0) { return res.status(404).json({ msg: 'No hay datos' }) }
      elemts.sort((a, b) => a.id - b.id)
      return res.status(200).json({ elemts })
    } catch (error) {
      catchError(res, error, '🚀 ~ file: generic.controller.js:15 ~ error:')
    }
  }

exports.getOne = Model =>
  async (req, res, next) => {
    try {
      const id = req.params.id
      const elemnt = await Model.findOne({ where: { id }, attributes: { exclude: ['createdAt', 'updatedAt'] } })
      if (!elemnt) { return res.status(404).json({ msg: 'Elemento no encontrado' }) }
      return res.status(404).json({ msg: 'No hay datos' })
    } catch (error) {
      catchError(res, error, '🚀 ~ file: generic.controller.js:30 ~ error:')
    }
  }

exports.deleteOne = Model =>
  async (req, res, next) => {
    try {
      const id = req.params.id
      const elemnt = await Model.findByPk(id)
      if (!elemnt) { return res.status(404).json({ msg: 'Elemento no encontrado' }) }
      elemnt.destroy().then(elemnt => {
        return res.status(200).json({ elemnt })
      })
    } catch (error) {
      catchError(res, error, '🚀 ~ file: generic.controller.js:48 ~ error:')
    }
  }

exports.createOne = Model =>
  async (req, res, next) => {
    try {
      const elemnt = await Model.create(req.body)
      if (!elemnt) { return res.status(404).json({ msg: 'Elemento no encontrado' }) }
      return res.status(200).json({ elemnt })
    } catch (error) {
      catchError(res, error, '🚀 ~ file: generic.controller.js:62 ~ error:')
    }
  }

exports.updateOne = Model =>
  async (req, res, next) => {
    try {
      const params = req.body
      const id = req.params.id
      const elemnt = await Model.findByPk(id)
      if (!elemnt) { return res.status(404).json({ msg: 'Elemento no encontrado' }) }
      elemnt.update(params).then(elemnt => {
        res.status(201).json({ elemnt })
      })
    } catch (error) {
      catchError(res, error, '🚀 ~ file: generic.controller.js:80 ~ error:')
    }
  }
