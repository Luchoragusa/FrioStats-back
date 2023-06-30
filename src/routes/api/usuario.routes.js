const Router = require('express')
const router = Router()
const { register, login } = require('../../controllers/models/usuario.controller')
const { validateToken, policy } = require('../../utilities/middleware')

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
// router.patch('/:id') // actualiza uno

module.exports = router
