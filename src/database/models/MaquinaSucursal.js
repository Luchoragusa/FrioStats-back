'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MaquinaSucursal extends Model {
    static associate (models) {
      // Relacion con Sucursal - LA tabla MaquinaSucursal tiene una FK de Sucursal llamada idSucursal
      MaquinaSucursal.belongsTo(models.Sucursal, { foreignKey: 'idSucursal' })

      // Relacion con Modelo - La tabla MaquinaSucursal tiene una FK de Modelo llamada idModelo
      MaquinaSucursal.belongsTo(models.Modelo, { foreignKey: 'idModelo' })

      // Relacion con Notificacion - La tabla Notificacion tiene una FK de MaquinaSucursal llamada idMaquina
      MaquinaSucursal.hasMany(models.Notificacion, { foreignKey: 'idMaquina' })
    }
  }
  MaquinaSucursal.init({
    coords: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Coordenadas requeridas' }
      }
    },
    icono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Icono requerido' }
      }
    },
  }, {
    sequelize,
    modelName: 'MaquinaSucursal',
    freezeTableName: true
  })
  return MaquinaSucursal
}
