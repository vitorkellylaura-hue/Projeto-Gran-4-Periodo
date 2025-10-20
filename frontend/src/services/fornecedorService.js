import axios from 'axios';

const API_URL = "http://localhost:3000/fornecedores";

export const getFornecedores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createFornecedor = async (fornecedor) => {
  const response = await axios.post(API_URL, fornecedor);
  return response.data;
};

export const updateFornecedor = async (id, fornecedor) => {
  const response = await axios.put(`${API_URL}/${id}`, fornecedor);
  return response.data;
};

export const deleteFornecedor = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
