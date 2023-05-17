import { random } from 'faker';
import moment from 'moment';
import mysql from 'mysql';

const generarTemperatura = () => {
  return random.number({ min: -30, max: 10, precision: 0.1 });  // precision: para indicar la cantidad de decimales que se generan
}

const generarEstadoPuerta = () => {
  return random.boolean();
}

const generarRpmCooler = () => {
  return random.number({ min: 1000, max: 5000 });
}

const generarPuntoRocio = () => {
  return random.number({ min: -40, max: 0, precision: 0.1 });
}

const generarConsumo = () => {
  return random.number({ min: 0, max: 100, precision: 0.01 });
}

// Función principal
const obtenerMediciones = (idMaquina, idSucursal, idModelo) => {

  // Obtener los parámetros de la máquina y su importancia
  const parametros = obtenerParametros(idMaquina);
  const importanciaParametros = obtenerImportanciaParametros(idMaquina);

  // Generar las mediciones simuladas
  const mediciones = [];
  const fechaHoraMed = moment().format('YYYY-MM-DD HH:mm:ss');
  const sensorTempTrabajoYBulbo = generarTemperatura();
  const sensorPuerta = generarEstadoPuerta();
  const sensorCooler = generarRpmCooler();
  const sensorPuntoRocio = generarPuntoRocio();
  const sensorLuz = random.boolean();
  const consumo = generarConsumo();

  // Verificar si las mediciones superan los límites. Generar notificaciones si es necesario
  const notificaciones = verificarLimites(parametros, importanciaParametros, sensorTempTrabajoYBulbo, sensorPuerta, sensorCooler, sensorPuntoRocio, consumo);

  // Guardar las mediciones en la base de datos
  guardarMedicionesEnDB(idMaquina, fechaHoraMed, sensorTempTrabajoYBulbo, sensorPuerta, sensorCooler, sensorPuntoRocio, sensorLuz, consumo, notificaciones);

  // Devolver las mediciones
  return {
    fechaHoraMed,
    sensorTempTrabajoYBulbo,
    sensorPuerta,
    sensorCooler,
    sensorPuntoRocio,
    sensorLuz,
    consumo,
    notificaciones
  };
}

// Parámetros de una máquina específica 
function obtenerParametros(idMaquina) {
  const query = `SELECT * FROM Parametros WHERE idMaquina = ${idMaquina}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        connection.end();

        if (results.length > 0) {
          const parametros = results[0]; 
          resolve(parametros);
        } else {
          reject(new Error('No se encontraron parámetros para la máquina especificada.'));
        }
      }
    });
  });
}

// Obtener Importancia
function obtenerImportanciaParametros(idMaquina) {
  const query = `SELECT * FROM ImportanciaParametros WHERE idMaquina = ${idMaquina}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        connection.end();

        if (results.length > 0) {
          const importanciaParametros = results[0];
          resolve(importanciaParametros);
        } else {
          reject(new Error('No se encontraron parámetros para la máquina especificada.'));
        }
      }
    });
  }
  );
}

