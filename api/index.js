require('dotenv').config();
const express = require('express');
const { testConnection, syncDatabase } = require('./database/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido al servidor Express.js' });
});

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV,
    database: process.env.DB_NAME
  });
});

// Inicializar servidor y conexión a la base de datos
const startServer = async () => {
  try {
    // Probar conexión a la base de datos
    const connected = await testConnection();
    if (!connected) {
      console.error('⚠️  No se pudo conectar a la base de datos. El servidor se iniciará sin conexión.');
    } else {
      // Sincronizar modelos (force: false para no borrar datos existentes)
      await syncDatabase(false);
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

// Manejo de errores no capturados
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error.message);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error.message);
  process.exit(1);
});

startServer();
