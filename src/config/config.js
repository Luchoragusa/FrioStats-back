require('dotenv').config()

const PORT = process.env.PORT

// Configs DB
const host = process.env.DB_HOST
const username = process.env.DB_USER || 'root'
const database = process.env.DB_NAME || 'clase'
const password = process.env.DB_PASS
const dialect = process.env.DB_TYPE
const logging = true // Esto es para que muestre los logs de las consultas SQL

// Configs Seeds
const seederStorage = 'sequelize'
const seederStorageTableName = 'seeds'

// Configs Migrations
const migrationStorage = 'sequelize'
const migrationStorageTableName = 'migrations'

module.exports = {
  PORT,
  host,
  username,
  database,
  password,
  dialect,
  logging,
  seederStorage,
  seederStorageTableName,
  migrationStorage,
  migrationStorageTableName
}
