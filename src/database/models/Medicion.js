'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Medicion extends Model {
    static associate (models) {
      // Relacion con MaquinaSucursal - La tabla Medicion tiene una FK de MaquinaSucursal llamada idMaquina
      Medicion.belongsTo(models.MaquinaSucursal, { foreignKey: 'idMaquina' })
    }
  }
  Medicion.init({
    sensorTempInterna: {
      type: DataTypes.FLOAT(6, 3),
      allowNull: false,
      validate: {
        notNull: { msg: 'Sensor de temperatura interna requerido' },
        isDecimal: { msg: 'El sensor de temperatura interna debe ser un numero decimal' }
      }
    },
    sensorTempTrabajoYBulbo: {
      type: DataTypes.FLOAT(6, 3),
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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Sensor de cooler requerido' },
        isNumeric: { msg: 'El sensor de cooler debe ser un numero decimal' }
      }
    },
    sensorPuntoRocio: {
      type: DataTypes.FLOAT(6, 3),
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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Consumo requerido' },
        isNumeric: { msg: 'El consumo debe ser un numero decimal' }
      }
    }
  }, {
    sequelize,
    modelName: 'Medicion',
    freezeTableName: true
  })
  return Medicion
}
