import { random } from 'faker'
import moment from 'moment'
import { Parametro } from '../database/models/Parametro'
import { ImportanciaParametros } from '../database/models/ImportanciaParametros'
import { Medicion } from '../database/models/Medicion'
import { Notificacion } from '../database/models/Notificacion'
import generarNumerosCoherentes from './generadorNumero'

const generarNumeroRandom = (min, max, precision) => {
  return generarNumerosCoherentes(min, max, precision)
}

const generarEstadoPuerta = () => {
  return random.boolean()
}

// Función principal
const obtenerMediciones = (idMaquina) => {
  // Obtener los parámetros de la máquina y su importancia
  const parametro = obtenerParametros(idMaquina)
  const importanciaParametro = obtenerImportanciaParametros(idMaquina)

  // Generar las mediciones simuladas
  const mediciones = []
  const fechaHoraMed = moment().format('YYYY-MM-DD HH:mm:ss')
  const sensorTempTrabajoYBulbo = generarNumeroRandom(-30, 10, 0.1)
  const sensorPuerta = generarEstadoPuerta()
  const sensorCooler = generarNumeroRandom(1000, 5000)
  const sensorPuntoRocio = generarNumeroRandom(-40, 0, 0.1)
  const sensorLuz = random.boolean()
  const consumo = generarNumeroRandom(0, 100, 0.01)

  mediciones.push({
    fechaHoraMed,
    sensorTempTrabajoYBulbo,
    sensorPuerta,
    sensorCooler,
    sensorPuntoRocio,
    sensorLuz,
    consumo
  })

  // Verificar si las mediciones superan los límites. Generar notificaciones si es necesario
  const notificaciones = verificarLimites(parametro,
    importanciaParametro, sensorTempTrabajoYBulbo, sensorPuerta,
    sensorCooler, sensorPuntoRocio, consumo
  )

  // Guardar las mediciones en la base de datos
  guardarMedicionesEnDB(idMaquina,
    fechaHoraMed,
    sensorTempTrabajoYBulbo,
    sensorPuerta,
    sensorCooler,
    sensorPuntoRocio,
    sensorLuz,
    consumo,
    notificaciones
  )

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

// Verificar si las mediciones estan por debajo o encima de los límites y generar notificaciones
function verificarLimites (parametro, importanciaParametro, sensorTempTrabajoYBulbo, sensorPuerta, sensorCooler, sensorPuntoRocio, consumo) {
  const notificaciones = []
  const diferenciaTempTrabajoYBulbo = Math.abs(sensorTempTrabajoYBulbo - parametro.tempTrabajoMax)
  const diferenciaCooler = Math.abs(sensorCooler - parametro.rpmCoolerMax)
  const diferenciaPuntoRocio = Math.abs(sensorPuntoRocio - parametro.puntoRocioMax)
  const diferenciaConsumo = Math.abs(consumo - parametro.consumoMax)

  // Verificar si la temperatura de trabajo y bulbo supera los límites, si la diferencia es menor a 5, y si la importancia es leve o critica
  if (sensorTempTrabajoYBulbo < parametro.tempTrabajoMin && diferenciaTempTrabajoYBulbo < 5 && importanciaParametro.tempTrabajoYBulbo === 0) { // debajo leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'La temperatura de trabajo y bulbo está por debajo del límite mínimo al valor de ' + sensorTempTrabajoYBulbo + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (sensorTempTrabajoYBulbo < parametro.tempTrabajoMin && diferenciaTempTrabajoYBulbo >= 5 && importanciaParametro.tempTrabajoYBulbo === 0) { // debajo critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'La temperatura de trabajo y bulbo está por debajo del límite mínimo al valor de ' + sensorTempTrabajoYBulbo + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (sensorTempTrabajoYBulbo > parametro.tempTrabajoMax && diferenciaTempTrabajoYBulbo < 5 && importanciaParametro.tempTrabajoYBulbo === 0) { // superior leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'La temperatura de trabajo y bulbo está por encima del límite mínimo al valor de ' + sensorTempTrabajoYBulbo + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (sensorTempTrabajoYBulbo > parametro.tempTrabajoMax && diferenciaTempTrabajoYBulbo >= 5 && importanciaParametro.tempTrabajoYBulbo === 0) { // superior critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'La temperatura de trabajo y bulbo está por encima del límite mínimo al valor de ' + sensorTempTrabajoYBulbo + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  }

  // Verificar si la puerta está abierta y si la importancia es leve o critica
  if (sensorPuerta && importanciaParametro.puerta === 0) { // abierta leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'La puerta está abierta'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (sensorPuerta && importanciaParametro.puerta === 1) { // abierta critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'La puerta está abierta'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  }

  // Verificar si el cooler supera los límites y si la diferencia es menor a 500 RPM (leve) o mayor a 500 RPM (critico) y si la importancia es leve o critica
  if (sensorCooler < parametro.rpmCoolerMin && diferenciaCooler < 500 && importanciaParametro.cooler === 0) { // debajo leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El cooler está por debajo del límite mínimo al valor de ' + sensorCooler + ' RPM'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (sensorCooler < parametro.rpmCoolerMin && diferenciaCooler >= 500 && importanciaParametro.cooler === 0) { // debajo critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El cooler está por debajo del límite mínimo al valor de ' + sensorCooler + ' RPM'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (sensorCooler > parametro.rpmCoolerMax && diferenciaCooler < 500 && importanciaParametro.cooler === 0) { // superior leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El cooler está por encima del límite mínimo al valor de ' + sensorCooler + ' RPM'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (sensorCooler > parametro.rpmCoolerMax && diferenciaCooler >= 500 && importanciaParametro.cooler === 0) { // superior critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El cooler está por encima del límite mínimo al valor de ' + sensorCooler + ' RPM'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  }

  // Verificar si el punto de rocío supera los límites y si la diferencia es menor a 5 (leve) o mayor a 5 (critico) y si la importancia es leve o critica
  if (sensorPuntoRocio < parametro.puntoRocioMin && diferenciaPuntoRocio < 5 && importanciaParametro.puntoRocio === 0) { // debajo leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El punto de rocío está por debajo del límite mínimo al valor de ' + sensorPuntoRocio + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (sensorPuntoRocio < parametro.puntoRocioMin && diferenciaPuntoRocio >= 5 && importanciaParametro.puntoRocio === 0) { // debajo critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El punto de rocío está por debajo del límite mínimo al valor de ' + sensorPuntoRocio + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (sensorPuntoRocio > parametro.puntoRocioMax && diferenciaPuntoRocio < 5 && importanciaParametro.puntoRocio === 0) { // superior leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El punto de rocío está por encima del límite mínimo al valor de ' + sensorPuntoRocio + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (sensorPuntoRocio > parametro.puntoRocioMax && diferenciaPuntoRocio >= 5 && importanciaParametro.puntoRocio === 0) { // superior critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El punto de rocío está por encima del límite mínimo al valor de ' + sensorPuntoRocio + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  }

  // Verificar si el consumo supera los límites y si la diferencia es menor a 5 (leve) o mayor a 5 (critico) y si la importancia es leve o critica
  if (consumo < parametro.consumoMin && diferenciaConsumo < 5 && importanciaParametro.consumo === 0) { // debajo leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El consumo está por debajo del límite mínimo al valor de ' + consumo + ' kW/h'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (consumo < parametro.consumoMin && diferenciaConsumo >= 5 && importanciaParametro.consumo === 0) { // debajo critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El consumo está por debajo del límite mínimo al valor de ' + consumo + ' kW/h'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (consumo > parametro.consumoMax && diferenciaConsumo < 5 && importanciaParametro.consumo === 0) { // superior leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El consumo está por encima del límite mínimo al valor de ' + consumo + ' kW/h'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (consumo > parametro.consumoMax && diferenciaConsumo >= 5 && importanciaParametro.consumo === 0) { // superior critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El consumo está por encima del límite mínimo al valor de ' + consumo + ' kW/h'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  }

  return notificaciones
}

async function guardarMedicionesEnDB (idMaquina,
  fechaHoraMed, sensorTempTrabajoYBulbo, sensorPuerta,
  sensorCooler, sensorPuntoRocio, sensorLuz, consumo,
  notificaciones
) {
  const medicion = {
    idMaquina,
    fechaHoraMed,
    sensorTempTrabajoYBulbo,
    sensorPuerta,
    sensorCooler,
    sensorPuntoRocio,
    sensorLuz,
    consumo
  }

  try {
    const [medicionGuardada, notificacionesGuardadas] = await Promise.all([
      Medicion.create(medicion),
      Promise.all(notificaciones.map(notificacion => Notificacion.create(notificacion)))
    ])

    console.log('Medición guardada en la base de datos:', medicionGuardada)
    console.log('Notificaciones guardadas en la base de datos:', notificacionesGuardadas)
  } catch (error) {
    console.error('Error al guardar las mediciones:', error)
  }
}

export { obtenerMediciones }
