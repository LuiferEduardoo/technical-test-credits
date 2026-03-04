const Boom = require('@hapi/boom');

// Middleware para manejar errores de Boom
const errorHandler = (err, req, res, next) => {
  // Si el error es de Boom
  if (Boom.isBoom(err)) {
    return res.status(err.output.statusCode).json({
      success: false,
      message: err.output.payload.message,
      error: err.output.payload.error
    });
  }

  // Manejar errores de Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: err.errors.map(e => e.message).join(', ')
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      message: 'El registro ya existe'
    });
  }

  // Error genérico
  console.error('Error no manejado:', err.message);
  return res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
};

module.exports = errorHandler;
