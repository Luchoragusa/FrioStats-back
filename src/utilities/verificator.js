import { Notificacion } from '../models/index.js'
// Verificar si las mediciones estan por debajo o encima de los límites y generar notificaciones
const verificarLimites = (medicion, parametro, importanciaParametro) => {
  const notificaciones = []
  const diferenciaTempTrabajoYBulbo = Math.abs(medicion.sensorTempTrabajoYBulbo - parametro.tempTrabajoMax)
  const diferenciaCooler = Math.abs(medicion.sensorCooler - parametro.rpmCoolerMax)
  const diferenciaPuntoRocio = Math.abs(medicion.sensorPuntoRocio - parametro.puntoRocioMax)
  const diferenciaConsumo = Math.abs(medicion.consumo - parametro.consumoMax)

  // Verificar si la temperatura de trabajo y bulbo supera los límites, si la diferencia es menor a 5, y si la importancia es leve o critica
  if (medicion.sensorTempTrabajoYBulbo < parametro.tempTrabajoMin && diferenciaTempTrabajoYBulbo < 5 && importanciaParametro.tempTrabajoYBulbo === 0) { // debajo leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'La temperatura de trabajo y bulbo está por debajo del límite mínimo al valor de ' + medicion.sensorTempTrabajoYBulbo + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (medicion.sensorTempTrabajoYBulbo < parametro.tempTrabajoMin && diferenciaTempTrabajoYBulbo >= 5 && importanciaParametro.tempTrabajoYBulbo === 0) { // debajo critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'La temperatura de trabajo y bulbo está por debajo del límite mínimo al valor de ' + medicion.sensorTempTrabajoYBulbo + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (medicion.sensorTempTrabajoYBulbo > parametro.tempTrabajoMax && diferenciaTempTrabajoYBulbo < 5 && importanciaParametro.tempTrabajoYBulbo === 0) { // superior leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'La temperatura de trabajo y bulbo está por encima del límite mínimo al valor de ' + medicion.sensorTempTrabajoYBulbo + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (medicion.sensorTempTrabajoYBulbo > parametro.tempTrabajoMax && diferenciaTempTrabajoYBulbo >= 5 && importanciaParametro.tempTrabajoYBulbo === 0) { // superior critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'La temperatura de trabajo y bulbo está por encima del límite mínimo al valor de ' + medicion.sensorTempTrabajoYBulbo + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  }

  // Verificar si la puerta está abierta y si la importancia es leve o critica
  if (medicion.sensorPuerta && importanciaParametro.puerta === 0) { // abierta leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'La puerta está abierta'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (medicion.sensorPuerta && importanciaParametro.puerta === 1) { // abierta critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'La puerta está abierta'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  }

  // Verificar si el cooler supera los límites y si la diferencia es menor a 500 RPM (leve) o mayor a 500 RPM (critico) y si la importancia es leve o critica
  if (medicion.sensorCooler < parametro.rpmCoolerMin && diferenciaCooler < 500 && importanciaParametro.cooler === 0) { // debajo leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El cooler está por debajo del límite mínimo al valor de ' + medicion.sensorCooler + ' RPM'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (medicion.sensorCooler < parametro.rpmCoolerMin && diferenciaCooler >= 500 && importanciaParametro.cooler === 0) { // debajo critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El cooler está por debajo del límite mínimo al valor de ' + medicion.sensorCooler + ' RPM'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (medicion.sensorCooler > parametro.rpmCoolerMax && diferenciaCooler < 500 && importanciaParametro.cooler === 0) { // superior leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El cooler está por encima del límite mínimo al valor de ' + medicion.sensorCooler + ' RPM'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (medicion.sensorCooler > parametro.rpmCoolerMax && diferenciaCooler >= 500 && importanciaParametro.cooler === 0) { // superior critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El cooler está por encima del límite mínimo al valor de ' + medicion.sensorCooler + ' RPM'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  }

  // Verificar si el punto de rocío supera los límites y si la diferencia es menor a 5 (leve) o mayor a 5 (critico) y si la importancia es leve o critica
  if (medicion.sensorPuntoRocio < parametro.puntoRocioMin && diferenciaPuntoRocio < 5 && importanciaParametro.puntoRocio === 0) { // debajo leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El punto de rocío está por debajo del límite mínimo al valor de ' + medicion.sensorPuntoRocio + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (medicion.sensorPuntoRocio < parametro.puntoRocioMin && diferenciaPuntoRocio >= 5 && importanciaParametro.puntoRocio === 0) { // debajo critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El punto de rocío está por debajo del límite mínimo al valor de ' + medicion.sensorPuntoRocio + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (medicion.sensorPuntoRocio > parametro.puntoRocioMax && diferenciaPuntoRocio < 5 && importanciaParametro.puntoRocio === 0) { // superior leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El punto de rocío está por encima del límite mínimo al valor de ' + medicion.sensorPuntoRocio + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (medicion.sensorPuntoRocio > parametro.puntoRocioMax && diferenciaPuntoRocio >= 5 && importanciaParametro.puntoRocio === 0) { // superior critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El punto de rocío está por encima del límite mínimo al valor de ' + medicion.sensorPuntoRocio + '°C'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  }

  // Verificar si el consumo supera los límites y si la diferencia es menor a 5 (leve) o mayor a 5 (critico) y si la importancia es leve o critica
  if (medicion.consumo < parametro.consumoMin && diferenciaConsumo < 5 && importanciaParametro.consumo === 0) { // debajo leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El consumo está por debajo del límite mínimo al valor de ' + medicion.consumo + ' kW/h'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (medicion.consumo < parametro.consumoMin && diferenciaConsumo >= 5 && importanciaParametro.consumo === 0) { // debajo critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El consumo está por debajo del límite mínimo al valor de ' + medicion.consumo + ' kW/h'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (medicion.consumo > parametro.consumoMax && diferenciaConsumo < 5 && importanciaParametro.consumo === 0) { // superior leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El consumo está por encima del límite mínimo al valor de ' + medicion.consumo + ' kW/h'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  } else if (medicion.consumo > parametro.consumoMax && diferenciaConsumo >= 5 && importanciaParametro.consumo === 0) { // superior critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El consumo está por encima del límite mínimo al valor de ' + medicion.consumo + ' kW/h'
      // idNotificacion e idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion)
  }
  guardarNotificacionesEnDB(notificaciones)
}

async function guardarNotificacionesEnDB (notificaciones) {
  try {
    notificaciones.forEach(element => {
      Notificacion.create(element)
    })
  } catch (error) {
    console.error('Error al guardar las notificaciones:', error)
  }
}

module.exports = { verificarLimites }
