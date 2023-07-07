'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Medicion
    await queryInterface.bulkInsert('Medicion', [{
      idMaquina: 1,
      sensorTempInterna: 2.3,
      sensorTempTrabajoYBulbo: 28.4,
      sensorPuerta: 1,
      sensorCooler: 750,
      sensorPuntoRocio: 18.4,
      sensorLuz: 1,
      consumo: 950,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquina: 2,
      sensorTempInterna: 2.3,
      sensorTempTrabajoYBulbo: 28.4,
      sensorPuerta: 1,
      sensorCooler: 750,
      sensorPuntoRocio: 18.4,
      sensorLuz: 1,
      consumo: 950,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquina: 3,
      sensorTempInterna: -19.32,
      sensorTempTrabajoYBulbo: 28.4,
      sensorPuerta: 1,
      sensorCooler: 750,
      sensorPuntoRocio: 18.4,
      sensorLuz: 1,
      consumo: 950,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquina: 4,
      sensorTempInterna: 2.3,
      sensorTempTrabajoYBulbo: 28.4,
      sensorPuerta: 1,
      sensorCooler: 750,
      sensorPuntoRocio: 18.4,
      sensorLuz: 1,
      consumo: 950,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquina: 5,
      sensorTempInterna: 2.3,
      sensorTempTrabajoYBulbo: 28.4,
      sensorPuerta: 1,
      sensorCooler: 750,
      sensorPuntoRocio: 18.4,
      sensorLuz: 1,
      consumo: 950,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquina: 6,
      sensorTempInterna: 2.3,
      sensorTempTrabajoYBulbo: 28.4,
      sensorPuerta: 1,
      sensorCooler: 750,
      sensorPuntoRocio: 18.4,
      sensorLuz: 1,
      consumo: 950,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquina: 7,
      sensorTempInterna: -19.32,
      sensorTempTrabajoYBulbo: 28.4,
      sensorPuerta: 1,
      sensorCooler: 750,
      sensorPuntoRocio: 18.4,
      sensorLuz: 1,
      consumo: 950,
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
