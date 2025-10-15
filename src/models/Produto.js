const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Produto = sequelize.define('Produto', {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: DataTypes.STRING,
  preco: { type: DataTypes.FLOAT, allowNull: false },
  codigoBarras: DataTypes.STRING
});

module.exports = Produto;
