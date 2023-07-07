const { check } = require('express-validator')
const { validationResult } = require('express-validator')

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    res.status(403)
    res.send({ errors: error.array() })
  }
}

const validateRegister = [
  check('email')
    .exists()
    .isLength({ min: 5 })
    .withMessage('El correo debe contener mas de 5 caracteres')
    .isEmail()
    .withMessage('No contiene un formato de email valido'),
  check('password')
    .exists()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe contener mas de 6 caracteres y menos de 50'),
  check('nombre')
    .exists()
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre debe contener mas de 3 caracteres')
    .isAlpha()
    .withMessage('El nombre solo debe contener letras'),
  check('apellido')
    .exists()
    .isLength({ min: 3, max: 50 })
    .withMessage('El apellido debe contener mas de 3 caracteres y menos de 50')
    .isAlpha()
    .withMessage('El apellido solo debe contener letras'),
  check('telegramId')
    .optional()
    .isNumeric()
    .withMessage('El id de telegram solo debe contener numeros')
    .isLength({ min: 5, max: 20 })
    .withMessage('El id de telegram debe contener entre 5 a 20 numeros'),
  check('recibeNotiTelegram')
    .optional()
    .isBoolean()
    .withMessage('El campo recibeNotiTelegram debe ser booleano'),
  check('recibeNotiMail')
    .optional()
    .isBoolean()
    .withMessage('El campo recibeNotiMail debe ser booleano'),
  check('idSucursal')
    .exists()
    .isNumeric()
    .withMessage('El id de sucursal debe ser numerico'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const validateLogin = [
  check('email')
    .exists()
    .isLength({ min: 5 })
    .withMessage('El correo debe contener mas de 5 caracteres')
    .isEmail()
    .withMessage('No contiene un formato de email valido'),
  check('password')
    .exists()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe contener mas de 6 caracteres'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = {
  validateLogin,
  validateRegister
}
