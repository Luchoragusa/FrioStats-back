import { random } from 'faker'
import { Parametro, ImportanciaParametros, Medicion, Notificacion } from '../database/models/index'

const generarNumeroRandom = (numeroAnterior) => {
  const precision = 0.01
  const diferencia = (Math.random() * precision * 2) - precision
  return numeroAnterior + diferencia
}

// Función principal
const obtenerMediciones = (idMaquina) => {
  // Obtener los parámetros de la máquina y su importancia
  const parametro = obtenerParametros(idMaquina)
  const importanciaParametro = obtenerImportanciaParametros(idMaquina)

  const ultimaMedicion = obtenerUltimaMedicion(idMaquina)

  // Generar las mediciones simuladas
  const mediciones = []
  const fechaHora = new Date()
  const sensorTempTrabajoYBulbo = generarNumeroRandom(ultimaMedicion.sensorTempTrabajoYBulbo)
  const sensorPuerta = random.boolean()
  const sensorCooler = generarNumeroRandom(ultimaMedicion.sensorCooler)
  const sensorPuntoRocio = generarNumeroRandom(ultimaMedicion.sensorPuntoRocio)
  const sensorLuz = random.boolean()
  const consumo = generarNumeroRandom(ultimaMedicion.consumo)
  const medicion = {
    idMaquina,
    fechaHora,
    sensorTempTrabajoYBulbo,
    sensorPuerta,
    sensorCooler,
    sensorPuntoRocio,
    sensorLuz,
    consumo
  }

  // Verificar si las mediciones superan los límites. Generar notificaciones si es necesario
  const notificaciones = verificarLimites(medicion)

  // Guardar las mediciones en la base de datos
  guardarMedicionesEnDB(medicion, notificaciones)

  // Devolver las mediciones
  return {
    mediciones
  }
}

// Obtener Parámetros
const obtenerParametros = async (idMaquina) => {
  try {
    const parametro = await Parametro.findOne({
      where: {
        idMaquina
      }
    })
    return parametro
  } catch (error) {
    console.error('Error al obtener los parámetros:', error)
    throw error
  }
}

// Obtener Ultima Medicion
const obtenerUltimaMedicion = async (idMaquina) => {
  try {
    return await Medicion.findOne({
      where: {
        idMaquina
      },
      order: [
        ['idMedicion', 'DESC']
      ]
    })
  } catch (error) {
    console.error('Error al obtener los parámetros:', error)
    throw error
  }
}

// Obtener Importancia
const obtenerImportanciaParametros = async (idMaquina) => {
  try {
    const importanciaParametros = await ImportanciaParametros.findOne({
      where: {
        idMaquina
      }
    })
    return importanciaParametros
  } catch (error) {
    console.error('Error al obtener la importancia de los parámetros:', error)
    throw error
  }
}

async function guardarMedicionesEnDB (medicion) {
  try {
    const [medicionGuardada] = await Promise.all([
      Medicion.create(medicion)
    ])
    console.log('Medición guardada en la base de datos:', medicionGuardada)
  } catch (error) {
    console.error('Error al guardar las mediciones:', error)
  }
}

export { obtenerMediciones }
