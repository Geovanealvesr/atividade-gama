

// Defina o modelo de "Automobile"
const Automobile = sequelize.define('Automobile', {
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Para garantir que cada placa seja única
  },
  // Outras informações relevantes sobre o automóvel
  // Adicione aqui os campos adicionais que você desejar
});

// Sincronize o modelo com o banco de dados (cria a tabela se ela não existir)
sequelize.sync()
  .then(() => {
    console.log('Tabela "Automobile" criada com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao criar tabela "Automobile":', error);
  });

// Exporte o modelo para uso em outros lugares da sua aplicação
module.exports = Automobile;
