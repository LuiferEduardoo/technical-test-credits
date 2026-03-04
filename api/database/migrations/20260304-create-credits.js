module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('credits', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      client_name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      identification_id: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      loan_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      interest_rate: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      term_months: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Agregar índice para la clave foránea
    await queryInterface.addIndex('credits', ['user_id'], {
      name: 'credits_user_id_index'
    });

    // Agregar índice para identificación del cliente
    await queryInterface.addIndex('credits', ['identification_id'], {
      name: 'credits_identification_id_index'
    });

    // Agregar índice para soft deletes
    await queryInterface.addIndex('credits', ['deleted_at'], {
      name: 'credits_deleted_at_index'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('credits');
  }
};
