import React from 'react';
import FormSignup from '../components/FormSignup';
import Header from '../components/Header';

const Signup = () => {
    return (
        <>
           <div className='soustitre'>
            <Header />
            <h2>Inscription</h2>
            <FormSignup />
            </div> 
        </>
    );
};

export default Signup;