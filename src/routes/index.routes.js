const Router = require('express')
const router = Router()

const { store, destroy, update } = require('../controllers/index.controller.js')

// API

router.post('/store', store)

router.patch('/:id', update)

router.delete('/:id', destroy)

module.exports = router
