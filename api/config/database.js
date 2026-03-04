require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: console.log,
    timezone: '-05:00', // Ajustar según tu zona horaria
    define: {
      timestamps: true, // Agregar createdAt y updatedAt automáticamente
      underscored: false, // Usar camelCase en lugar de snake_case
      freezeTableName: true, // No pluralizar los nombres de las tablas
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    timezone: '-05:00',
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    timezone: '-05:00',
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
    },
    pool: {
      max: 20,
      min: 5,
      acquire: 30000,
      idle: 10000
    },
    ssl: true, // Habilitar SSL en producción si es necesario
  }
};
