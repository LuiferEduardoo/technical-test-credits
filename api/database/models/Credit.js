const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

class Credit extends Model {}

Credit.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  clientName: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: 'client_name', // Mapeo a la columna en la base de datos
    validate: {
      notEmpty: {
        msg: 'El nombre del cliente es obligatorio'
      },
      len: {
        args: [2, 150],
        msg: 'El nombre del cliente debe tener entre 2 y 150 caracteres'
      }
    }
  },
  identificationId: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'identification_id',
    validate: {
      notEmpty: {
        msg: 'La identificación es obligatoria'
      },
      len: {
        args: [5, 20],
        msg: 'La identificación debe tener entre 5 y 20 caracteres'
      }
    }
  },
  loanAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    field: 'loan_amount',
    validate: {
      notEmpty: {
        msg: 'El monto del crédito es obligatorio'
      },
      min: {
        args: [0.01],
        msg: 'El monto del crédito debe ser mayor a 0'
      }
    }
  },
  interestRate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    field: 'interest_rate',
    validate: {
      notEmpty: {
        msg: 'La tasa de interés es obligatoria'
      },
      min: {
        args: [0],
        msg: 'La tasa de interés no puede ser negativa'
      },
      max: {
        args: [100],
        msg: 'La tasa de interés no puede exceder 100%'
      }
    }
  },
  termMonths: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'term_months',
    validate: {
      notEmpty: {
        msg: 'El plazo en meses es obligatorio'
      },
      min: {
        args: [1],
        msg: 'El plazo debe ser al menos 1 mes'
      },
      max: {
        args: [360],
        msg: 'El plazo no puede exceder 360 meses (30 años)'
      }
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL' // Si se elimina el usuario, el campo se establece en NULL
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'deleted_at'
  }
}, {
  sequelize,
  modelName: 'Credit',
  tableName: 'credits',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  paranoid: true, // Habilita soft deletes automáticos
  underscored: true, // Usa snake_case en la base de datos
  // Hooks para cálculos automáticos
  hooks: {
    beforeValidate: (credit) => {
      // Formatear montos a números decimales
      if (typeof credit.loanAmount === 'string') {
        credit.loanAmount = parseFloat(credit.loanAmount);
      }
      if (typeof credit.interestRate === 'string') {
        credit.interestRate = parseFloat(credit.interestRate);
      }
      if (typeof credit.termMonths === 'string') {
        credit.termMonths = parseInt(credit.termMonths, 10);
      }
    }
  }
});

module.exports = Credit;
