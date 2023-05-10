'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tipo extends Model {
        static associate(models) {
            // Relacion con Notificacion - La tabla Notificacion tiene FK de esta tabla
            Tipo.hasMany(models.Notificacion, { foreignKey: 'idTipo' });

            // Relacion con ImportanciaParametro - La tabla ImportanciaParametro tiene FKs de esta tabla
            Tipo.hasMany(models.ImportanciaParametro, { foreignKey: 'idTipoTempTrabajoYBulbo'});
            Tipo.hasMany(models.ImportanciaParametro, { foreignKey: 'idTipoEstadoPuerta'});
            Tipo.hasMany(models.ImportanciaParametro, { foreignKey: 'idTipoCooler'});
            Tipo.hasMany(models.ImportanciaParametro, { foreignKey: 'idTipoPuntoRocio'});
            Tipo.hasMany(models.ImportanciaParametro, { foreignKey: 'idConsumo'});
        }
    }
    Tipo.init({
        descripcion: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notNull: { msg: "Descrpicion requerida" },
                isAlpha: { msg: "La despcripcion solo debe contener letras" },
                len: {
                    args: [3, 50],
                    msg: "La despcripcion debe contener entre 3 a 50 letras"
                }
            },
        }
    }, {
        sequelize,
        modelName: 'Tipo',
    });
    return Tipo;
};