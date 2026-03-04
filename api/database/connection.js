const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    timezone: dbConfig.timezone,
    define: dbConfig.define,
    pool: dbConfig.pool,
  }
);

// Probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
    return false;
  }
};

// Sincronizar modelos con la base de datos
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force, alter: !force });
    console.log('✅ Base de datos sincronizada correctamente.');
    return true;
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error.message);
    return false;
  }
};

// Cerrar conexión
const closeConnection = async () => {
  try {
    await sequelize.close();
    console.log('✅ Conexión a la base de datos cerrada.');
    return true;
  } catch (error) {
    console.error('❌ Error al cerrar la conexión:', error.message);
    return false;
  }
};

module.exports = {
  sequelize,
  testConnection,
  syncDatabase,
  closeConnection,
};
