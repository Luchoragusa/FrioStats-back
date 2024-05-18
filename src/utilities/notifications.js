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
            const empleadosNoti = [];

            // Recorrer los empleados y las sucursalesNoti
            for (const empleado of empleados) {
                const sucNoti = []
                for (const sucursalNoti of sucursalesNoti) {
                    for (const sucursalEmpleado of empleado.Sucursals) {
                        if (sucursalNoti.id === sucursalEmpleado.id) {
                            // Agrego la sucursal al array sucNoti
                            sucNoti.push(sucursalNoti)
                        }
                    }
                }
                // Agregar el empleado al array empleadosNoti con la propiedad adicional de sucursalesNoti
                if (sucNoti.length > 0) {
                    empleadosNoti.push({
                        ...empleado,
                        sucursalesNoti: [sucNoti]
                    });
                }
            }

            // // Tengo los empleados con notificaciones en el array "empleadosNoti", ahora lo recorro y envio las notificaciones
            for (const empleado of empleadosNoti) {
                if (empleado.dataValues.recibeNotiTelegram) {
                    // Enviar notificacion por telegram
                    await sendTelegramNotification(empleado.dataValues)
                }
                if (empleado.dataValues.recibeNotiMail) {
                    // Enviar notificacion por mail
                    await sendNotificationEmail(empleado.dataValues)
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