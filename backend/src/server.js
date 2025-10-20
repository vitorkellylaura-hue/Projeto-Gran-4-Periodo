const express = require('express');
const cors = require('cors');
const sequelize = require('./database/database');

// Importa modelos (garante que o Sequelize crie as tabelas)
require('./models/Produto');
require('./models/Fornecedor');
require('./models/Associacao');

// Importa os controllers
const produtoController = require('./controllers/produtoController');
const fornecedorController = require('./controllers/fornecedorController');
const associacaoController = require('./controllers/associacaoController');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas de Produtos
app.post('/produtos', produtoController.criar);
app.get('/produtos', produtoController.listar);
app.put('/produtos/:id', produtoController.atualizar);
app.delete('/produtos/:id', produtoController.deletar);

// Rotas de Fornecedores
app.post('/fornecedores', fornecedorController.criar);
app.get('/fornecedores', fornecedorController.listar);
app.put('/fornecedores/:id', fornecedorController.atualizar);
app.delete('/fornecedores/:id', fornecedorController.deletar);

// Rotas de Associações (corrigidas)
app.post('/associacoes', associacaoController.criar); // antes era "associar"
app.get('/associacoes', associacaoController.listarTodas);
app.get('/fornecedores/:fornecedorId/produtos', associacaoController.listarPorFornecedor);
app.delete('/associacoes/:id', associacaoController.deletar); // opcional

// Sincronizar banco e iniciar servidor
sequelize.sync().then(() => {
  app.listen(3000, () => console.log('✅ Servidor rodando em http://localhost:3000'));
}).catch(err => console.error('❌ Erro ao conectar com o banco de dados:', err));
