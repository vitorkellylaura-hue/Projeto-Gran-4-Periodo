const Produto = require('../models/Produto');

module.exports = {
  async criar(req, res) {
    const produto = await Produto.create(req.body);
    return res.json(produto);
  },

  async listar(req, res) {
    const produtos = await Produto.findAll();
    return res.json(produtos);
  },

  async atualizar(req, res) {
    const { id } = req.params;
    await Produto.update(req.body, { where: { id } });
    return res.json({ mensagem: 'Produto atualizado com sucesso!' });
  },

  async deletar(req, res) {
    const { id } = req.params;
    await Produto.destroy({ where: { id } });
    return res.json({ mensagem: 'Produto deletado com sucesso!' });
  }
};
