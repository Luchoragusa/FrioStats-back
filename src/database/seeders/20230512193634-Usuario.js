'use strict'
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Usuario
    await queryInterface.bulkInsert('Usuario', [{
      nombre: 'admin',
      apellido: 'admin',
      password: bcrypt.hashSync('admin123', 10),
      email: 'admin@gmail.com',
      telegramId: '123456789',
      idRol: 1,
      telegramToken: '1ABC-E',
      emailConfirmado: true,
      cuilEmpresa: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nombre: 'user',
      apellido: 'user',
      password: bcrypt.hashSync('user123', 10),
      email: 'user@gmail.com',
      telegramId: '987654321',
      idRol: 2,
      telegramToken: '2ABC-E',
      emailConfirmado: true,
      cuilEmpresa: '987654321',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
