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
  },
}, {
  tableName: 'automobiles', 
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

// Rota POST para criar um novo automóvel
app.post('/automobiles', async (req, res) => {
  try {
    const { marca, modelo, ano, placa } = req.body;

    if (!marca || !modelo || !ano || !placa) {
      return res.status(400).json({ error: 'Informe marca, modelo, ano e placa.' });
    }

    const newAutomobile = await Automobile.create({
      marca,
      modelo,
      ano,
      placa,
    });

    res.status(201).json(newAutomobile);
  } catch (error) {
    console.error('Erro ao criar um automóvel:', error);
    res.status(500).send('Erro ao criar um automóvel');
  }
});

// Rota GET para obter todos os automóveis
app.get('/automobiles', async (req, res) => {
  try {
    const automobiles = await Automobile.findAll();
    res.json(automobiles);
  } catch (error) {
    console.error('Erro ao consultar automóveis:', error);
    res.status(500).send('Erro ao consultar automóveis');
  }
});

// Rota PUT para atualizar um automóvel pelo ID
app.put('/automobiles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { marca, modelo, ano, placa } = req.body;

    const automobile = await Automobile.findByPk(id);

    if (!automobile) {
      return res.status(404).json({ error: 'Automóvel não encontrado.' });
    }

    automobile.marca = marca;
    automobile.modelo = modelo;
    automobile.ano = ano;
    automobile.placa = placa;

    await automobile.save();

    res.json(automobile);
  } catch (error) {
    console.error('Erro ao atualizar um automóvel:', error);
    res.status(500).send('Erro ao atualizar um automóvel');
  }
});

// Rota DELETE para excluir um automóvel pelo ID
app.delete('/automobiles/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const automobile = await Automobile.findByPk(id);

    if (!automobile) {
      return res.status(404).json({ error: 'Automóvel não encontrado.' });
    }

    await automobile.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir um automóvel:', error);
    res.status(500).send('Erro ao excluir um automóvel');
  }
});

app.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
