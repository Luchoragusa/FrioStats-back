exports.getAll = Model =>
  async (req, res, next) => {
    try {
      const elemts = await Model.findAll(
        { attributes: { exclude: ['createdAt', 'updatedAt'] } }
      )
      if (elemts.length > 0) {
        elemts.sort((a, b) => a.id - b.id)
        return res.status(200).json({ elemts })
      } else {
        return res.status(404).json({ msg: 'No hay datos' })
      }
    } catch (error) {
      console.log('🚀 ~ file: generic.controller.js:12 ~ error:', error)
      res.status(500).json({ message: error })
    }
  }

exports.getOne = Model =>
  async (req, res, next) => {
    try {
      const id = req.params.id
      const elemnt = await Model.findOne({ where: { id }, attributes: { exclude: ['createdAt', 'updatedAt'] } })
      if (elemnt) {
        return res.status(200).json({ elemnt })
      } else {
        return res.status(404).json({ msg: 'No hay datos' })
      }
    } catch (error) {
      console.log('🚀 ~ file: generic.controller.js:28 ~ error:', error)
      res.status(500).json({ message: error })
    }
  }

exports.deleteOne = Model =>
  async (req, res, next) => {
    try {
      const id = req.params.id
      const elemnt = await Model.findByPk(id)
      if (!elemnt) {
        return res.status(404).json({ msg: 'Elemento no encontrado' })
      } else {
        elemnt.destroy().then(elemnt => {
          return res.status(200).json({ elemnt })
        })
      }
    } catch (error) {
      console.log('🚀 ~ file: generic.controller.js:46 ~ error:', error)
      res.status(500).json({ message: error })
    }
  }

exports.createOne = Model =>
  async (req, res, next) => {
    try {
      const elemnt = await Model.create(req.body)
      if (elemnt) {
        return res.status(200).json({ elemnt })
      } else {
        return res.status(404).json({ msg: 'No se recibieron los datos' })
      }
    } catch (error) {
      console.log('🚀 ~ file: generic.controller.js:61 ~ error:', error)
      res.status(500).json({ message: error })
    }
  }

exports.updateOne = Model =>
  async (req, res, next) => {
    try {
      const params = req.body
      const id = req.params.id
      const elemnt = await Model.findByPk(id)
      if (elemnt) {
        elemnt.update(params).then(elemnt => {
          res.status(201).json({ elemnt })
        })
      } else {
        return res.status(404).json({ msg: 'Elemento no encontrado' })
      }
    } catch (error) {
      console.log('🚀 ~ file: generic.controller.js:80 ~ error:', error)
      res.status(500).json({ message: error })
    }
  }
