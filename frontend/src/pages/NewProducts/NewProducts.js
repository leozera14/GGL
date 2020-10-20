import React, { useState, useEffect }from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm }  from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

export default function NewProducts() {
  const [tipo, setTipo] = useState('');

  const history = useHistory();

  const idPessoa = localStorage.getItem('idPessoa');
  const id_produto = localStorage.getItem('id_produto');
  const nome_produto = localStorage.getItem('nome_produto');
  const descricao_produto = localStorage.getItem('descricao_produto');
  const imagem_produto = localStorage.getItem('imagem_produto');
  const preco_produto = localStorage.getItem('preco_produto');
  const quantidade_produto = localStorage.getItem('quantidade_produto');
  const status_produto = localStorage.getItem('status_produto');  

  useEffect(() => {
    if(id_produto) {
      setTipo('E')
    } else {
      setTipo('N')
    }
  }, [id_produto]);

  function Render(){

    const { register, handleSubmit, errors, reset } = useForm({
      defaultValues: {
        nome_produto: nome_produto || "",
        descricao_produto: descricao_produto || "",
        imagem_produto: imagem_produto || "",
        preco_produto: preco_produto || "",
        quantidade_produto: quantidade_produto || "",
        status_produto: status_produto || ""
      }
    });


    async function clearStorage() {
      localStorage.removeItem('id_produto');
      localStorage.removeItem('nome_produto');
      localStorage.removeItem('descricao_produto');
      localStorage.removeItem('imagem_produto');
      localStorage.removeItem('preco_produto');
      localStorage.removeItem('quantidade_produto');
      localStorage.removeItem('status_produto');
    }


    async function handleEditProduct(data) {
      try {
        await api.put(`/products?id_produto=${id_produto}`, data, {
          headers: {
            Authorization: idPessoa
          }
        }).then(function(response) {
          if(response.status === 200) {
            toast.success(response.data.message);
            clearStorage();
            setTimeout(() => {
              history.push('/products')
            }, 1500)
          }
        })
      } catch (error) {
        if(error.response.status === 400) {
          toast.error(error.response.data.error);
        }
      }
    }


    async function handleCreateProduct(data) {
      
      try {
        await api.post('/products/new', data, {
                headers: {
                  Authorization: idPessoa
                }
        })
            .then(function(response){ 
                if(response.status === 200) {
                    toast.success(`${response.data.message}`);
                    reset();
                }
            })
    } catch (err) {
        if(err.response.status === 400) {
          toast.error(err.response.data.error);
        }
      }
    }

    const Edit = () => {
      return (
        <>
         <section>
         

         <h1>Editar o produto {nome_produto}</h1>
         <p>Altere as informações do produto de acordo com sua escolha.</p>

         <Link className='back-link' onClick={() => clearStorage()} to="/products">
             <FiArrowLeft size={16} color="#E02041"/>
                 Voltar a Home
         </Link>

         </section>

         <form  onSubmit={handleSubmit(handleEditProduct)}>
              <label htmlFor="nome_produto">Nome:</label>
              <input 
                  name="nome_produto"
                  placeholder="Nome do Produto"
                  ref={register({ required: true})}
              />
              
              <label htmlFor="imagem_produto">Imagem:</label>
              <input 
                  type="file"
                  name="imagem_produto"
                  ref={register({ required: false})}
              />

              <label htmlFor="descricao_produto">Descrição:</label>
              <textarea 
                  name="descricao_produto"
                  placeholder="Descrição do Produto"
                  ref={register({ required: true})}
              />

              <label htmlFor="quantidade_produto">Quantidade:</label>
              <input 
                  name="quantidade_produto"
                  placeholder="Qtd. do Produto em estoque"
                  ref={register({ required: false})}
                  type="number"
              />
              
              <label htmlFor="preco_produto">Preço:</label>
              <input 
                  name="preco_produto"
                  placeholder="Preço do Produto"
                  ref={register({ required: true})}
                  type="number"
                  step="0.010"
              />

              <label htmlFor="status_produto">Status:</label>
              <select name="status_produto" ref={register()}>
                <option value="A">Ativo</option>
                <option value="I">Inativo</option>
              </select>

              <input type="submit" className="button" value={"Atualizar"}></input>

              
          </form>
        </>
      )
    }

    const New = () => {
      return (
        <>
          <section>
         

          <h1>Cadastrar Novo Caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className='back-link' to="/profile/j">
              <FiArrowLeft size={16} color="#E02041"/>
                  Voltar a Home
          </Link>

          </section>
          
          <form  onSubmit={handleSubmit(handleCreateProduct)}>
              <input 
                  name="nome_produto"
                  placeholder="Nome do Produto"
                  ref={register({ required: true})}
              />
              
              <label htmlFor="imagem_produto">Imagem:</label>
              <input 
                  type="file"
                  name="imagem_produto"
                  ref={register({ required: false})}
              />

              <textarea 
                  name="descricao_produto"
                  placeholder="Descrição do Produto"
                  ref={register({ required: true})}
              />

              <input 
                  name="quantidade_produto"
                  placeholder="Qtd. do Produto em estoque"
                  ref={register({ required: false})}
                  type="number"
              />
              
              <input 
                  name="preco_produto"
                  placeholder="Preço do Produto"
                  ref={register({ required: true})}
                  type="number"
                  step="0.010"
              />

              <input type="submit" className="button" value={"Cadastrar"}></input>

          </form>
        </>
      )
    }


    return(
      <div className="new-incident-container">
        <div className="content">
          {tipo === "N"
          ? <New />
          : <Edit />}
          <ToastContainer />
        </div>
      </div>
    )
  }

  return(
      <Render />
)
}