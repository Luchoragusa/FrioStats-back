const { Medicion, MaquinaSucursal, Notificacion } = require('../../database/models/index')
const Util = require('../../utilities/util')
const { Op } = require('sequelize');


const getInfo = async (req, res) => {
    try {
        // Valido que esten los parametros de la ruta

        if (!req.query.idMaquina) return res.status(400).json({ message: 'Falta el Id de la maquina' })
        const idMaquina = req.query.idMaquina
        // if (!req.query.parametro) return res.status(400).json({ message: 'Falta el parametro' })
        // const parametro = req.query.parametro

        // // Valido que el tipo de parametro del cual se quiere obtener la informacion sea correcto
        // if (parametro !== 'sensorTempInterna' 
        //     && parametro !== 'sensorTempTrabajoYBulbo' 
        //     && parametro !== 'sensorPuerta'
        //     && parametro !== 'sensorCooler'
        //     && parametro !== 'sensorPuntoRocio'
        //     && parametro !== 'sensorLuz'
        //     && parametro !== 'consumo') return res.status(400).json({ message: `El parametro ingresado no es correcto - Ingreso [${parametro}]` })
        
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
            attributes: ['sensorTempInterna', 'sensorTempTrabajoYBulbo', 'sensorPuerta', 'sensorCooler', 'sensorPuntoRocio', 'sensorLuz', 'consumo', 'createdAt']
        }).then(mediciones => {
            if (mediciones.length === 0) return res.status(200).json({ message: 'No se encontraron mediciones para esa fecha' })

                const formattedData = {
                    valuesSensorTempInterna: [],
                    labelsSensorTempInterna: [],
                    valuesSensorTempTrabajoYBulbo: [],
                    labelsSensorTempTrabajoYBulbo: [],
                    valuesSensorPuerta: [],
                    labelsSensorPuerta: [],
                    valuesSensorRpmCooler: [],
                    labelsSensorRpmCooler: [],
                    valuesSensorPuntoRocio: [],
                    labelsSensorPuntoRocio: [],
                    valuesSensorLuz: [],
                    labelsSensorLuz: [],
                    valuesSensorConsumo: [],
                    labelsSensorConsumo: []
                  };
                  
                  mediciones.forEach(medicion => {
                    const fecha = new Date(medicion.createdAt);
                    const hora = `${fecha.getHours()}:${fecha.getMinutes() < 10 ? '0' : ''}${fecha.getMinutes()}`;
                    const fechaString = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
                  
                    Object.entries(medicion.dataValues).forEach(([key, value]) => {
                      switch (key) {
                        case 'sensorTempInterna':
                          formattedData.valuesSensorTempInterna.push(value);
                          formattedData.labelsSensorTempInterna.push(`${hora} - ${fechaString}`);
                          break;
                        case 'sensorTempTrabajoYBulbo':
                          formattedData.valuesSensorTempTrabajoYBulbo.push(value);
                          formattedData.labelsSensorTempTrabajoYBulbo.push(`${hora} - ${fechaString}`);
                          break;
                        case 'sensorPuerta':
                          formattedData.valuesSensorPuerta.push(value ? 1 : 0);
                          formattedData.labelsSensorPuerta.push(`${hora} - ${fechaString}`);
                          break;
                        case 'sensorCooler':
                          formattedData.valuesSensorRpmCooler.push(value);
                          formattedData.labelsSensorRpmCooler.push(`${hora} - ${fechaString}`);
                          break;
                        case 'sensorPuntoRocio':
                          formattedData.valuesSensorPuntoRocio.push(value);
                          formattedData.labelsSensorPuntoRocio.push(`${hora} - ${fechaString}`);
                          break;
                        case 'sensorLuz':
                          formattedData.valuesSensorLuz.push(value ? 1 : 0);
                          formattedData.labelsSensorLuz.push(`${hora} - ${fechaString}`);
                          break;
                        case 'consumo':
                          formattedData.valuesSensorConsumo.push(value);
                          formattedData.labelsSensorConsumo.push(`${hora} - ${fechaString}`);
                          break;
                      }
                    });
                  });
                  
                  res.status(200).json(formattedData);
        })
        
    } catch (error) {
        Util.catchError(res, error, '🚀 ~ file: graphics.controller.js:23 ~ getLocals ~ error:')
    }
}



