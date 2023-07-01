const Router = require('express')
const router = Router()
const { register, login, update } = require('../../controllers/models/user.controller')
const { validateToken } = require('../../utilities/middleware')

// Genericas
// router.get('/', checkToken, getAll(User)); // muestra todos
// router.get('/:id', checkToken, getOne(User)); // muestra uno
// router.delete('/:id', checkToken, policy, deleteOne(User)); // borra uno

// router.get('/', validateToken, policy, (req, res) => {
//   res.status(200).json({ message: 'Hola' })
// })

//  Especificas
router.post('/register', register) // Registrar un usuario en la DB
router.post('/login', login) // crea uno
router.patch('/', validateToken, update) // actualiza uno

module.exports = router
