const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('automobile', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

const app = express();
app.use(express.json());

// Defina o modelo de automóveis
const Automobile = sequelize.define('Automobile', {
  marca: {
    type: DataTypes.STRING,
    field: 'marca' // Nome da coluna no banco de dados
  },
  modelo: {
    type: DataTypes.STRING,
    field: 'modelo' // Nome da coluna no banco de dados
  },
  ano: {
    type: DataTypes.INTEGER,
    field: 'ano' // Nome da coluna no banco de dados
  },
  placa: {
    type: DataTypes.STRING,
    field: 'placa' // Nome da coluna no banco de dados
  },
}, {
  tableName: 'automobile' // Substitua pelo nome real da tabela
});

// Sincronize o modelo com o banco de dados (isso criará a tabela, se não existir)
sequelize.sync()
  .then(() => {
    console.log('Modelo sincronizado com o banco de dados');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar modelo:', err);
  });

app.use(express.urlencoded({ extended: false }));

app.post('/automobiles', async (req, res) => {
  try {
    const { marca, modelo, ano } = req.body; // Corrigido para usar os nomes definidos no modelo

    if (!marca || !modelo || !ano) {
      // Verifique se todas as informações necessárias foram fornecidas.
      return res.status(400).json({ error: 'Informe marca, modelo e ano.' });
    }

    // Crie um novo automóvel no banco de dados
    const newAutomobile = await Automobile.create({
      marca, // Corrigido para usar os nomes definidos no modelo
      modelo, // Corrigido para usar os nomes definidos no modelo
      ano, // Corrigido para usar os nomes definidos no modelo
    });

    // Envie a resposta com o novo automóvel criado
    res.status(201).json(newAutomobile);
  } catch (error) {
    console.error('Erro ao criar um automóvel:', error);
    res.status(500).send('Erro ao criar um automóvel');
  }
});

app.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
