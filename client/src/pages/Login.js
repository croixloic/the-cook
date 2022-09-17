import React from 'react';
import FormLogin from '../components/FormLogin';
import Header from '../components/Header';

const Login = () => {
    return (
        <div className='soustitre'>
            <Header />
            <h2>Connexion</h2>
            <FormLogin />
        </div>
    );
};

export default Login;