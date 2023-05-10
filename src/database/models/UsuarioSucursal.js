'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UsuarioSucursal extends Model {
        static associate(models) {
        }
    }
    UsuarioSucursal.init({
    }, {
        sequelize,
        modelName: 'UsuarioSucursal',
    });
    return UsuarioSucursal;
};