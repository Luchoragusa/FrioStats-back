'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Tipo
    await queryInterface.bulkInsert('Tipo', [{
      descripcion: 'Leve',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      descripcion: 'Grave',
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
