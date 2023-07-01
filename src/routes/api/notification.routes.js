const Router = require('express')
const router = Router()
const { checkNotifications } = require('../../controllers/models/notification.controller')

router.get('/checkNotifications', checkNotifications) // muestra todos

module.exports = router
