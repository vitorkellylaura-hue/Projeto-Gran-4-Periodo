const Produto = require('../models/Produto');
const Fornecedor = require('../models/Fornecedor');

// Criar associação entre fornecedor e produto
exports.criar = async (req, res) => {
  try {
    const { fornecedorId, produtoId } = req.body;

    if (!fornecedorId || !produtoId) {
      return res.status(400).json({ error: 'fornecedorId e produtoId são obrigatórios' });
    }

    const fornecedor = await Fornecedor.findByPk(fornecedorId);
    const produto = await Produto.findByPk(produtoId);

    if (!fornecedor || !produto) {
      return res.status(404).json({ error: 'Fornecedor ou Produto não encontrado' });
    }

    await fornecedor.addProduto(produto);
    res.status(201).json({ message: 'Associação criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar associação:', error);
    res.status(500).json({ error: 'Erro interno ao criar associação' });
  }
};

// Listar todas as associações
exports.listarTodas = async (req, res) => {
  try {
    const fornecedores = await Fornecedor.findAll({
      include: {
        model: Produto,
        through: { attributes: [] } // não exibe tabela intermediária
      }
    });
    res.json(fornecedores);
  } catch (error) {
    console.error('Erro ao listar associações:', error);
    res.status(500).json({ error: 'Erro interno ao listar associações' });
  }
};

// Listar produtos de um fornecedor específico
exports.listarPorFornecedor = async (req, res) => {
  try {
    const { fornecedorId } = req.params;
    const fornecedor = await Fornecedor.findByPk(fornecedorId, {
      include: Produto
    });

    if (!fornecedor) {
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    }

    res.json(fornecedor.Produtos);
  } catch (error) {
    console.error('Erro ao listar produtos do fornecedor:', error);
    res.status(500).json({ error: 'Erro interno ao listar produtos do fornecedor' });
  }
};

// Deletar associação (opcional)
exports.deletar = async (req, res) => {
  try {
    const { fornecedorId, produtoId } = req.body;

    const fornecedor = await Fornecedor.findByPk(fornecedorId);
    const produto = await Produto.findByPk(produtoId);

    if (!fornecedor || !produto) {
      return res.status(404).json({ error: 'Fornecedor ou Produto não encontrado' });
    }

    await fornecedor.removeProduto(produto);
    res.json({ message: 'Associação removida com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar associação:', error);
    res.status(500).json({ error: 'Erro interno ao deletar associação' });
  }
};
