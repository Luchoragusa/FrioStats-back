const { Medicion, Parametro } = require('../database/models/index')

const generarNumeroRandom = (numeroAnterior) => {
  const precision = 0.01
  const diferencia = (Math.random() * precision * 2) - precision
  return numeroAnterior + diferencia
}

// Función principal
const generarMedicion = async (idMaquinaSucursal) => {
  const ultimaMedicion = await obtenerUltimaMedicion(idMaquinaSucursal)
  console.log('Ultima medición:', ultimaMedicion)
  // Generar las mediciones simuladas
  const fechaHora = new Date()
  const sensorTempTrabajoYBulbo = generarNumeroRandom(ultimaMedicion.sensorTempTrabajoYBulbo)
  const sensorPuerta = Math.random() < 0.5
  const sensorCooler = generarNumeroRandom(ultimaMedicion.sensorCooler)
  const sensorPuntoRocio = generarNumeroRandom(ultimaMedicion.sensorPuntoRocio)
  const sensorLuz = Math.random() < 0.5
  const consumo = generarNumeroRandom(ultimaMedicion.consumo)
  const medicion = {
    idMaquina: idMaquinaSucursal,
    fechaHora,
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

// Obtener Ultima Medicion
const obtenerUltimaMedicion = async (idMaquina) => {
  try {
    const ultMedicion = await Medicion.findOne({ where: { idMaquina }, order: [['id', 'DESC']] })
    if (ultMedicion) {
      return ultMedicion
    } else {
      // Si no hay mediciones, devuelvo una medición con valores por defecto
      const parametro = await Parametro.findOne({ where: { idMaquina } })
      console.log('Parametro:', parametro)
      return {
        idMaquina,
        fechaHora: new Date(),
        sensorTempTrabajoYBulbo: ((parametro.maxTempTrabajoYBulbo + parametro.minTempTrabajoYBulbo) / 2),
        sensorPuerta: false,
        sensorCooler: ((parametro.maxRpmCooler + parametro.minRpmCooler) / 2),
        sensorPuntoRocio: ((parametro.minPuntoRocio + parametro.maxPuntoRocio) / 2),
        sensorLuz: false,
        consumo: ((parametro.maxConsumo) / 2)
      }
    }
  } catch (error) {
    console.error('Error al obtener los parámetros:', error.name)
  }
}

async function guardarMedicionesEnDB (medicion) {
  try {
    return await Medicion.create(medicion)
    // return medicion
  } catch (error) {
    console.error('Error al guardar las mediciones:', error)
  }
}

module.exports = { generarMedicion }
