'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate (models) {
      // Relacion con Rol - Esta tabla tiene una FK de Rol
      Usuario.belongsTo(models.Rol, { foreignKey: 'idRol' })

      // Relacion con Sucursal - La tabla intermedia UsuarioSucursal tiene FK de esta tabla
      Usuario.belongsToMany(models.Sucursal, { through: 'UsuarioSucursal', foreignKey: 'idUsuario' })
    }
  }
  Usuario.init({
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
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Apellido requerido' },
        isAlpha: { msg: 'El apellido solo debe contener letras' },
        len: {
          args: [3, 50],
          msg: 'El apellido debe contener entre 3 a 50 letras'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Email requerido' },
        isEmail: { msg: 'Formato de email invalido' },
        len: {
          args: [5, 100],
          msg: 'El correo puede contener hasta 100 caracteres maximo'
        }
      }
    },
    telegramId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
      validate: {
        isNumeric: { msg: 'El id de telegram solo debe contener numeros' },
        len: {
          args: [5, 20],
          msg: 'El id de telegram debe contener entre 5 a 20 numeros'
        }
      }
    },
    recibeNoti: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    freezeTableName: true
  })

  Usuario.addHook('beforeCreate', (usuario) => {
    usuario.password = bcrypt.hashSync(usuario.password, 10)
  })

  return Usuario
}
