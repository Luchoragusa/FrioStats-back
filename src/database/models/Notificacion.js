'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notificacion extends Model {
        static associate(models) {
            // Relacion con Medicion - Esta tabla tiene una FK de Medicion
            Notificacion.belongsTo(models.Medicion, { foreignKey: 'idMedicion'});

            // Relacion con Tipo - Esta tabla tiene una FK de Tipo
            Notificacion.belongsTo(models.Tipo, { foreignKey: 'idTipo'});
        }
    }
    Notificacion.init({
        visto: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: { msg: "Visto requerido" },
            },
        },
    }, {
        sequelize,
        modelName: 'Notificacion',
    });
    return Notificacion;
};