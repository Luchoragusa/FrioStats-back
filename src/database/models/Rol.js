'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    static associate (models) {
      // Rol.hasMany(models.Usuario, { foreignKey: 'idRol' })
    }
  }
  Rol.init({
    descripcion: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: 'Descrpicion requerida' },
        isAlpha: { msg: 'La despcripcion solo debe contener letras' },
        len: {
          args: [3, 50],
          msg: 'La despcripcion debe contener entre 3 a 50 letras'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Rol',
    freezeTableName: true
  })
  return Rol
}
