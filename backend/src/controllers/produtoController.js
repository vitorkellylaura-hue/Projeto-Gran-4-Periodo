const Produto = require('../models/Produto');

module.exports = {
  criar: async (req, res) => {
    try {
      const produto = await Produto.create(req.body);
      res.status(201).json(produto);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const produtos = await Produto.findAll();
      res.json(produtos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const produto = await Produto.findByPk(id);
      if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
      await produto.update(req.body);
      res.json(produto);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deletar: async (req, res) => {
    try {
      const { id } = req.params;
      const produto = await Produto.findByPk(id);
      if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
      await produto.destroy();
      res.json({ mensagem: 'Produto deletado' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
