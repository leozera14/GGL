import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import api from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { FiPower } from 'react-icons/fi';

export default function ProfileFisica() {
  const [store, setStore] = useState([]);

  const history = useHistory(); 

  const cidade = localStorage.getItem('cidade');
  const uf = localStorage.getItem('uf');

  const { data, error } = useFetch(store ? `indexStore?cidade=${cidade}&uf=${uf}` : null);

  if(!data) {
    return <p>Carregando...</p>
  }

  console.log(data);
  
  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return(
    <div>
      <h1>Fisica</h1>

      <button type="button" onClick={handleLogout}>
        <FiPower size={18} color="#E02041" />
      </button>

      <ToastContainer />
    </div>
  )
}