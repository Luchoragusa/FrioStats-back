'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Medicion
    await queryInterface.bulkInsert('Medicion', [{
      idMaquina: 1,
      sensorTempTrabajoYBulbo: 8,
      sensorPuerta: 1,
      sensorCooler: 500,
      sensorPuntoRocio: 8,
      sensorLuz: 1,
      consumo: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquina: 2,
      sensorTempTrabajoYBulbo: 30,
      sensorPuerta: 1,
      sensorCooler: 600,
      sensorPuntoRocio: 20,
      sensorLuz: 1,
      consumo: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquina: 3,
      sensorTempTrabajoYBulbo: 30,
      sensorPuerta: 1,
      sensorCooler: 200,
      sensorPuntoRocio: 100,
      sensorLuz: 1,
      consumo: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquina: 4,
      sensorTempTrabajoYBulbo: 100,
      sensorPuerta: 1,
      sensorCooler: 500,
      sensorPuntoRocio: 100,
      sensorLuz: 1,
      consumo: 200,
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
