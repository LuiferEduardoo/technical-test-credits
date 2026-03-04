const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../connection');

class User extends Model {
  // Método estático para encriptar password
  static async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  // Método de instancia para verificar password
  async verifyPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El nombre es obligatorio'
      },
      len: {
        args: [2, 100],
        msg: 'El nombre debe tener entre 2 y 100 caracteres'
      }
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'El email es obligatorio'
      },
      isEmail: {
        msg: 'El email debe ser válido'
      },
      len: {
        args: [5, 255],
        msg: 'El email debe tener entre 5 y 255 caracteres'
      }
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El password es obligatorio'
      },
      len: {
        args: [6, 255],
        msg: 'El password debe tener al menos 6 caracteres'
      }
    }
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  // Hooks para ejecutar acciones antes/después de operaciones
  hooks: {
    beforeCreate: async (user) => {
      // Hash del password antes de crear el usuario
      if (user.password) {
        user.password = await User.hashPassword(user.password);
      }
    },
    beforeUpdate: async (user) => {
      // Hash del password solo si ha cambiado
      if (user.changed('password')) {
        user.password = await User.hashPassword(user.password);
      }
    }
  }
});

module.exports = User;
