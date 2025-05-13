const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api', taskRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados SQLite realizada com sucesso!');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((err) => {
        console.error('Erro ao conectar com o banco de dados:', err);
    });



sequelize.sync({ force: true }) 
    .then(() => {
        console.log('Tabelas sincronizadas!');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((err) => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });
