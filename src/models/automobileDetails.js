const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sua_basedados', 'seu_usuario', 'sua_senha', {
  host: 'localhost',
  dialect: 'mysql',
});

const AutomobileDetails = sequelize.define('AutomobileDetails', {
  quilometragem: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  cor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  outrasCaracteristicas: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Associe o modelo "AutomobileDetails" com o modelo "Automobile" (se necessário)
// Por exemplo, se você deseja associar um conjunto de detalhes a um automóvel específico
AutomobileDetails.belongsTo(Automobile); // Supondo que você tenha um modelo "Automobile" já definido

// Sincronize o modelo com o banco de dados (cria a tabela se ela não existir)
sequelize.sync()
  .then(() => {
    console.log('Tabela "AutomobileDetails" criada com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao criar tabela "AutomobileDetails":', error);
  });

module.exports = AutomobileDetails;
