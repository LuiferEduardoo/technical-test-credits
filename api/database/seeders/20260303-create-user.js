const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users WHERE email = :email',
      {
        replacements: { email: 'luifer01ortegaperez@gmail.com' }
      }
    );
    
    if (!users || users.length === 0) {
      console.error('Usuario no encontrado. Asegúrate de ejecutar primero el seeder de usuarios.');
      return;
    }
    // Hashear el password antes de insertar
    const hashedPassword = await bcrypt.hash('wcNT8Q,A}N}6yWmT+Ie3', 10);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Luifer Ortega',
        email: 'luifer01ortegaperez@gmail.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      email: 'luifer01ortegaperez@gmail.com'
    }, {});
  }
};
