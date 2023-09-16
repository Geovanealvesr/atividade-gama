const { Sequelize } = require('sequelize');

// Substitua 'mysql' pelo dialeto do seu banco de dados (ex: 'postgres', 'sqlite', 'mssql', etc.)
const sequelize = new Sequelize('automobile', 'root', '', {
  host: 'localhost', // Altere para o host do seu banco de dados
  dialect: 'mysql', // Substitua pelo dialeto do seu banco de dados
});

module.exports = sequelize;
