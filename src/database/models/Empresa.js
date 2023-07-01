'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    static associate (models) {
    }
  }
  Empresa.init(
    {
      cuil: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'Cuil requerido' },
          isNumeric: { msg: 'El cuil solo debe contener numeros' },
          len: {
            args: [11, 11],
            msg: 'El cuil debe contener 11 numeros'
          }
        }
      },
      razonSocial: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: { msg: 'Razon social requerida' },
          isAlpha: { msg: 'La razon social solo debe contener letras' },
          len: {
            args: [3, 50],
            msg: 'La razon social debe contener entre 3 a 50 letras'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Empresa',
      freezeTableName: true
    }
  )
  return Empresa
}
