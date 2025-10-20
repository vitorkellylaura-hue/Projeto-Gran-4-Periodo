import React, { useEffect, useState } from 'react';
import { getFornecedores } from '../services/fornecedorService';

function Fornecedor() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const data = await getFornecedores();
        setFornecedores(data);
      } catch (err) {
        console.error("Erro ao buscar fornecedores:", err);
        setError("Não foi possível carregar os fornecedores.");
      } finally {
        setLoading(false);
      }
    };

    fetchFornecedores();
  }, []);

  if (loading) return <p>Carregando fornecedores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Fornecedores</h1>
      {fornecedores.length === 0 ? (
        <p>Nenhum fornecedor cadastrado.</p>
      ) : (
        <ul>
          {fornecedores.map((f) => (
            <li key={f.id}>
              <strong>{f.nome}</strong> - {f.cnpj} - {f.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Fornecedor;
