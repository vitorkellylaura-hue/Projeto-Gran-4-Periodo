const Produto = require('../models/Produto');
const Fornecedor = require('../models/Fornecedor');

module.exports = {
  async associar(req, res) {
    const { produtoId, fornecedorId } = req.body;
    const produto = await Produto.findByPk(produtoId);
    const fornecedor = await Fornecedor.findByPk(fornecedorId);

    await produto.addFornecedor(fornecedor);
    return res.json({ mensagem: 'Associação criada com sucesso!' });
  },

  async listarPorFornecedor(req, res) {
    const { fornecedorId } = req.params;
    const fornecedor = await Fornecedor.findByPk(fornecedorId, {
      include: Produto
    });
    return res.json(fornecedor);
  }
};
