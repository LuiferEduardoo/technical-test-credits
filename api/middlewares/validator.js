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

// Validaciones para crear crédito
const validateCreditCreate = [
  body('clientName')
    .trim()
    .notEmpty()
    .withMessage('El nombre del cliente es obligatorio')
    .isLength({ min: 2, max: 150 })
    .withMessage('El nombre del cliente debe tener entre 2 y 150 caracteres'),
  body('identificationId')
    .trim()
    .notEmpty()
    .withMessage('La identificación es obligatoria')
    .isLength({ min: 5, max: 20 })
    .withMessage('La identificación debe tener entre 5 y 20 caracteres'),
  body('loanAmount')
    .notEmpty()
    .withMessage('El monto del crédito es obligatorio')
    .isFloat({ min: 0.01 })
    .withMessage('El monto del crédito debe ser mayor a 0'),
  body('interestRate')
    .notEmpty()
    .withMessage('La tasa de interés es obligatoria')
    .isFloat({ min: 0, max: 100 })
    .withMessage('La tasa de interés debe estar entre 0 y 100'),
  body('termMonths')
    .notEmpty()
    .withMessage('El plazo en meses es obligatorio')
    .isInt({ min: 1, max: 360 })
    .withMessage('El plazo debe estar entre 1 y 360 meses'),
  handleValidationErrors
];

module.exports = {
  validateBody,
  validateLogin,
  validateCreditCreate,
  handleValidationErrors,
};