// Se recibe una idSucursal, y 2 fechas, se devuelven los datos para el gráfico de torta. En donde para esa sucursal se cuentan las notificaciones de cada tipo de sensor en el rango de fechas.
// Se devuelven los datos en un objeto con la siguiente estructura:
// {
// {
//   tipo: 'Grave',
//   maquinas: [
//     {
//       idMaquina: 0,
//       cantNotificaciones: 0
//     },
//     {
//       idMaquina: 1,
//       cantNotificaciones: 0
//     },
//     {
//       idMaquina: 2,
//       cantNotificaciones: 0
//     }
//   ],
//   total: 0
// },
// {
//   tipo: 'Leve',
//   maquinas: [
//     {
//       idMaquina: 0,
//       cantNotificaciones: 0
//     },
//     {
//       idMaquina: 1,
//       cantNotificaciones: 0
//     },
//     {
//       idMaquina: 2,
//       cantNotificaciones: 0
//     }
//   ],
//   total: 0
// }
// }
const pieChart = async (req, res) => {
    try {
        // Valido que esten los parametros de la ruta
        if (!req.query.idSucursal) return res.status(400).json({ message: 'Falta el Id de la sucursal' })
        const idSucursal = req.query.idSucursal
        if (!req.query.fechaInicio) return res.status(400).json({ message: 'Falta la fecha de inicio' })
        const fechaInicio =  new Date(req.query.fechaInicio)
        if (!req.query.fechaFin) return res.status(400).json({ message: 'Falta la fecha de fin' })
        const fechaFin =  new Date(req.query.fechaFin)

        // Valido que la fecha de inicio sea menor a la fecha de fin
        if (fechaInicio > fechaFin) return res.status(400).json({ message: 'La fecha de inicio debe ser menor a la fecha de fin' })

        const formattedData = {
            valueGrave: [],
            labelsGrave: [],
            valueLeve: [],
            labelsLeve: [],
            totalGrave: 0,
            totalLeve: 0
        }

        // Traigo las maquinas de la sucursal
        const maquinas = await MaquinaSucursal.findAll({
            where: {
                idSucursal
            }
        })

        // Recorro cada maquina, y para cada una busco las notificaciones de cada tipo y las agrego en el objeto a devolver
        for (const maquina of maquinas) {

          const grave = await Notificacion.count({
              where: {
                  idMaquina: maquina.id,
                  idtipo: 2, // Grave
                  createdAt: {
                      [Op.between]: [fechaInicio, fechaFin]
                  }
              }
          })
          const leve = await Notificacion.count({
              where: {
                  idMaquina: maquina.id,
                  idtipo: 1, // Leve
                  createdAt: {
                      [Op.between]: [fechaInicio, fechaFin]
                  }
              }
          })

          if (grave > 0) {
              formattedData.valueGrave.push(grave)
              formattedData.labelsGrave.push(`Maquina ${maquina.id}`)
              formattedData.totalGrave += grave
          }

          if (leve > 0) {
              formattedData.valueLeve.push(leve)
              formattedData.labelsLeve.push(`Maquina ${maquina.id}`)
              formattedData.totalLeve += leve
          }
        }
        
        // Ordenar valueGrave y labelsGrave
        const sortedGrave = formattedData.valueGrave.map((value, index) => ({ value, label: formattedData.labelsGrave[index] }))
            .sort((a, b) => b.value - a.value);

        formattedData.valueGrave = sortedGrave.map(item => item.value);
        formattedData.labelsGrave = sortedGrave.map(item => item.label);

        // Ordenar valueLeve y labelsLeve
        const sortedLeve = formattedData.valueLeve.map((value, index) => ({ value, label: formattedData.labelsLeve[index] }))
            .sort((a, b) => b.value - a.value);

        formattedData.valueLeve = sortedLeve.map(item => item.value);
        formattedData.labelsLeve = sortedLeve.map(item => item.label);

        res.status(200).json([formattedData])
    } catch (error) {
        Util.catchError(res, error, '🚀 ~ file: graphics.controller.js:23 ~ pieChart ~ error:')
    }
}




// Dada 2 fechas, se traen las mediciones de consumo de las maquinas de la sucursal en cuestion.
// Se hace un promedio del consumo de cada maquina por dia, y se devuelven los datos en un objeto
const consumptionChart = async (req, res) => {
    try {
        // Valido que esten los parametros de la ruta
        if (!req.query.idSucursal) return res.status(400).json({ message: 'Falta el Id de la sucursal' });
        const idSucursal = req.query.idSucursal;
        if (!req.query.fechaInicio) return res.status(400).json({ message: 'Falta la fecha de inicio' });
        const fechaInicio = new Date(req.query.fechaInicio);
        if (!req.query.fechaFin) return res.status(400).json({ message: 'Falta la fecha de fin' });
        const fechaFin = new Date(req.query.fechaFin);

        // Valido que la fecha de inicio sea menor a la fecha de fin
        if (fechaInicio > fechaFin) return res.status(400).json({ message: 'La fecha de inicio debe ser menor a la fecha de fin' });

        // Traigo las maquinas de la sucursal
        const maquinas = await MaquinaSucursal.findAll({
            where: {
                idSucursal
            }
        });

        // Estructura de datos para la respuesta
        const formattedData = {
            valueConsumo: maquinas.map(() => []), // Crear un array vacío para cada máquina
            labelsConsumo: [],
            labelMaquina: maquinas.map(maquina => `Maquina ${maquina.id}`),
            totalConsumoSucursal: [] // Array para almacenar el consumo total de la sucursal por fecha
        };

        // Objeto para agrupar los consumos por fecha
        const consumoPorFecha = {};

        // Recorro cada maquina, y para cada una busco las mediciones de consumo en el rango de fechas
        for (const maquina of maquinas) {
            const mediciones = await Medicion.findAll({
                where: {
                    idMaquina: maquina.id,
                    createdAt: {
                        [Op.between]: [fechaInicio, fechaFin]
                    }
                },
                attributes: ['consumo', 'createdAt']
            });

            // Agrupo las mediciones por fecha
            mediciones.forEach(medicion => {
                const fecha = new Date(medicion.createdAt);
                const fechaString = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
                if (!consumoPorFecha[fechaString]) {
                    consumoPorFecha[fechaString] = maquinas.map(() => 0); // Crear un array con un valor 0 para cada máquina
                }
                consumoPorFecha[fechaString][maquina.id - 1] += medicion.consumo; // Sumar el consumo en el índice correspondiente a la máquina
            });
        }

        // Función para obtener el nombre del día en español
        const getDayName = (date) => {
            return date.toLocaleDateString('es-ES', { weekday: 'long' });
        };

        // Convertir el objeto consumoPorFecha en arrays de valores y etiquetas
        Object.keys(consumoPorFecha).forEach(fecha => {
            const [day, month, year] = fecha.split('/');
            const date = new Date(year, month - 1, day);
            const dayName = getDayName(date);
            // Dia + fecha
            formattedData.labelsConsumo.push(`${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${fecha}`);
            // Dia
            // formattedData.labelsConsumo.push(`${dayName.charAt(0).toUpperCase() + dayName.slice(1)}`);
            
            // Calcular el consumo total de la sucursal para la fecha actual
            const totalConsumo = consumoPorFecha[fecha].reduce((acc, consumo) => acc + consumo, 0);
            formattedData.totalConsumoSucursal.push(totalConsumo);

            consumoPorFecha[fecha].forEach((consumo, index) => {
                formattedData.valueConsumo[index].push(consumo); // Agregar el consumo al array de la máquina correspondiente
            });
        });

        res.status(200).json([formattedData]);

    } catch (error) {
        Util.catchError(res, error, '🚀 ~ file: graphics.controller.js:23 ~ consumptionChart ~ error:');
    }
}





module.exports = {
  getInfo,
  pieChart,
  consumptionChart
}

