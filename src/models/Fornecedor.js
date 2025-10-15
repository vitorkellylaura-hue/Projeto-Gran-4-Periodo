const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Fornecedor = sequelize.define('Fornecedor', {
  nome: { type: DataTypes.STRING, allowNull: false },
  cnpj: DataTypes.STRING,
  endereco: DataTypes.STRING,
  contato: DataTypes.STRING
});

module.exports = Fornecedor;
