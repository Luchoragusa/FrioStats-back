'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Modelo
    await queryInterface.bulkInsert('Modelo', [{
      descripcion: 'Osaka',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      descripcion: 'Panama',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      descripcion: 'Urano',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      descripcion: 'Venezia',
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
