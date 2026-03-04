const { sequelize } = require('../connection');

// Importar modelos
const User = require('./User');

// Objeto para almacenar todos los modelos
const db = {
  sequelize,
  Sequelize,
  User,
};

// Setup asociaciones
User.hasMany(Credit, {
  foreignKey: 'userId',
  as: 'credits',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

// Setup asociaciones adicionales (si las hay)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
