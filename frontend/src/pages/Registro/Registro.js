import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm }  from 'react-hook-form';
import moment from 'moment';
import "moment/locale/pt-br";
import { toast, ToastContainer } from 'react-toastify';
import './register-style.css';
import 'react-toastify/dist/ReactToastify.min.css'; 
import api from '../../services/api';

export default function Registro() {
  const [tipo, setTipo] = useState('');
  const history = useHistory();

  moment.locale("pt-BR");

  const dtaAtual = moment().format("DD/MM/YYYY");
  
  function Render() {

    const { register, handleSubmit, errors } = useForm();

    async function handleRegister(data) {  
      const dados = ({
        data,
        tipo,
        dtaAtual
      })
     
      try{
        await api.post('/pessoa/register', dados)
            .then(function(response){
                if(response.status === 200){
                    toast.success(`${response.data} Seu cadastro foi realizado com sucesso, redirecionando ao login !`);
                    console.log(response);
                    setTimeout(() =>{
                        history.push('/')
                    }, 3000);
                }
            });
      } catch (err) {
        if(err.response.status === 400) {
            toast.error(err.response.data.error);
        }
      }
    }

    const CPF = () => {
      return (
        <>
          <input
            name="nomerazao"
            placeholder="Insira seu Nome"
            ref={register({ required: true, min: 5, max:  99})}
          />
          {errors.nomerazao && <span>Preencha o campo</span>}

          <input
            name="cpfcnpj"
            placeholder="Insira seu CPF"
            ref={register({ required: true, min:11, max: 14})}
          />
          {errors.cpfcnpj && <span>Preencha o campo</span>}
          
          <span>Sexo: </span>
          <select name="sexo" ref={register()}>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </>
      )
    }
    
    const CNPJ = () => {
      return (
        <>
          <input
            name="nomerazao"
            placeholder="Insira sua Razão Social"
            ref={register({ required: true, min:5, max: 99 })}
          />
          {errors.nomerazao && <span>Preencha o campo</span>}

          <input
            name="nomefantasia"
            placeholder="Insira o Nome Fantasia"
            ref={register({ min:5, max: 40 })}
          />
          {errors.nomerazao && <span>Preencha o campo</span>}

          <input
            name="cpfcnpj"
            placeholder="Insira seu CNPJ"
            ref={register({ required: true, min:11, max: 14})}
          />
          {errors.cpfcnpj && <span>Preencha o campo</span>}
        </>
      )
    }

    return (
        <>
          <div>
            <span>Cadastrar como: </span>
            
            <div className="buttonContainer">
              <button value="F" onClick={e => setTipo(e.target.value)}>Fisica</button>
              <button value="J" onClick={e => setTipo(e.target.value)}>Juridica</button>
            </div>
          </div>

          {tipo === "" ? "" : 

          <form onSubmit={handleSubmit(handleRegister)}>
          {tipo === "F" ? <CPF /> :
          tipo === "J" ? <CNPJ /> 
          : ""
          }
          
          <input
            name="password"
            placeholder="Insira sua senha"
            type="password"
            ref={register({ required: true, min: 6, max: 60 })}
          />
          {errors.password && <span>Preencha o campo</span>}

          <input
            name="email"
            type="email" 
            placeholder="Insira seu email"
            ref={register({ required: true, min: 5, max: 50})}
          />
          {errors.email && <span>Preencha o campo</span>}

          <input
            name="endereco" 
            placeholder="Insira o endereço"
            ref={register({ required: true, min: 5, max: 50 })}
          />
          {errors.endereco && <span>Preencha o campo</span>}

          <input
            name="nroendereco"
            placeholder="N° Endereço"
            ref={register({ required: true, max: 7 })}
          />
          {errors.nroendereco && <span>Preencha o campo</span>}

          <input 
            name="bairro"
            placeholder="Insira o Bairro"
            ref={register({ required: true, min: 2, max: 20 })}
          />
          {errors.bairro && <span>Preencha o campo</span>}

          <input
            name="cidade"
            placeholder="Insira a Cidade"
            ref={register({ required: true, min: 2, max: 20 })}
          />
          {errors.cidade && <span>Preencha o campo</span>}

          <input
            name="uf" 
            placeholder="Insira o UF"
            ref={register({ required: true, max: 2 })}
          />
          {errors.uf && <span>Preencha o campo</span>}

          <input
            name="cep" 
            placeholder="Insira o CEP"
            ref={register({ required: true, max: 9 })}
          />
          {errors.cep && <span>Preencha o campo</span>}

          <input
            name="foneddd"
            placeholder="Insira o DDD"
            ref={register({ max: 2 })}
          />
          {errors.ddd && <span>Preencha o campo</span>}

          <input
            name="fonenro" 
            placeholder="Insira seu telefone"
            ref={register({ max: 10 })}
          />
          {errors.telefone && <span>Preencha o campo</span>}

          <input type="submit" className="botao-submit" value={"Cadastrar"}></input>
        </form>}
      </>
    );
  }
  
  return (
    <div className="formulario">
      <h1>Registro</h1>

      <Render />
    

      <Link to="/">Voltar ao Login</Link>
      <ToastContainer />
    </div>
  );
}