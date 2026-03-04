const Boom = require('@hapi/boom');
const { body, validationResult } = require('express-validator');

// Middleware para validar que el body exista y tenga los campos requeridos
const validateBody = (requiredFields) => {
  return (req, res, next) => {
    // Verificar que req.body exista
    if (!req.body || Object.keys(req.body).length === 0) {
      throw Boom.badRequest('El cuerpo de la solicitud es requerido');
    }

    // Verificar campos requeridos
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      throw Boom.badRequest(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
    }

    next();
  };
};

// Middleware para manejar resultados de validación de express-validator
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    throw Boom.badRequest(errorMessages);
  }
  next();
};

// Validaciones específicas para login
const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('El formato del email no es válido')
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('El password es obligatorio')
    .isLength({ min: 6 })
    .withMessage('El password debe tener al menos 6 caracteres'),
  handleValidationErrors
];

module.exports = {
  validateBody,
  validateLogin,
  handleValidationErrors,
};
