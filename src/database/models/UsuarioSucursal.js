'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UsuarioSucursal extends Model {
    static associate (models) {
      // Relacion con Usuario - La tabla UsuarioSucursal tiene FK de Usuario llamada idUsuario
      UsuarioSucursal.belongsTo(models.Usuario, { foreignKey: 'idUsuario' })

      // Relacion con Sucursal - La tabla UsuarioSucursal tiene FK de Sucursal llamada idSucursal
      UsuarioSucursal.belongsTo(models.Sucursal, { foreignKey: 'idSucursal' })
    }
  }
  UsuarioSucursal.init({
  }, {
    sequelize,
    modelName: 'UsuarioSucursal',
    freezeTableName: true
  })
  return UsuarioSucursal
}
