'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Notificacion extends Model {
    static associate (models) {
      // Relacion con Medicion - La tabla Notificacion tiene una FK de Medicion llamada idMedicion
      Notificacion.belongsTo(models.Medicion, { foreignKey: 'idMedicion' })

      // Relacion con Tipo - La tabla Notificacion tiene una FK de Tipo llamada idTipo
      Notificacion.belongsTo(models.Tipo, { foreignKey: 'idTipo' })
    }
  }
  Notificacion.init({
    visto: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'Visto requerido' }
      },
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Notificacion',
    freezeTableName: true
  })
  return Notificacion
}
