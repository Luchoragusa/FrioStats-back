'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Modelo
    await queryInterface.bulkInsert('Modelo', [{
      // Id 1
      descripcion: 'Osaka',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // Id 2
      descripcion: 'Panama',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // Id 3
      descripcion: 'Urano',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // Id 4
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
