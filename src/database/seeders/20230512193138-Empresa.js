'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Empresa
    await queryInterface.bulkInsert('Empresa', [{
      razonSocial: 'Gallego',
      cuil: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      razonSocial: 'Pepito',
      cuil: '987654321',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
  }
}