// Verificar si las mediciones estan por debajo o encima de los límites y generar notificaciones
function verificarLimites(parametros, importanciaParametros, sensorTempTrabajoYBulbo, sensorPuerta, sensorCooler, sensorPuntoRocio, consumo) {
  const notificaciones = [];
  const diferenciaTempTrabajoYBulbo = Math.abs(sensorTempTrabajoYBulbo - parametros.tempTrabajoMax);
  const diferenciaCooler = Math.abs(sensorCooler - parametros.rpmCoolerMax);
  const diferenciaPuntoRocio = Math.abs(sensorPuntoRocio - parametros.puntoRocioMax);
  const diferenciaConsumo = Math.abs(consumo - parametros.consumoMax);

  // Verificar si la temperatura de trabajo y bulbo supera los límites
  if (sensorTempTrabajoYBulbo < parametros.tempTrabajoMin && diferenciaTempTrabajoYBulbo < 5) { // debajo leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'La temperatura de trabajo y bulbo está por debajo del límite mínimo al valor de ' + sensorTempTrabajoYBulbo + '°C',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion);
  }
  else if (sensorTempTrabajoYBulbo < parametros.tempTrabajoMin && diferenciaTempTrabajoYBulbo >= 5) { // debajo critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'La temperatura de trabajo y bulbo está por debajo del límite mínimo al valor de ' + sensorTempTrabajoYBulbo + '°C',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion);
  }
  else if (sensorTempTrabajoYBulbo > parametros.tempTrabajoMax && diferenciaTempTrabajoYBulbo < 5) { // superior leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'La temperatura de trabajo y bulbo está por encima del límite mínimo al valor de ' + sensorTempTrabajoYBulbo + '°C',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion);
  }
  else if (sensorTempTrabajoYBulbo > parametros.tempTrabajoMax && diferenciaTempTrabajoYBulbo >= 5) { // superior critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'La temperatura de trabajo y bulbo está por encima del límite mínimo al valor de ' + sensorTempTrabajoYBulbo + '°C',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion);
  }

  // Verificar si la puerta está abierta
  if (sensorPuerta) {
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'La puerta está abierta',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion);
  }

  // Verificar si el cooler supera los límites
  if (sensorCooler < parametros.rpmCoolerMin && diferenciaCooler < 500) { // debajo leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El cooler está por debajo del límite mínimo al valor de ' + sensorCooler + ' RPM',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion);
  }
  else if (sensorCooler < parametros.rpmCoolerMin && diferenciaCooler >= 500) { // debajo critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El cooler está por debajo del límite mínimo al valor de ' + sensorCooler + ' RPM',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion);
  }
  else if (sensorCooler > parametros.rpmCoolerMax && diferenciaCooler < 500) { // superior leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El cooler está por encima del límite mínimo al valor de ' + sensorCooler + ' RPM',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion);
  }
  else if (sensorCooler > parametros.rpmCoolerMax && diferenciaCooler >= 500) { // superior critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El cooler está por encima del límite mínimo al valor de ' + sensorCooler + ' RPM',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
      //!        ver el tema del visto
    }
    notificaciones.push(notificacion);
  }

  // Verificar si el punto de rocío supera los límites
  if (sensorPuntoRocio < parametros.puntoRocioMin && diferenciaPuntoRocio < 5) { // debajo leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El punto de rocío está por debajo del límite mínimo al valor de ' + sensorPuntoRocio + '°C',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
    }
    notificaciones.push(notificacion);
  }
  else if (sensorPuntoRocio < parametros.puntoRocioMin && diferenciaPuntoRocio >= 5) { // debajo critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El punto de rocío está por debajo del límite mínimo al valor de ' + sensorPuntoRocio + '°C',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
    }
    notificaciones.push(notificacion);
  }
  else if (sensorPuntoRocio > parametros.puntoRocioMax && diferenciaPuntoRocio < 5) { // superior leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El punto de rocío está por encima del límite mínimo al valor de ' + sensorPuntoRocio + '°C',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
    }
    notificaciones.push(notificacion);
  }
  else if (sensorPuntoRocio > parametros.puntoRocioMax && diferenciaPuntoRocio >= 5) { // superior critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El punto de rocío está por encima del límite mínimo al valor de ' + sensorPuntoRocio + '°C',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
    }
    notificaciones.push(notificacion);
  }

  // Verificar si el consumo supera los límites
  if (consumo < parametros.consumoMin && diferenciaConsumo < 5) { // debajo leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El consumo está por debajo del límite mínimo al valor de ' + consumo + ' kW/h',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
    }
    notificaciones.push(notificacion);
  }
  else if (consumo < parametros.consumoMin && diferenciaConsumo >= 5) { // debajo critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El consumo está por debajo del límite mínimo al valor de ' + consumo + ' kW/h',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
    }
    notificaciones.push(notificacion);
  }
  else if (consumo > parametros.consumoMax && diferenciaConsumo < 5) { // superior leve
    const notificacion = {
      idTipo: 0,
      descripcionNoti: 'El consumo está por encima del límite mínimo al valor de ' + consumo + ' kW/h',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
    }
    notificaciones.push(notificacion);
  }
  else if (consumo > parametros.consumoMax && diferenciaConsumo >= 5) { // superior critico
    const notificacion = {
      idTipo: 1,
      descripcionNoti: 'El consumo está por encima del límite mínimo al valor de ' + consumo + ' kW/h',
      //TODO-->  idNotificacion se genera automáticamente en BD
      //TODO-->  idMedicion se genera automáticamente en BD
    }
    notificaciones.push(notificacion);
  }

  return notificaciones;
}

function guardarMedicionesEnDB(idMaquina, fechaHoraMed, sensorTempTrabajoYBulbo, sensorPuerta, sensorCooler, sensorPuntoRocio, sensorLuz, consumo, notificaciones) {
  const medicion = {
    idMaquina,
    fechaHoraMed,
    sensorTempTrabajoYBulbo,
    sensorPuerta,
    sensorCooler,
    sensorPuntoRocio,
    sensorLuz,
    consumo
  };
  
  const queryInsertMedicion = 'INSERT INTO Medicion SET ?';
  connection.query(queryInsertMedicion, medicion, (error, results) => {
    if (error) {
      console.error('Error al insertar mediciones:', error);
    } else {
      console.log('Mediciones insertadas correctamente.');
      const idMedicion = results.insertId;
      const queryInsertNotificaciones = 'INSERT INTO Notificaciones (idTipo, visto, idMedicion) VALUES (?, ?, ?)';
      const valoresNotificaciones = notificaciones.map(notificacion => {
        return [notificacion.idTipo, false, idMedicion];
      });

      connection.query(queryInsertNotificaciones, [valoresNotificaciones], (error, results) => {
        if (error) {
          console.error('Error al insertar notificaciones:', error);
        } else {
          console.log('Notificaciones insertadas correctamente.');
        }
      });
    }
  });
}

// Ejemplo de uso: obtener las mediciones de la máquina 1 en la sucursal 2, modelo 1
const mediciones = obtenerMediciones(1, 2, 1);
console.log(mediciones);