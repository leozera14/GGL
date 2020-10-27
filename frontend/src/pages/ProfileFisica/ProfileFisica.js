import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { FiPower } from 'react-icons/fi';

import './fisica-style.css';

export default function ProfileFisica() {
  const [store, setStore] = useState([]);

  const history = useHistory(); 

  const cidade = localStorage.getItem('cidade');
  const uf = localStorage.getItem('uf');

  const { data, error } = useFetch(store ? `indexStore?cidade=${cidade}&uf=${uf}` : null);

  if(!data) {
    return <p>Carregando...</p>
  }
  
  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  async function goTo(id_pessoa) {
    localStorage.setItem('StoreID', id_pessoa);
    toast.success("Redirecionando à Loja...");    
    setTimeout(() => {
      history.push('/store')
    }, 1500)
  }

  return(
    <div>
      <h1>Fisica</h1>

      <button type="button" onClick={handleLogout}>
        <FiPower size={18} color="#E02041" />
      </button>

      <div>
        {data.length >= 0
        ? data.map(store => (
          <div className="store-container" key={store.id_pessoa} onClick={() => goTo(store.id_pessoa)}>
            <div>
              <p>Nome: {store.nomerazao}</p>
            </div>

            <div>
              <p>Endereço: {store.endereco}</p>
            </div>

            <div>
              <p>Número: {store.nroendereco}</p>
            </div>

            <div>
              <p>Bairro: {store.bairro}</p>
            </div>

            <div>
              <p>Telefone: {store.foneddd} {store.fonenro}</p>
            </div>

            <div>
              <p>E-mail: {store.email}</p>
            </div>
          </div>
        ))
        : <div></div>
        }
      </div>

      <ToastContainer />
    </div>
  )
}