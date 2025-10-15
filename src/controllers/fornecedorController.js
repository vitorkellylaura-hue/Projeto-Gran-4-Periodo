const Fornecedor = require('../models/Fornecedor');

module.exports = {
  async criar(req, res) {
    const fornecedor = await Fornecedor.create(req.body);
    return res.json(fornecedor);
  },

  async listar(req, res) {
    const fornecedores = await Fornecedor.findAll();
    return res.json(fornecedores);
  },

  async atualizar(req, res) {
    const { id } = req.params;
    await Fornecedor.update(req.body, { where: { id } });
    return res.json({ mensagem: 'Fornecedor atualizado com sucesso!' });
  },

  async deletar(req, res) {
    const { id } = req.params;
    await Fornecedor.destroy({ where: { id } });
    return res.json({ mensagem: 'Fornecedor deletado com sucesso!' });
  }
};
