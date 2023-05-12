'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Parametro
    await queryInterface.bulkInsert('Parametro', [{
      maxTempTrabajoYBulbo: 10,
      minTempTrabajoYBulbo: 5,
      estadoPuerta: 1,
      maxRpmCooler: 700,
      minRpmCooler: 300,
      maxPuntoRocio: 10,
      minPuntoRocio: 5,
      maxConsumo: 10,
      idMaquina: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      maxTempTrabajoYBulbo: 20,
      minTempTrabajoYBulbo: 10,
      estadoPuerta: 1,
      maxRpmCooler: 700,
      minRpmCooler: 300,
      maxPuntoRocio: 20,
      minPuntoRocio: 10,
      maxConsumo: 20,
      idMaquina: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      maxTempTrabajoYBulbo: 10,
      minTempTrabajoYBulbo: 5,
      estadoPuerta: 1,
      maxRpmCooler: 700,
      minRpmCooler: 300,
      maxPuntoRocio: 10,
      minPuntoRocio: 5,
      maxConsumo: 10,
      idMaquina: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      maxTempTrabajoYBulbo: 100,
      minTempTrabajoYBulbo: 50,
      estadoPuerta: 1,
      maxRpmCooler: 700,
      minRpmCooler: 300,
      maxPuntoRocio: 100,
      minPuntoRocio: 50,
      maxConsumo: 200,
      idMaquina: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {})
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
