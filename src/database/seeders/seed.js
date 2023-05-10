// eslint-disable-next-line no-unused-vars
const bcrypt = require('bcryptjs')

// En este caso descripcion es el nombre del tipo de parametro de Tipo, la id la asigna sola sequelize
const tipos = [
  { descripcion: 'Leve' },
  { descripcion: 'Moderado' }
]

module.exports = {
  tipos
}
