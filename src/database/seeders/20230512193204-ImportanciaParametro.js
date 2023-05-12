'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla ImportanciaParametro
    await queryInterface.bulkInsert('ImportanciaParametro', [{
      idMaquina: 1,
      idTipoTempTrabajoYBulbo: 1,
      idTipoEstadoPuerta: 1,
      idTipoCooler: 1,
      idTipoPuntoRocio: 1,
      idConsumo: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquina: 2,
      idTipoTempTrabajoYBulbo: 1,
      idTipoEstadoPuerta: 1,
      idTipoCooler: 1,
      idTipoPuntoRocio: 1,
      idConsumo: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquina: 3,
      idTipoTempTrabajoYBulbo: 1,
      idTipoEstadoPuerta: 1,
      idTipoCooler: 1,
      idTipoPuntoRocio: 1,
      idConsumo: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquina: 4,
      idTipoTempTrabajoYBulbo: 1,
      idTipoEstadoPuerta: 1,
      idTipoCooler: 1,
      idTipoPuntoRocio: 1,
      idConsumo: 1,
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
