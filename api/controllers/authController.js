const { User } = require('../database/models');
const { generateToken } = require('../utils/jwt');
const Boom = require('@hapi/boom');

// Login de usuario
const login = async (req, res, next) => {
  try {
    const { email, password } = req?.body;

    // Validar que se proporcionen email y password
    if (!email || !password) {
      throw Boom.badRequest('Email y password son obligatorios');
    }

    // Buscar el usuario por email
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      throw Boom.unauthorized('Credenciales inválidas');
    }

    // Verificar el password
    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid) {
      throw Boom.unauthorized('Credenciales inválidas');
    }

    // Generar token JWT
    const token = generateToken({
      id: user.id,
      email: user.email
    });

    // Responder con el token y datos del usuario (sin password)
    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    });

  } catch (error) {
    next(error);
  }
};

// Obtener perfil del usuario autenticado
const getProfile = async (req, res, next) => {
  try {
    // El usuario ya viene adjuntado en req.user por el middleware
    return res.status(200).json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getProfile,
};
