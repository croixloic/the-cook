import React, { useState } from 'react';
import axios from 'axios';

const FormLogin = () => {

    const [email, setEmail]= useState("")
    const [password, setPassword] = useState("")

    const handlelogin = (e) => {
        e.preventDefault();
        if(!email || !password) {
            alert("veuillez remplir tous les champs du formulaire")
        }
        else {
            axios.post(`${process.env.REACT_APP_API_URL}/user/login`,{
                email,
                password,
            })
            .then((res) =>{
                console.log("connexion faite");
                localStorage.token = res.data.token;
                  window.location = '/'
            })
            .catch((err)=> {
                console.log(err);
                // mette le state de l'erreur
            })
        }
    }

    return (
        <form onSubmit={handlelogin}>
            <label htmlFor='email'>email</label>
            <input 
            type='text'
            name='email'
            className='input_signup'
            onChange={(e) => setEmail(e.target.value)}
            value= {email}
            placeholder= "Entrer votre email"
            />

            <label htmlFor='password'>Mot de passe </label>
            <input 
            type='password'
            name='password'
            className='input_login'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder= "Entrer votre mot de passe"
            />

            <input type='submit' className='submit' value='Se connecter' />
        </form>
    );
};

export default FormLogin;