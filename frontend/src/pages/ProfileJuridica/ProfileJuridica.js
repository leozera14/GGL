import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { FiPower } from 'react-icons/fi';

import './styles.css';

export default function ProfileJuridica() {
  const history = useHistory(); 

  const idPessoa = localStorage.getItem('idPessoa');
  const nomerazao = localStorage.getItem('nomerazao');

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return(
    <div>
      <h1>Bem vindo(a) {}</h1>

      <button type="button" onClick={handleLogout}>
        <FiPower size={18} color="#E02041" />
      </button>


      <Link to="/products">Produtos cadastrados</Link>
                                    <br/>
      <Link to="/products/new">Cadastrar novos produtos</Link>
      
      <ToastContainer />
    </div>
  )
}