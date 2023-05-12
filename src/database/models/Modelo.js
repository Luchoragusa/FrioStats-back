'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Modelo extends Model {
    static associate (models) {
      // Relacion con MaquinaSucursal - MaquinaSucursal tiene una FK de esta tabla
      Modelo.hasMany(models.MaquinaSucursal, { foreignKey: 'idModelo' })
    }
  }
  Modelo.init({
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: { msg: 'Descrpicion requerida' },
        len: {
          args: [3, 100],
          msg: 'La despcripcion debe contener entre 3 a 100 caracrteres'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Modelo',
    freezeTableName: true
  })
  return Modelo
}
