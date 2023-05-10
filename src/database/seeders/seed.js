// eslint-disable-next-line no-unused-vars
const bcrypt = require('bcryptjs')

// En este caso descripcion es el nombre del tipo de parametro de Tipo, la id la asigna sola sequelize
const tipos = [
  { descripcion: 'Leve' },
  { descripcion: 'Moderado' }
]

const empresas = [
  {
    razonSocial: 'Arneg Argentina',
    cuil: '123456789',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const rols = [
  {
    id: 1,
    descripcion: 'Administrador',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    descripcion: 'Usuario',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const usuarios = [
  {
    id: 1,
    nombre: 'admin',
    apellido: 'admin',
    password: bcrypt.hashSync('admin123', 10),
    email: 'admin@gmail.com',
    telegramId: '123456789',
    recibeNoti: true,
    idRol: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    nombre: 'user',
    apellido: 'user',
    password: bcrypt.hashSync('user123', 10),
    email: 'user@gmail.com',
    telegramId: '987654321',
    recibeNoti: false,
    idRol: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const sucursales = [
  {
    id: 1,
    nombre: 'Gallega',
    direccion: 'Mitre y Pellegrini',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    nombre: 'Coto',
    direccion: 'Roca y 3 de Febrero',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const usuariosSucursales = [
  {
    idUsuario: 1,
    idSucursal: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    idUsuario: 2,
    idSucursal: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const modelos = [
  {
    id: 1,
    descripcion: 'Osaka',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    descripcion: 'Panama',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    descripcion: 'Urano',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    descripcion: 'Venezia',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const maquinaSucursales = [
  {
    id: 1,
    idSucursal: 1,
    idModelo: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    idSucursal: 1,
    idModelo: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    idSucursal: 1,
    idModelo: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    idSucursal: 1,
    idModelo: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    idSucursal: 2,
    idModelo: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    idSucursal: 2,
    idModelo: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 7,
    idSucursal: 2,
    idModelo: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 8,
    idSucursal: 2,
    idModelo: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const parametros = [
  {
    id: 1,
    maxTempTrabajoYBulbo: 10,
    minTempTrabajoYBulbo: 5,
    estadoPuerta: 1,
    maxRpmCooler: 700,
    minRpmCooler: 300,
    maxPuntoRocio: 10,
    minPuntoRocio: 5,
    maxConsumo: 10,
    idMaquinaSucursal: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    maxTempTrabajoYBulbo: 20,
    minTempTrabajoYBulbo: 10,
    estadoPuerta: 1,
    maxRpmCooler: 700,
    minRpmCooler: 300,
    maxPuntoRocio: 20,
    minPuntoRocio: 10,
    maxConsumo: 20,
    idMaquinaSucursal: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    maxTempTrabajoYBulbo: 10,
    minTempTrabajoYBulbo: 5,
    estadoPuerta: 1,
    maxRpmCooler: 700,
    minRpmCooler: 300,
    maxPuntoRocio: 10,
    minPuntoRocio: 5,
    maxConsumo: 10,
    idMaquinaSucursal: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    maxTempTrabajoYBulbo: 100,
    minTempTrabajoYBulbo: 50,
    estadoPuerta: 1,
    maxRpmCooler: 700,
    minRpmCooler: 300,
    maxPuntoRocio: 100,
    minPuntoRocio: 50,
    maxConsumo: 200,
    idMaquinaSucursal: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

const mediciones = [
  {
    id: 1,
    idMaquinaSucursal: 1,
    fechaHora: new Date(),
    sensorTempTrabajoYBulbo: 8,
    sensorPuerta: 1,
    sensorCooler: 500,
    sensorPuntoRocio: 8,
    sensorLuz: 1,
    consumo: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    idMaquinaSucursal: 2,
    fechaHora: new Date(),
    sensorTempTrabajoYBulbo: 30,
    sensorPuerta: 1,
    sensorCooler: 600,
    sensorPuntoRocio: 20,
    sensorLuz: 1,
    consumo: 20,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    idMaquinaSucursal: 3,
    fechaHora: new Date(),
    sensorTempTrabajoYBulbo: 30,
    sensorPuerta: 1,
    sensorCooler: 200,
    sensorPuntoRocio: 100,
    sensorLuz: 1,
    consumo: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    idMaquinaSucursal: 4,
    fechaHora: new Date(),
    sensorTempTrabajoYBulbo: 100,
    sensorPuerta: 1,
    sensorCooler: 500,
    sensorPuntoRocio: 100,
    sensorLuz: 1,
    consumo: 200,
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

const importanciaParametros = [
  {
    id: 1,
    idMaquinaSucursal: 1,
    idTipoTempTrabajoYBulbo: 1,
    idTipoEstadoPuerta: 1,
    idTipoCooler: 1,
    idTipoPuntoRocio: 1,
    idConsumo: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    idMaquinaSucursal: 2,
    idTipoTempTrabajoYBulbo: 1,
    idTipoEstadoPuerta: 1,
    idTipoCooler: 1,
    idTipoPuntoRocio: 1,
    idConsumo: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    idMaquinaSucursal: 3,
    idTipoTempTrabajoYBulbo: 1,
    idTipoEstadoPuerta: 1,
    idTipoCooler: 1,
    idTipoPuntoRocio: 1,
    idConsumo: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    idMaquinaSucursal: 4,
    idTipoTempTrabajoYBulbo: 1,
    idTipoEstadoPuerta: 1,
    idTipoCooler: 1,
    idTipoPuntoRocio: 1,
    idConsumo: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const notificaciones = [
  {
    id: 1,
    idTipo: 1,
    idMedicion: 1,
    visto: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    idTipo: 1,
    idMedicion: 2,
    visto: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    idTipo: 1,
    idMedicion: 3,
    visto: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    idTipo: 1,
    idMedicion: 4,
    visto: ture,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  tipos,
  empresas,
  rols,
  usuarios,
  sucursales,
  usuariosSucursales,
  modelos,
  maquinaSucursales,
  parametros,
  mediciones,
  importanciaParametros,
  notificaciones
}
