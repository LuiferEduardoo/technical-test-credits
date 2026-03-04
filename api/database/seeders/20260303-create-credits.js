const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Primero buscamos el ID del usuario para asignarlo a los créditos
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email = :email',
      {
        replacements: { email: 'luifer01ortegaperez@gmail.com' },
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (!users || users.length === 0) {
      console.error('Usuario no encontrado. Asegúrate de ejecutar primero el seeder de usuarios.');
      return;
    }

    const userId = users[0].id;

    // Datos de los créditos
    const creditsData = [
      {
        client_name: 'Pepito Perez',
        identification_id: '1000000001',
        loan_amount: 7800000.00,
        interest_rate: 2.00,
        term_months: 10,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        client_name: 'Maria Perez',
        identification_id: '1000000002',
        loan_amount: 12500000.00,
        interest_rate: 2.00,
        term_months: 5,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        client_name: 'Antonio Rodriguez',
        identification_id: '1000000003',
        loan_amount: 10312673.00,
        interest_rate: 2.00,
        term_months: 5,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        client_name: 'Giselle López',
        identification_id: '1000000004',
        loan_amount: 8628510.00,
        interest_rate: 2.00,
        term_months: 12,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        client_name: 'Martha Perez',
        identification_id: '1000000005',
        loan_amount: 5889085.00,
        interest_rate: 2.00,
        term_months: 24,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        client_name: 'Isaac llanos',
        identification_id: '1000000006',
        loan_amount: 14793565.00,
        interest_rate: 2.00,
        term_months: 48,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        client_name: 'Teresa Gutierrez',
        identification_id: '1000000007',
        loan_amount: 8072348.00,
        interest_rate: 2.00,
        term_months: 50,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        client_name: 'Isabel Llanos',
        identification_id: '1000000008',
        loan_amount: 5143860.00,
        interest_rate: 2.00,
        term_months: 60,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        client_name: 'Paola Tao',
        identification_id: '1000000009',
        loan_amount: 12881963.00,
        interest_rate: 2.00,
        term_months: 24,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        client_name: 'Wendy Moscoso',
        identification_id: '1000000010',
        loan_amount: 13484682.00,
        interest_rate: 2.00,
        term_months: 40,
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('credits', creditsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('credits', null, {});
  }
};
