const Sequelize = require("sequelize");

const DB_NAME = "automobile";
const DB_USER = "root";
const DB_PASS = "";
const DB_CONFIG = {
  dialect: "mysql",
  host: "localhost", // Corrigido para "localhost" se esse for o seu host do banco de dados
  port: 3306,
};

// Variável para guardar a conexão do banco de dados
const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);

async function hasConnection() {
  try {
    await db.authenticate();
    console.log("Banco de dados conectado!");
  } catch (error) {
    console.error("Erro ao tentar se conectar ao banco de dados");
  }
}

// Exporte a conexão e a função de verificação de conexão
module.exports = {
  db,
  hasConnection,
};
