require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USERNAME || null,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || null,
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_CONNECTION || 'mysql',
    logging: false,
    timezone: '+07:00'
  },
  test: {
    username: process.env.DB_USERNAME || null,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || null,
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_CONNECTION || 'mysql',
    timezone: '+07:00'
  },
  production: {
    username: process.env.DB_USERNAME || null,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || null,
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_CONNECTION || 'mysql',
    timezone: '+07:00'
  }
}
