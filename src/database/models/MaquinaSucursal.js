'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MaquinaSucursal extends Model {
        static associate(models) {
            // Relacion con Sucursal - Esta tabla tiene una FK de Sucursal
            MaquinaSucursal.belongsTo(models.Sucursal, { foreignKey: 'idSucursal'});

            // Relacion con Modelo - Esta tabla tiene una FK de Modelo
            MaquinaSucursal.belongsTo(models.Modelo, { foreignKey: 'idModelo'});

            // Relacion con Parametro - La tabla Parametro tiene FK de esta tabla
            MaquinaSucursal.hasOne(models.Parametro, { foreignKey: 'idMaquina' });   

            // Relacion con ImportanciaParametro - La tabla ImportanciaParametro tiene FK de esta tabla
            MaquinaSucursal.hasOne(models.ImportanciaParametro, { foreignKey: 'idMaquina' });  
        }
    }
    MaquinaSucursal.init({
    }, {
        sequelize,
        modelName: 'MaquinaSucursal',
    });
    return MaquinaSucursal;
};