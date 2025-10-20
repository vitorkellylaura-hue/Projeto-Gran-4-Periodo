import axios from 'axios';

const API_URL = "http://localhost:3000/associar";
const API_URL_LISTAR = "http://localhost:3000/associacoes"; // rota GET

export const criarAssociacao = async (associacao) => {
  const response = await axios.post(API_URL, associacao);
  return response.data;
};

export const getAssociacoes = async () => {
  const response = await axios.get(API_URL_LISTAR);
  return response.data;
};
