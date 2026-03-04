const express = require('express');
const router = express.Router();
const { login, getProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/auth');
const { validateLogin } = require('../middlewares/validator');

// Ruta de login - Pública
router.post('/login', validateLogin, login);

// Ruta para obtener el perfil - Requiere autenticación
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
