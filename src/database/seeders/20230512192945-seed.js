'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Seed de la tabla Rol
    await queryInterface.bulkInsert('Rol', [{
      descripcion: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      descripcion: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    // Seed de la tabla Usuario
    await queryInterface.bulkInsert('Usuario', [{
      nombre: 'admin',
      apellido: 'admin',
      password: 'admin123',
      email: 'admin@gmail.com',
      telegramId: '123456789',
      recibeNoti: true,
      idRol: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nombre: 'user',
      apellido: 'user',
      password: 'user123',
      email: 'user@gmail.com',
      telegramId: '987654321',
      recibeNoti: false,
      idRol: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    // Seed de la tabla Empresa
    await queryInterface.bulkInsert('Empresa', [{
      razonSocial: 'La Gallega',
      cuil: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    // Seed de la tabla Sucursal
    await queryInterface.bulkInsert('Sucursal', [{
      nombre: 'La Gallega',
      direccion: 'Av. San Martin 123',
      idEmpresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nombre: 'La Gallega',
      direccion: 'Mitre y Pellegrini',
      idEmpresa: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    // Seed de la tabla UsuarioSucursal
    await queryInterface.bulkInsert('UsuarioSucursal', [{
      idUsuario: 1,
      idSucursal: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idUsuario: 1,
      idSucursal: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idUsuario: 2,
      idSucursal: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    // Seed de la tabla Modelo
    await queryInterface.bulkInsert('Modelo', [{
      descripcion: 'Osaka',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      descripcion: 'Panama',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      descripcion: 'Urano',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      descripcion: 'Venezia',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    // Seed de la tabla MaquinaSucursal
    await queryInterface.bulkInsert('MaquinaSucursal', [{
      idSucursal: 1,
      idModelo: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idSucursal: 1,
      idModelo: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idSucursal: 1,
      idModelo: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idSucursal: 1,
      idModelo: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idSucursal: 2,
      idModelo: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idSucursal: 2,
      idModelo: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idSucursal: 2,
      idModelo: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    // Seed de la tabla Parametro
    await queryInterface.bulkInsert('Parametro', [{
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
    }, {
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
    }, {
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
    }, {
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
    }
    ], {})
    // Seed de la tabla Medicion
    await queryInterface.bulkInsert('Medicion', [{
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
    }, {
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
    }, {
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
    }, {
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
    }], {})

    // Seed de la tabla ImportanciaParametro
    await queryInterface.bulkInsert('ImportanciaParametro', [{
      idMaquinaSucursal: 1,
      idTipoTempTrabajoYBulbo: 1,
      idTipoEstadoPuerta: 1,
      idTipoCooler: 1,
      idTipoPuntoRocio: 1,
      idConsumo: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquinaSucursal: 2,
      idTipoTempTrabajoYBulbo: 1,
      idTipoEstadoPuerta: 1,
      idTipoCooler: 1,
      idTipoPuntoRocio: 1,
      idConsumo: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquinaSucursal: 3,
      idTipoTempTrabajoYBulbo: 1,
      idTipoEstadoPuerta: 1,
      idTipoCooler: 1,
      idTipoPuntoRocio: 1,
      idConsumo: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idMaquinaSucursal: 4,
      idTipoTempTrabajoYBulbo: 1,
      idTipoEstadoPuerta: 1,
      idTipoCooler: 1,
      idTipoPuntoRocio: 1,
      idConsumo: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    // Seed de la tabla Notificacion
    await queryInterface.bulkInsert('Notificacion', [{
      idTipo: 1,
      idMedicion: 1,
      visto: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idTipo: 1,
      idMedicion: 2,
      visto: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idTipo: 1,
      idMedicion: 3,
      visto: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      idTipo: 1,
      idMedicion: 4,
      visto: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    // Seed de la tabla Tipo
    await queryInterface.bulkInsert('Tipo', [{
      descripcion: 'Leve'
    }, {
      descripcion: 'Moderado'
    }, {
      descripcion: 'Grave'
    }], {})
  },
  async down (queryInterface, Sequelize) {
  }
}
