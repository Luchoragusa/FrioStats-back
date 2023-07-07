'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Parametro
    await queryInterface.bulkInsert('Parametro', [{
      // Modelo Osaka
      // https://prnt.sc/TckF-Zi8f87E
      maxTempInterna: 4,
      minTempInterna: -1,
      maxTempTrabajoYBulbo: 40,
      minTempTrabajoYBulbo: 16,
      estadoPuerta: 1,
      maxRpmCooler: 1500,
      minRpmCooler: 300,
      maxPuntoRocio: 30.0,
      minPuntoRocio: 9.3,
      maxConsumo: 1200,
      idMaquina: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // Modelo Panama
      // https://prnt.sc/zwL0XFZJWOKQ
      maxTempInterna: 6,
      minTempInterna: 0,
      maxTempTrabajoYBulbo: 40,
      minTempTrabajoYBulbo: 16,
      estadoPuerta: 1,
      maxRpmCooler: 1500,
      minRpmCooler: 300,
      maxPuntoRocio: 30.0,
      minPuntoRocio: 9.3,
      maxConsumo: 1200,
      idMaquina: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // Modelo Urano
      maxTempInterna: -10,
      minTempInterna: -23,
      maxTempTrabajoYBulbo: 40,
      minTempTrabajoYBulbo: 16,
      estadoPuerta: 1,
      maxRpmCooler: 1500,
      minRpmCooler: 300,
      maxPuntoRocio: 30.0,
      minPuntoRocio: 9.3,
      maxConsumo: 900,
      idMaquina: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // Modelo Venezia
      maxTempInterna: 5,
      minTempInterna: -2,
      maxTempTrabajoYBulbo: 40,
      minTempTrabajoYBulbo: 16,
      estadoPuerta: 1,
      maxRpmCooler: 1500,
      minRpmCooler: 300,
      maxPuntoRocio: 30.0,
      minPuntoRocio: 9.3,
      maxConsumo: 1200,
      idMaquina: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // Modelo Osaka
      // https://prnt.sc/TckF-Zi8f87E
      maxTempInterna: 4,
      minTempInterna: -1,
      maxTempTrabajoYBulbo: 40,
      minTempTrabajoYBulbo: 16,
      estadoPuerta: 1,
      maxRpmCooler: 1500,
      minRpmCooler: 300,
      maxPuntoRocio: 30.0,
      minPuntoRocio: 9.3,
      maxConsumo: 1200,
      idMaquina: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // Modelo Panama
      // https://prnt.sc/zwL0XFZJWOKQ
      maxTempInterna: 6,
      minTempInterna: 0,
      maxTempTrabajoYBulbo: 40,
      minTempTrabajoYBulbo: 16,
      estadoPuerta: 1,
      maxRpmCooler: 1500,
      minRpmCooler: 300,
      maxPuntoRocio: 30.0,
      minPuntoRocio: 9.3,
      maxConsumo: 1200,
      idMaquina: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      // Modelo Urano
      maxTempInterna: -10,
      minTempInterna: -23,
      maxTempTrabajoYBulbo: 40,
      minTempTrabajoYBulbo: 16,
      estadoPuerta: 1,
      maxRpmCooler: 1500,
      minRpmCooler: 300,
      maxPuntoRocio: 30.0,
      minPuntoRocio: 9.3,
      maxConsumo: 900,
      idMaquina: 3,
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
