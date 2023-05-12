'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Rol
    await queryInterface.bulkInsert('Rol', [{
      descripcion: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      descripcion: 'User',
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
