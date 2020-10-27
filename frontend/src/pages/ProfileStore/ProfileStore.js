import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { FiPower, FiArrowLeft } from 'react-icons/fi';

export default function ProfileStore() {
  const [products, setProducts] = useState([]);

  const history = useHistory(); 

  const storeID = localStorage.getItem('StoreID');

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  async function clearStorage() {
    localStorage.removeItem('StoreID');
  }

  async function loadProducts() {
    try {
      await api.get(`/storeProducts`, {
        headers: {
          Authorization: storeID
        }
      })
        .then(function(response) {
          setProducts(Object.assign(response.data));

          console.log(response);
        })
    } catch (error) {
      if(error.response.status === 400) {
        toast.error(error.response.data.error);
      }
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);


  return(
    <div>

      <button type="button" onClick={handleLogout}>
        <FiPower size={18} color="#E02041" />
      </button>

      <Link className='back-link' onClick={() => clearStorage()} to="/profile/f">
        <FiArrowLeft size={16} color="#E02041"/>
        Voltar a Home
      </Link>

      {products.length > 0
      ? <div>
          {products.map(prod => (
            <div className="product-container" key={prod.id_produto}>
              <p>{prod.id_produto}</p>
            </div>
          ))}
        </div>
      : <div></div> 
      }

      <ToastContainer />
    </div>
  )
}