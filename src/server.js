const express = require('express');
const sequelize = require('./database/database');
const Produto = require('./models/Produto');
const Fornecedor = require('./models/Fornecedor');
require('./models/Associacao');

const produtoController = require('./controllers/produtoController');
const fornecedorController = require('./controllers/fornecedorController');
const associacaoController = require('./controllers/associacaoController');

const app = express();
app.use(express.json());

// Rotas
app.post('/produtos', produtoController.criar);
app.get('/produtos', produtoController.listar);
app.put('/produtos/:id', produtoController.atualizar);
app.delete('/produtos/:id', produtoController.deletar);

app.post('/fornecedores', fornecedorController.criar);
app.get('/fornecedores', fornecedorController.listar);
app.put('/fornecedores/:id', fornecedorController.atualizar);
app.delete('/fornecedores/:id', fornecedorController.deletar);

app.post('/associar', associacaoController.associar);
app.get('/fornecedores/:fornecedorId/produtos', associacaoController.listarPorFornecedor);

// Sincronizar banco e iniciar servidor
sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
});
