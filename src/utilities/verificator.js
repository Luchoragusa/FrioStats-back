const { Notificacion, MaquinaSucursal, ImportanciaParametro, Parametro, Medicion } = require('../database/models/index.js')
const { generarMedicion } = require('./measurementGenerator.js')
const { sendErrorMessage, sendInfoMessage, sendSuccessMessage } = require('./util')

const revisionMaquinas = async () => {
  const maquinas = await MaquinaSucursal.findAll()
  for (const maquina of maquinas) {
    const medicion = await generarMedicion(maquina.id)
    sendInfoMessage(`Medicion nro [${medicion.id}] -> Maquina: ${maquina.id}`)
    await verificarLimites(medicion)
  }
  sendSuccessMessage('Revision de maquinas finalizada')
}

// Verificar si las mediciones estan por debajo o encima de los límites y generar notificaciones
const verificarLimites = async (medicion) => {
  const idMaquina = medicion.idMaquina
  const parametro = await obtenerParametros(idMaquina)
  const importanciaParametro = await obtenerImportanciaParametros(idMaquina)
  const notificaciones = await verificaciones(medicion, parametro, importanciaParametro)

  if (notificaciones.length > 0) {
    sendInfoMessage(`Notificaciones generadas para la maquina [${medicion.idMaquina}]`)
    guardarNotificacionesEnDB(notificaciones)
  }
}

/**
 *
 * @param {*} idMaquina Numero entero
 * @returns Parametro de la maquina
 */

// Obtener Parámetros
const obtenerParametros = async (idMaquina) => {
  try {
    return await Parametro.findOne({
      where: {
        idMaquina
      }
    })
  } catch (error) {
    sendErrorMessage('Error al obtener los parámetros:', error)
  }
}

/**
 *
 * @param {*} idMaquina Numero entero
 * @returns Importancia de los parámetros de la maquina
 */

// Obtener Importancia
const obtenerImportanciaParametros = async (idMaquina) => {
  try {
    return await ImportanciaParametro.findOne({
      where: {
        idMaquina
      }
    })
  } catch (error) {
    sendErrorMessage('Error al obtener la importancia de los parámetros:', error)
  }
}

/**
 *
 * @param {*} notificaciones Notificaciones a guardar en la base de datos
 */

async function guardarNotificacionesEnDB (notificaciones) {
  try {
    notificaciones.forEach(element => {
      Notificacion.create(element)
    })
  } catch (error) {
    sendErrorMessage('Error al guardar las notificaciones:', error)
  }
}

const verificaciones = async (medicion, parametro, importanciaParametro) => {
  const notificaciones = []
  // Verificar si la temperatura internar supera los límites
  if (medicion.sensorTempInterna < parametro.minTempInterna || medicion.sensorTempInterna > parametro.maxTempInterna) {
    let descripcion = 'La temperatura interna está por debajo del límite mínimo con un valor de ' + medicion.sensorTempInterna + '°C'
    if (medicion.sensorTempInterna > parametro.maxTempInterna) {
      descripcion = 'La temperatura interna está por encima del límite máximo con un valor de ' + medicion.sensorTempInterna + '°C'
    }
    const notificacion = {
      idTipo: importanciaParametro.idTipoTempInterna,
      descripcion,
      idMedicion: medicion.id,
      idMaquina: medicion.idMaquina
    }
    notificaciones.push(notificacion)
  }
  // Verificar si la temperatura de trabajo y bulbo supera los límites
  if (medicion.sensorTempTrabajoYBulbo < parametro.minTempTrabajoYBulbo || medicion.sensorTempTrabajoYBulbo > parametro.maxTempTrabajoYBulbo) {
    let descripcion = 'La temperatura de trabajo y bulbo está por debajo del límite mínimo con un valor de ' + medicion.sensorTempTrabajoYBulbo + '°C'
    if (medicion.sensorTempTrabajoYBulbo > parametro.maxTempTrabajoYBulbo) {
      descripcion = 'La temperatura de trabajo y bulbo está por encima del límite máximo con un valor de ' + medicion.sensorTempTrabajoYBulbo + '°C'
    }
    const notificacion = {
      idTipo: importanciaParametro.idTipoTempTrabajoYBulbo,
      descripcion,
      idMedicion: medicion.id,
      idMaquina: medicion.idMaquina
    }
    notificaciones.push(notificacion)
  }

  // Verificar si la puerta está abierta, y si en las 2 mediciones anteriores estaba abierta
  if (medicion.sensorPuerta) {
    // Obtener las 2 mediciones anteriores
    const mediciones = await Medicion.findAll({
      where: {
        idMaquina: medicion.idMaquina
      },
      order: [
        ['id', 'DESC']
      ],
      limit: 6
    })

    // Verificar si las 6 mediciones anteriores estaban abiertas
    if (mediciones.length === 6 && mediciones[0].sensorPuerta && mediciones[1].sensorPuerta && mediciones[2].sensorPuerta && mediciones[3].sensorPuerta && mediciones[4].sensorPuerta && mediciones[5].sensorPuerta) {
      const notificacion = {
        idTipo: importanciaParametro.idTipoEstadoPuerta,
        descripcion: 'La puerta está abierta',
        idMedicion: medicion.id,
        idMaquina: medicion.idMaquina
      }
      notificaciones.push(notificacion)
    }
  }

  // Verificar si el cooler supera los límites
  if (medicion.sensorCooler < parametro.minRpmCooler || medicion.sensorCooler > parametro.maxRpmCooler) {
    let descripcion = 'El cooler está por debajo del límite mínimo con un valor de ' + medicion.sensorCooler + ' RPM'
    if (medicion.sensorCooler > parametro.maxRpmCooler) {
      descripcion = 'El cooler está por encima del límite máximo con un valor de ' + medicion.sensorCooler + ' RPM'
    }
    const notificacion = {
      idTipo: importanciaParametro.idTipoCooler,
      descripcion,
      idMedicion: medicion.id,
      idMaquina: medicion.idMaquina
    }
    notificaciones.push(notificacion)
  }

  // Verificar si el punto de rocío supera los límites
  if (medicion.sensorPuntoRocio < parametro.minPuntoRocio || medicion.sensorPuntoRocio > parametro.maxPuntoRocio) {
    let descripcion = 'El punto de rocío está por debajo del límite mínimo con un valor de ' + medicion.sensorPuntoRocio + '°C'
    if (medicion.sensorPuntoRocio > parametro.maxPuntoRocio) {
      descripcion = 'El punto de rocío está por encima del límite máximo con un valor de ' + medicion.sensorPuntoRocio + '°C'
    }
    const notificacion = {
      idTipo: importanciaParametro.idTipoPuntoRocio,
      descripcion,
      idMedicion: medicion.id,
      idMaquina: medicion.idMaquina
    }
    notificaciones.push(notificacion)
  }

  // Verificar si el consumo supera los límites
  if (medicion.consumo > parametro.maxConsumo) {
    const notificacion = {
      idTipo: importanciaParametro.idConsumo,
      descripcion: 'El consumo está por encima del límite maximo con un valor de ' + medicion.consumo + ' kW/h',
      idMedicion: medicion.id,
      idMaquina: medicion.idMaquina
    }
    notificaciones.push(notificacion)
  }
  return notificaciones
}

module.exports = {
  revisionMaquinas
}
