'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Sucursal extends Model {
    static associate (models) {
      // Relacion con Empresa - Esta tabla tiene una FK de Empresa
      Sucursal.belongsTo(models.Empresa, { foreignKey: 'id' })

      // Relacion con Usuario - La tabla intermedia UsuarioSucursal tiene FK de esta tabla
      Sucursal.belongsToMany(models.Usuario, { through: 'UsuarioSucursal', foreignKey: 'idSucursal' })

      // Relacion con MaquinaSucursal - La tabla Sucursal tiene una FK de esta tabla
      Sucursal.hasMany(models.MaquinaSucursal, { foreignKey: 'idSucursal' })
    }
  }
  Sucursal.init({
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Nombre requerido' },
        isAlpha: { msg: 'El nombre solo debe contener letras' },
        len: {
          args: [3, 50],
          msg: 'El nombre debe contener entre 3 a 50 letras'
        }
      }
    },
    direccion: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Direccion requerida' },
        len: {
          args: [3, 50],
          msg: 'La direccion debe contener entre 3 a 50 caracteres'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Sucursal',
    freezeTableName: true
  })
  return Sucursal
}
