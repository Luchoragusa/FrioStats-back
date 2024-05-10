const { Empresa, Sucursal, UsuarioSucursal, Usuario } = require('../database/models/index.js')
const { Op } = require('sequelize')
const { sendErrorMessage, sendInfoMessage, sendSuccessMessage, sendTelegramNotification } = require('./util')
const { sendNotificationEmail } = require('./mail/sendEmail')

const checkNotifications = async (rmaquinasNoti) => {
    try {
        // Traigo todas las empresas con sus sucursales
        const empresas = await Empresa.findAll({
            include: {
                model: Sucursal
            }
        })

        // Recorro las empresas
        for (const empresa of empresas) {
            // Creo un array de sucursales con notificaciones
            const sucursalesNoti = []
            // Recorro las sucursales de la empresa
            for (const sucursal of empresa.Sucursals) {
                // Recorro las notificaciones de las maquinas
                for (const rmaquinaNoti of rmaquinasNoti) {
                    // Si la sucursal tiene notificaciones la agrego al array
                    if (rmaquinaNoti.idSucursal === sucursal.id) {
                        sucursalesNoti.push(sucursal)
                    }
                }
            }
            // Tengo las sucursales con notificaciones en el array "sucursalesNoti"

            // Traigo los empleados de la empresa que tenga alguno de los 2 campos "recibeNotiTelegram" y/o "recibeNotiMail" en true y que ademas esten asignados a alguna de las sucursales con notificaciones en la tabla UsuarioSucursal
            const empleados = await Usuario.findAll({
                where: {
                    cuilEmpresa: empresa.cuil,
                    [Op.or]: [
                        { recibeNotiTelegram: true },
                        { recibeNotiMail: true }
                    ]
                },
                include: [{
                    model: Sucursal,
                    through: {
                      model: UsuarioSucursal,
                      attributes: []
                    }
                  }],
            })

            // Crear un conjunto para mantener un registro de los empleados únicos
            const empleadosNotiSet = new Set();
            const empleadosNoti = [];

            // Recorrer los empleados y las sucursalesNoti
            for (const empleado of empleados) {
                for (const sucursalNoti of sucursalesNoti) {
                    // Verificar si el empleado ya está en el conjunto
                    if (empleadosNotiSet.has(empleado.id)) {
                        // Si ya está en el conjunto, pasar al siguiente empleado
                        continue;
                    }
                    for (const sucursalEmpleado of empleado.Sucursals) {
                        if (sucursalNoti.id === sucursalEmpleado.id) {
                            empleadosNotiSet.add(empleado.id); // Agregar el empleado al conjunto
                            empleadosNoti.push(empleado); // Agregar el empleado al array empleadosNoti
                            break; // Salir del bucle interno
                        }
                    }
                }
            }

            // Tengo los empleados con notificaciones en el array "empleadosNoti", ahora lo recorro y envio las notificaciones
            for (const empleado of empleadosNoti) {
                if (empleado.recibeNotiTelegram) {
                    // Enviar notificacion por telegram
                    await sendTelegramNotification(empleado)
                }
                if (empleado.recibeNotiMail) {
                    // Enviar notificacion por mail
                    await sendNotificationEmail(empleado)
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    checkNotifications
}