import React from 'react';
import { Link } from 'react-router-dom';
import { useForm }  from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

export default function NewProducts() {

  const idPessoa = localStorage.getItem('idPessoa');

  function Render(){
    const { register, handleSubmit, errors, reset } = useForm();

    async function handleProduct(data) {
      
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

    return(
      <div className="new-incident-container">
        <div className="content">
          <section>
         

          <h1>Cadastrar Novo Caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className='back-link' to="/profile/j">
              <FiArrowLeft size={16} color="#E02041"/>
                  Voltar a Home
          </Link>

          </section>

          <form onSubmit={handleSubmit(handleProduct)}>
              <input 
                  name="nome_produto"
                  placeholder="Nome do Produto"
                  ref={register({ required: true})}
              />
              
              <span>Imagem do produto: </span>
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

              <ToastContainer />
          </form>
        </div>
      </div>
    )
  }

  return(
      <Render />
)
}