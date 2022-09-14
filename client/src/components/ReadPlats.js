import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import CreatePlat from './CreatePlat';

const ReadPlats = () => {

    const [restaurant, setRestaurants] = useState({})
    const [userCo, setUserCo] = useState()

    const params = useParams();
    const GetUser = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/profil`)
        .then((res)=> { 
            setUserCo(res.data.id)
            
        })
        .catch((err)=> console.log(err))
    }
    const Plat = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/restaurants/`+params.id)
        .then((restaurant)=> {
            axios.get(`${process.env.REACT_APP_API_URL}/plats/plats`)
            .then((plat) =>{
                setRestaurants({...restaurant.data, plats:plat.data})
                console.log(plat.data);
            })
        })
        .catch((err)=> console.log(err))
    }
    useEffect(() => {
        Plat();
        GetUser();
    },[]);
    return (
        <div>
            <Link to={`/`}>⬅️Précédent</Link>
           <h2>{restaurant.nom}</h2> 
           <img src={restaurant.images} alt='restaurant' />
              {restaurant.plats && restaurant.plats.map((plat) =>(
           <div className='entre' key={plat.id}>
                <em>{plat.nom}</em>
                <p>{plat.description}</p>
                <p>{plat.ingrédients}</p>
           </div>
            ))}  
            {restaurant.userId === userCo ? <CreatePlat to={`/restaurants/${params.id}`} plat = {Plat} /> : null }
        </div>
    );
};

export default ReadPlats;