'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Sucursal
    await queryInterface.bulkInsert('Sucursal', [{
      nombre: 'La Gallega',
      direccion: 'Av. San Martin 123',
      cuil: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nombre: 'La Gallega',
      direccion: 'Mitre y Pellegrini',
      cuil: '123456789',
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
