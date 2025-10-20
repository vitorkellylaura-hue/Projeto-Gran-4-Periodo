import React, { useEffect, useState } from 'react';
import { getProdutos } from '../services/produtoService';

function Produto() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await getProdutos();
        setProdutos(data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Não foi possível carregar os produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Produtos</h1>
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <ul>
          {produtos.map((p) => (
            <li key={p.id}>
              <strong>{p.nome}</strong> - {p.descricao} - R${p.preco} - Código: {p.codigoBarras}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Produto;
