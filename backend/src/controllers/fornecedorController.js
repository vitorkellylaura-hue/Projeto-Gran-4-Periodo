const Fornecedor = require('../models/Fornecedor');

module.exports = {
  criar: async (req, res) => {
    try {
      const fornecedor = await Fornecedor.create(req.body);
      res.status(201).json(fornecedor);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const fornecedores = await Fornecedor.findAll();
      res.json(fornecedores);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const fornecedor = await Fornecedor.findByPk(id);
      if (!fornecedor) return res.status(404).json({ error: 'Fornecedor não encontrado' });
      await fornecedor.update(req.body);
      res.json(fornecedor);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  deletar: async (req, res) => {
    try {
      const { id } = req.params;
      const fornecedor = await Fornecedor.findByPk(id);
      if (!fornecedor) return res.status(404).json({ error: 'Fornecedor não encontrado' });
      await fornecedor.destroy();
      res.json({ mensagem: 'Fornecedor deletado' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
