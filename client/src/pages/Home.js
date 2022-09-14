import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ReadRestaurants from '../components/ReadRestaurants';


const Home = () => {
    const [UserCo, setUserCo]= useState();
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.token){
            navigate("/login")
        }
        axios.get(`${process.env.REACT_APP_API_URL}/user/profil`)
        .then((res)=> setUserCo(res.data))
        .catch((err)=> console.log(err))
    },[navigate]);
        return (
        <div className='home-page'>
            <Header />
            <div className='presentation'>
            <h2>Mettre son restaurant en ligne n'a jamais été aussi simple</h2>
            <p>Accéder à l'ensemble des restaurants et leurs menus près de chez vous et si vous aimez mettez votre coeur </p>
            </div >
                
            <ReadRestaurants user={UserCo} />
        </div>
    );
};

export default Home;