'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla MaquinaSucursal
    await queryInterface.bulkInsert('MaquinaSucursal', [{
      idSucursal: 1,
      idModelo: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idSucursal: 1,
      idModelo: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idSucursal: 1,
      idModelo: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idSucursal: 1,
      idModelo: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idSucursal: 2,
      idModelo: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idSucursal: 2,
      idModelo: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idSucursal: 2,
      idModelo: 3,
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