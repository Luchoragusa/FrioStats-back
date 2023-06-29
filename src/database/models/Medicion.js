'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Medicion extends Model {
    static associate (models) {
      // Relacion con MaquinaSucursal - Esta tabla tiene una FK de MaquinaSucursal
      Medicion.belongsTo(models.MaquinaSucursal, { foreignKey: 'idMaquina' })

      // Relacion con Notificacion - La tabla Notificacion tiene una FK de esta tabla
      // Medicion.hasOne(models.Notificacion, { foreignKey: 'idMedicion' })
    }
  }
  Medicion.init({
    sensorTempTrabajoYBulbo: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Sensor de temperatura de trabajo y bulbo requerido' },
        isDecimal: { msg: 'El sensor de temperatura de trabajo y bulbo debe ser un numero decimal' }
      }
    },
    sensorPuerta: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'Sensor de puerta requerido' }
      }
    },
    sensorCooler: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Sensor de cooler requerido' },
        isDecimal: { msg: 'El sensor de cooler debe ser un numero decimal' }
      }
    },
    sensorPuntoRocio: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Sensor de punto de rocio requerido' },
        isDecimal: { msg: 'El sensor de punto de rocio debe ser un numero decimal' }
      }
    },
    sensorLuz: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'Sensor de luz requerido' }
      }
    },
    consumo: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Consumo requerido' },
        isDecimal: { msg: 'El consumo debe ser un numero decimal' }
      }
    }
  }, {
    sequelize,
    modelName: 'Medicion',
    freezeTableName: true
  })
  return Medicion
}
