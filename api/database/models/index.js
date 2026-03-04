const { sequelize } = require('../connection');
const { Sequelize } = require('sequelize');

// Importar modelos
const User = require('./User');
const Credit = require('./Credit');

// Objeto para almacenar todos los modelos
const db = {
  sequelize,
  Sequelize,
  User,
  Credit,
};

// Setup asociaciones
User.hasMany(Credit, {
  foreignKey: 'userId',
  as: 'credits',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

Credit.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
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
