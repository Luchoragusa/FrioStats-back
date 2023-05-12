'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ImportanciaParametro extends Model {
    static associate (models) {
      // Relacion con Parametro - Esta tabla tiene una FK de MaquinaSucursal
      ImportanciaParametro.belongsTo(models.MaquinaSucursal, { foreignKey: 'idMaquina' })

      // Relacion con Tipo - Esta tabla tiene FKs de Tipo
      ImportanciaParametro.belongsTo(models.Tipo, { foreignKey: 'idTipoTempTrabajoYBulbo' })
      ImportanciaParametro.belongsTo(models.Tipo, { foreignKey: 'idTipoEstadoPuerta' })
      ImportanciaParametro.belongsTo(models.Tipo, { foreignKey: 'idTipoCooler' })
      ImportanciaParametro.belongsTo(models.Tipo, { foreignKey: 'idTipoPuntoRocio' })
      ImportanciaParametro.belongsTo(models.Tipo, { foreignKey: 'idConsumo' })
    }
  }
  ImportanciaParametro.init({

  }, {
    sequelize,
    modelName: 'ImportanciaParametro',
    freezeTableName: true
  })
  return ImportanciaParametro
}
