const { Medicion, Parametro } = require('../database/models/index')
const { sendErrorMessage } = require('./util')

const factores = {
  sensorTempInterna: 1,
  sensorTempTrabajoYBulbo: 5,
  sensorCooler: 1500,
  sensorPuntoRocio: 5,
  consumo: 1000
}

/**
 *
 * @param {*} numeroAnterior Numero entero
 * @returns Numero random entre numeroAnterior - 0.01 y numeroAnterior + 0.01
 */

const generarNumeroRandom = (numeroAnterior, nombreSensor) => {
  const precision = factores[nombreSensor]
  const diferencia = (Math.random() * precision * 2) - precision
  return numeroAnterior + diferencia
}

/**
 *
 * @param {*} idMaquinaSucursal Numero entero
 * @returns Objeto medicion guardado en la base de datos
 */

// Función principal
const generarMedicion = async (idMaquinaSucursal) => {
  const ultimaMedicion = await obtenerUltimaMedicion(idMaquinaSucursal)

  // Generar las mediciones simuladas
  const sensorTempInterna = generarNumeroRandom(ultimaMedicion.sensorTempInterna, 'sensorTempInterna')
  const sensorTempTrabajoYBulbo = generarNumeroRandom(ultimaMedicion.sensorTempTrabajoYBulbo, 'sensorTempTrabajoYBulbo')
  const sensorPuerta = Math.random() < 0.5
  const sensorCooler = Math.abs(Math.round(generarNumeroRandom(ultimaMedicion.sensorCooler, 'sensorCooler'))) // Integer
  const sensorPuntoRocio = Math.abs(generarNumeroRandom(ultimaMedicion.sensorPuntoRocio, 'sensorPuntoRocio'))
  const sensorLuz = Math.random() < 0.5
  const consumo = Math.abs(Math.round(generarNumeroRandom(ultimaMedicion.consumo, 'consumo'))) // Integer

  const medicion = {
    idMaquina: idMaquinaSucursal,
    sensorTempInterna,
    sensorTempTrabajoYBulbo,
    sensorPuerta,
    sensorCooler,
    sensorPuntoRocio,
    sensorLuz,
    consumo
  }

  // Guardar las mediciones en la base de datos
  return await guardarMedicionesEnDB(medicion)
}

/**
 *
 * @param {*} idMaquina Numero entero
 * @returns Objeto medicion
 */

// Obtener Ultima Medicion
const obtenerUltimaMedicion = async (idMaquina) => {
  try {
    const ultMedicion = await Medicion.findOne({ where: { idMaquina }, order: [['id', 'DESC']] })
    if (ultMedicion) {
      return ultMedicion
    } else {
      // Si no hay mediciones, devuelvo una medición con valores por defecto
      const parametro = await Parametro.findOne({ where: { idMaquina } })
      return {
        idMaquina,
        sensorTempInterna: ((parametro.maxTempInterna + parametro.minTempInterna) / 2),
        sensorTempTrabajoYBulbo: ((parametro.maxTempTrabajoYBulbo + parametro.minTempTrabajoYBulbo) / 2),
        sensorPuerta: false,
        sensorCooler: ((parametro.maxRpmCooler + parametro.minRpmCooler) / 2),
        sensorPuntoRocio: ((parametro.minPuntoRocio + parametro.maxPuntoRocio) / 2),
        sensorLuz: false,
        consumo: ((parametro.maxConsumo) / 2)
      }
    }
  } catch (error) {
    sendErrorMessage('Error al obtener los parámetros:', error)
  }
}

/**
 *
 * @param {*} medicion Objeto medicion
 * @returns Objeto medicion guardado en la base de datos
 */

async function guardarMedicionesEnDB (medicion) {
  try {
    return await Medicion.create(medicion)
  } catch (error) {
    console.error('Error al guardar las mediciones:', error)
  }
}

module.exports = { generarMedicion }
