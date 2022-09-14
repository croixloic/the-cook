import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    const [iscook, setIscook] = useState(false);
    
    const getOneUser = (() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/profil`)
        .then ((res)=> {
            setIscook(res.data.cook)
            console.log(res.data.cook);
        })
        .catch((err)=> console.log(err))
    })

    useEffect(() => {
        getOneUser();
    },[])       //le lancer si il y a un token
    return (
        <div className='header'>
            <div className='title'>
                <h1>The Cook</h1>
            </div>
            <nav>
                <ul className='navBar'>
                    <NavLink to='/' className={(nav) => (nav.isActive ? 'nav-active' : '')}><li>Accueil</li></NavLink>
                    <NavLink to='/signup' className={(nav) => (nav.isActive ? 'nav-active' : '')}><li>Inscription</li></NavLink>
                    {iscook === true ? <NavLink to='/restaurant' className={(nav) => (nav.isActive ? 'nav-active' : '')}><li>Mon Restaurant</li></NavLink>:null}
                    {!localStorage.token ? <NavLink to='/login' className= {(nav) => (nav.isActive ? 'nav-active' : '')}><li>Connexion</li></NavLink>
                    :<button onClick={() => { logout()}}>Déconnexion</button>}
                </ul>
            </nav>
            
        </div>
    );
};

export default Header;