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
