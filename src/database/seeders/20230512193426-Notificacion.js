'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Notificacion
    await queryInterface.bulkInsert('Notificacion', [{
      idTipo: 1,
      idMedicion: 1,
      visto: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idTipo: 1,
      idMedicion: 2,
      visto: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idTipo: 1,
      idMedicion: 3,
      visto: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idTipo: 1,
      idMedicion: 4,
      visto: true,
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
