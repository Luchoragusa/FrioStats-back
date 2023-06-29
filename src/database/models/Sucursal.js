'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Sucursal extends Model {
    static associate (models) {
      // Relacion con Empresa - Esta tabla tiene una FK de Empresa
      // Sucursal.belongsTo(models.Empresa, { foreignKey: 'id' })
      Sucursal.belongsTo(models.Empresa, { foreignKey: 'cuilEmpresa' })

      // Relacion con Usuario - La tabla intermedia UsuarioSucursal tiene FK de esta tabla
      Sucursal.belongsToMany(models.Usuario, { through: 'UsuarioSucursal', foreignKey: 'idSucursal' })

      // Relacion con MaquinaSucursal - La tabla Sucursal tiene una FK de esta tabla
      // Sucursal.hasMany(models.MaquinaSucursal, { foreignKey: 'idSucursal' })
    }
  }
  Sucursal.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
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
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Telefono requerido' },
        isNumeric: { msg: 'El telefono solo debe contener numeros' },
        len: {
          args: [3, 50],
          msg: 'El telefono debe contener entre 3 a 50 numeros'
        }
      }
    },
    ciudad : {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Ciudad requerida' },
        isAlpha: { msg: 'La ciudad solo debe contener letras' },
        len: {
          args: [3, 50],
          msg: 'La ciudad debe contener entre 3 a 50 letras'
        }
      }
    },
    provincia: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Provincia requerida' },
        isAlpha: { msg: 'La provincia solo debe contener letras' },
        len: {
          args: [3, 50],
          msg: 'La provincia debe contener entre 3 a 50 letras'
        }
      }
    },
    pais: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Pais requerido' },
        isAlpha: { msg: 'El pais solo debe contener letras' },
        len: {
          args: [3, 50],
          msg: 'El pais debe contener entre 3 a 50 letras'
        }
      }
    },
    codPostal: {
      type: DataTypes.STRING(6),
      allowNull: false,
      validate: {
        notNull: { msg: 'Codigo postal requerido' },
        isNumeric: { msg: 'El codigo postal solo debe contener numeros' },
        len: {
          args: [3, 6],
          msg: 'El codigo postal debe contener entre 3 a 6 numeros'
        }
      }
    },
    coordenadas: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Coordenadas requeridas' },
        is: {
          args: /^-?\d{1,3}\.\d{6,}$/i,
          msg: 'Las coordenadas deben ser numeros decimales'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Sucursal',
    freezeTableName: true
  })
  return Sucursal
}
