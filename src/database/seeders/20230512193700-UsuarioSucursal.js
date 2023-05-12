'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla UsuarioSucursal
    await queryInterface.bulkInsert('UsuarioSucursal', [{
      idUsuario: 1,
      idSucursal: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idUsuario: 1,
      idSucursal: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idUsuario: 2,
      idSucursal: 1,
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
