import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm }  from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import api from '../../services/api';


export default function Logon() {
    const history = useHistory(); 

    function Render () {
        const { register, handleSubmit, errors } = useForm();

        async function handleLogin(data) {
            try {
                await api.post('/pessoa/login', data)
                    .then(function(response){ 
                        if(response.status === 200) {
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('idPessoa', response.data.id_pessoa);
                            localStorage.setItem('nomerazao', response.data.nomerazao);
                            toast.success("Cadastro encontrado, redirecionando...");
                            setTimeout(() =>{
                                response.data.fisicajuridica === "J"
                                ? history.push('/profile/j')
                                : history.push('profile/f')   
                            }, 1500);
                        }
                    })
            } catch (err) {
                toast.error('CPF / CNPJ ou Senha inválidos, tente novamente !');
            }
        }

        return (
            <>
                <div className="logon-container">
                    <section className="form">

                        <form onSubmit={handleSubmit(handleLogin)}>
                            <h1>Faça seu login</h1>

                            <input 
                                name="cpfcnpj"
                                placeholder="Seu CPF / CNPJ"   
                                type="text"
                                ref={register({ required: true, min:11, max: 14})}
                            />

                            <input 
                                name="password"
                                placeholder="Sua senha"   
                                type="password"
                                ref={register({ required: true, min: 6, max: 60 })}
                            />

                            <input type="submit" className="button" value={"Entrar"}></input>

                            <Link className='back-link' to="/register">
                                Não tenho cadastro
                            </Link>

                            <ToastContainer />
                        </form>
                    </section>
                </div>
            </>
        )

    }

    

    return (
       <Render /> 
    )
}