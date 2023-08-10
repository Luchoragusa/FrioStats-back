'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MaquinaSucursal extends Model {
    static associate (models) {
      // Relacion con Sucursal - LA tabla MaquinaSucursal tiene una FK de Sucursal llamada idSucursal
      MaquinaSucursal.belongsTo(models.Sucursal, { foreignKey: 'idSucursal' })

      // Relacion con Modelo - La tabla MaquinaSucursal tiene una FK de Modelo llamada idModelo
      MaquinaSucursal.belongsTo(models.Modelo, { foreignKey: 'idModelo' })
    }
  }
  MaquinaSucursal.init({
    coords: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Coordenadas requeridas' }
      }
    }
  }, {
    sequelize,
    modelName: 'MaquinaSucursal',
    freezeTableName: true
  })
  return MaquinaSucursal
}
