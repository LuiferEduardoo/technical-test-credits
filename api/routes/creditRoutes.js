const express = require('express');
const router = express.Router();
const {
  createCredit,
  getCredits,
  getCreditById,
  updateCredit,
  deleteCredit
} = require('../controllers/creditController');
const { authMiddleware } = require('../middlewares/auth');
const { validateCreditCreate } = require('../middlewares/validator');

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Crear un nuevo crédito
router.post('/', validateCreditCreate, createCredit);

// Obtener todos los créditos del usuario autenticado
router.get('/', getCredits);

// Obtener un crédito por ID
router.get('/:id', getCreditById);

// Actualizar un crédito
router.put('/:id', updateCredit);

// Eliminar un crédito (soft delete)
router.delete('/:id', deleteCredit);

module.exports = router;
