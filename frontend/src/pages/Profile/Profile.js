import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import './styles.css';

export default function Profile() {
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

      <Link to="/products">Ver produtos cadastrados</Link>
      <Link to="/products/new">Cadastrar novos produtos</Link>

    </div>
  )
}