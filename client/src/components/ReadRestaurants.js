import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReadRestaurants = (props) => {
    
    const [restaurant, setRestaurants] = useState([])
    

    const handleRead = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/restaurants/restaurants`)
        .then ((res) => {
            setRestaurants(res.data)
        })
        .catch((err) => console.log(err))
    }
    useEffect (() => {
        handleRead();
    },[]);

    const handleDelete = (restaurantId) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/restaurants/` +restaurantId)
        .then((res)=> console.log(res))
        .catch((err) => console.log(err))
    }
    return (
        <div className='readRestaurants'>
            <h3>choix des restaurants</h3>
            <div className='restaurants'>
            {restaurant.map((element) => (
                <div className='restaurant' key={element.id}>
                    <figure>
                        <img src={element.images} alt="restaurant" />
                        <br />
                    <em>{element.nom}</em>
                    <br />
                    <p>{element.bio}</p>
                    <br />
                    <span>{element.localisation}</span>
                     <div className='btndelete'> 
                    {props.user &&( element.userId === props.user.id || props.user.admin === true)? 
                    <button
                    onClick={() => handleDelete(element.id)}
                    >Supprimer mon restaurant</button>:null}
                    </div> 
                    <div className='redirection'>
                        <Link to={`/restaurants/${element.id}`}>Afficher plus...</Link>
                    </div> 
                    </figure>
                </div>
            ))}
            </div>
        </div>
    );
};

export default ReadRestaurants;