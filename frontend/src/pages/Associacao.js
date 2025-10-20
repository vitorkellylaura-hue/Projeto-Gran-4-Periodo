import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Associacao() {
  const [associacoes, setAssociacoes] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/associacoes')
      .then(response => {
        if (Array.isArray(response.data)) {
          setAssociacoes(response.data);
        } else {
          console.error('Resposta inesperada:', response.data);
          setErro('Formato de dados inesperado.');
        }
      })
      .catch(error => {
        console.error('Erro ao carregar as associações:', error);
        setErro('Erro ao carregar as associações');
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Associações</h1>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {associacoes.length === 0 ? (
        <p>Nenhuma associação encontrada.</p>
      ) : (
        associacoes.map(fornecedor => (
          <div key={fornecedor.id} style={{ marginBottom: '20px' }}>
            <h2>{fornecedor.nome}</h2>
            {fornecedor.Produtos && fornecedor.Produtos.length > 0 ? (
              <ul>
                {fornecedor.Produtos.map(produto => (
                  <li key={produto.id}>{produto.nome}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhum produto associado.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Associacao;
