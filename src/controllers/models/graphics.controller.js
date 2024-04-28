const { Medicion } = require('../../database/models/index')
const Util = require('../../utilities/util')
const { Op } = require('sequelize');


const getInfo = async (req, res) => {
    try {
        // Valido que esten los parametros de la ruta

        if (!req.query.idMaquina) return res.status(400).json({ message: 'Falta el Id de la maquina' })
        const idMaquina = req.query.idMaquina
        if (!req.query.parametro) return res.status(400).json({ message: 'Falta el parametro' })
        const parametro = req.query.parametro

        // Valido que el tipo de parametro del cual se quiere obtener la informacion sea correcto
        if (parametro !== 'sensorTempInterna' 
            && parametro !== 'sensorTempTrabajoYBulbo' 
            && parametro !== 'sensorPuerta'
            && parametro !== 'sensorCooler'
            && parametro !== 'sensorPuntoRocio'
            && parametro !== 'sensorLuz'
            && parametro !== 'consumo') return res.status(400).json({ message: `El parametro ingresado no es correcto - Ingreso [${parametro}]` })
        
        // Valido las fechas
        if (!req.query.fechaInicio) return res.status(400).json({ message: 'Falta la fecha de inicio' })
        const fechaInicio =  new Date(req.query.fechaInicio)
        if (!req.query.fechaFin) return res.status(400).json({ message: 'Falta la fecha de fin' })
        const fechaFin =  new Date(req.query.fechaFin)

        // Valido que la fecha de inicio sea menor a la fecha de fin
        if (fechaInicio > fechaFin) return res.status(400).json({ message: 'La fecha de inicio debe ser menor a la fecha de fin' })

        // Busco las mediciones de la maquina en el rango de fechas
        await Medicion.findAll({
            where: {
                idMaquina,
                createdAt: {
                    [Op.between]: [fechaInicio, fechaFin]
                }
            },
            attributes: [parametro, 'createdAt']
        }).then(mediciones => {
            if (mediciones.length === 0) return res.status(200).json({ message: 'No se encontraron mediciones para esa fecha' })

            const formattedMediciones = mediciones.map(medicion => {
                const fecha = new Date(medicion.createdAt);
                const hora = `${fecha.getHours()}:${fecha.getMinutes() < 10 ? '0' : ''}${fecha.getMinutes()}`;
                const fechaString = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
                return [hora, fechaString, medicion.consumo];
            });

            res.status(200).json(formattedMediciones)
        })
        
    } catch (error) {
        Util.catchError(res, error, '🚀 ~ file: graphics.controller.js:23 ~ getLocals ~ error:')
    }
}

module.exports = {
    getInfo
    }

