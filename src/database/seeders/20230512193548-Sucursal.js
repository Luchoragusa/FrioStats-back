'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Sucursal
    await queryInterface.bulkInsert('Sucursal', [{
      nombre: 'La Gallega',
      direccion: 'Av. Pellegrini 1194',
      cuilEmpresa: '123456789',
      telefono: '0341 4801909',
      ciudad: 'Rosario',
      provincia: 'Santa Fe',
      pais: 'Argentina',
      coordenadas: '-32.95441522575155, -60.6419849147835',
      codPostal: '2000',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nombre: 'La Gallega',
      direccion: 'Blvd. Oroño 245',
      cuilEmpresa: '123456789',
      telefono: '0341 4801900',
      ciudad: 'Rosario',
      provincia: 'Santa Fe',
      pais: 'Argentina',
      coordenadas: '-32.93732550674772, -60.65124208102595',
      codPostal: '2000',
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
