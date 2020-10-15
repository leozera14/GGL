import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import api from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { FiEdit, FiTrash2, FiPower } from 'react-icons/fi';

import './product-style.css';

export default function Products() {
  const [produtos, setProdutos] = useState([]);

  const history = useHistory(); 

  const idPessoa = localStorage.getItem('idPessoa');

  const { data, error } = useFetch(produtos ? `products?id_pessoa=${idPessoa}` : null);

  if(!data) {
    return <p>Carregando...</p>
  }

  if(error) {
  return <p>Erro ao carregar produtos {error}</p>
  }

  async function editProduct(id_produto) {

  }

  async function deleteProduct(id_produto) {
    try {
      await api.delete(`/products?id_produto=${id_produto}`, {
          headers: {
              Authorization: idPessoa,
              Produto: id_produto
          }
      }).then(function(response) {
        if(response.status === 200) {
          toast.success(`${response.data[0].nome_produto} foi excluido com sucesso.`)
        }
      });
    } catch (err) {
      if(err.response.status === 400) {
        toast.error(err.response.data.error);
      }
    }
    setProdutos(data.filter(product => parseInt(product.id_produto) !== parseInt(id_produto)));
  }
  

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return(
    <div className="container">
      <h1>Produtos</h1>

      {data.length >= 0
       ? <div className="inventorie">
                    <tbody className="title">
                            <tr>
                                <td>Imagem:</td>
                            </tr>

                            <tr>
                                <td>ID Produto:</td>
                            </tr>
                            
                            <tr>
                                <td>Nome:</td>
                            </tr>

                            <tr>
                                <td>Descrição:</td>
                            </tr>

                            <tr>
                                <td>Quantidade:</td>
                            </tr>

                            <tr>
                                <td>Preço:</td>
                            </tr>

                            <tr>
                                <td>Status:</td>
                            </tr>
                    </tbody>
                    
                {data.map(product => (
                    <div>
                        <div className="separator"></div>
                        <tbody className="content-list" key={product.id_produto}>
                            <tr>      
                                <td>{product.imagem_produto}</td>
                            </tr>

                            <tr>      
                                <td>{product.id_pessoa}</td>
                            </tr>

                            <tr>             
                                <td>{product.nome_produto}</td>
                            </tr>

                            <tr>             
                                <td>{product.descricao_produto}</td>
                            </tr>

                            <tr>             
                                <td>{product.quantidade_produto}</td>
                            </tr>

                            <tr>             
                                <td>{product.preco_produto}</td>
                            </tr>

                            <tr>             
                                <td>{product.status_produto}</td>
                            </tr>
                            
                            <div className="inventorie-button">
                              <tr>
                                <td>
                                  <button onClick={() => editProduct(product.id_produto)}
                                      type="button" >
                                        <FiEdit scale={20} color="#a8a8b3" />
                                  </button>

                                  <button onClick={() => deleteProduct(product.id_produto)}
                                  type="button" >
                                      <FiTrash2 scale={20} color="#a8a8b3" />
                                  </button>
                                </td>
                              </tr>
                            </div>
                        </tbody>
                     </div>
                ))}
            </div>
            : <div></div>
            }

      <button type="button" onClick={handleLogout}>
        <FiPower size={18} color="#E02041" />
      </button>

      <Link to="/profile/j">Retornar a Home</Link> <br/>
      <Link to="/products/new">Cadastrar novos produtos</Link>
      <ToastContainer />
    </div>
  )
}