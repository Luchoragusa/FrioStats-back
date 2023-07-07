'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Parametro extends Model {
    static associate (models) {
      // Relacion con MaquinaSucursal - La tabla Parametro tiene una FK de MaquinaSucursal llamada idMaquina
      Parametro.belongsTo(models.MaquinaSucursal, { foreignKey: 'idMaquina' })
    }
  }
  Parametro.init({
    maxTempInterna: {
      type: DataTypes.FLOAT(6, 3),
      allowNull: false,
      validate: {
        notNull: { msg: 'Maxima temperatura interna requerida' },
        isDecimal: { msg: 'La maxima temperatura interna solo debe contener numeros' }
      }
    },
    minTempInterna: {
      type: DataTypes.FLOAT(6, 3),
      allowNull: false,
      validate: {
        notNull: { msg: 'Minima temperatura interna requerida' },
        isDecimal: { msg: 'La minima temperatura interna solo debe contener numeros' }
      }
    },
    maxTempTrabajoYBulbo: {
      type: DataTypes.FLOAT(6, 3),
      allowNull: false,
      validate: {
        notNull: { msg: 'Maxima temperatura de trabajo y bulbo requerida' },
        isDecimal: { msg: 'La maxima temperatura de trabajo y bulbo solo debe contener numeros' }
      }
    },
    minTempTrabajoYBulbo: {
      type: DataTypes.FLOAT(6, 3),
      allowNull: false,
      validate: {
        notNull: { msg: 'Minima temperatura de trabajo y bulbo requerida' },
        isDecimal: { msg: 'La minima temperatura de trabajo y bulbo solo debe contener numeros' }
      }
    },
    estadoPuerta: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'Estado de puerta requerido' },
        isBoolean: { msg: 'El estado de puerta solo debe contener valores booleanos' }
      }
    },
    minRpmCooler: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Minima RPM de cooler requerida' },
        isNumeric: { msg: 'La minima RPM de cooler solo debe contener numeros' }
      }
    },
    maxRpmCooler: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Maxima RPM de cooler requerida' },
        isNumeric: { msg: 'La maxima RPM de cooler solo debe contener numeros' }
      }
    },
    minPuntoRocio: {
      type: DataTypes.FLOAT(6, 3),
      allowNull: false,
      validate: {
        notNull: { msg: 'Minimo punto de rocio requerido' },
        isDecimal: { msg: 'El minimo punto de rocio solo debe contener numeros' }
      }
    },
    maxPuntoRocio: {
      type: DataTypes.FLOAT(6, 3),
      allowNull: false,
      validate: {
        notNull: { msg: 'Maximo punto de rocio requerido' },
        isDecimal: { msg: 'El maximo punto de rocio solo debe contener numeros' }
      }
    },
    maxConsumo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Maximo consumo requerido' },
        isNumeric: { msg: 'El maximo consumo solo debe contener numeros' }
      }
    }
  }, {
    sequelize,
    modelName: 'Parametro',
    freezeTableName: true
  })
  return Parametro
}
