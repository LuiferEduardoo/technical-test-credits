const { verifyToken } = require('../utils/jwt');
const { User } = require('../database/models');

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Obtener el token del header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No se proporcionó token de autenticación'
      });
    }

    // 2. Extraer el token (quitar "Bearer ")
    const token = authHeader.slice(7);

    // 3. Verificar el token
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido o expirado'
      });
    }

    // 4. Buscar el usuario en la base de datos
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'name', 'email'] // No incluir el password
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // 5. Adjuntar el usuario a la request
    req.user = user;
    next();

  } catch (error) {
    console.error('Error en autenticación:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error al verificar autenticación'
    });
  }
};

module.exports = {
  authMiddleware
};
