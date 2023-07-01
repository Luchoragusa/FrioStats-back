'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tipo extends Model {
    static associate (models) {
      // Relacion con Notificacion - La tabla Notificacion tiene FK de esta tabla llamada idTipo
      Tipo.hasMany(models.Notificacion, { foreignKey: 'idTipo' })
    }
  }
  Tipo.init({
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
    modelName: 'Tipo',
    freezeTableName: true
  })
  return Tipo
}
