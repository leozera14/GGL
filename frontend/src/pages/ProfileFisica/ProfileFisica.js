import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

export default function ProfileFisica() {
  const history = useHistory(); 

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
    </div>
  )
}