import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';




const CreatePlat = (props) => {
    const [nom, setNom]= useState("")
    const [ingrédients, setIngredients]= useState("")
    const [description, setDescription]= useState("")

    const params = useParams();

    const handleCreate = ((e) => {
        console.log(props);
        e.preventDefault();
        console.log(props);
        axios.post(`${process.env.REACT_APP_API_URL}/plats/plat/` +params.id ,{
            nom,
            ingrédients,
            description,
        })
            .then(() => {
                props.plat()
               e.target.reset()
            })
            .catch((err) => console.log(err))
        })

        
    return (
        <div className='createPlat'>
            <form onSubmit={handleCreate}>

            <label htmlFor='nom'>Nom du plat</label>
            <input 
            type='text'
            name='nom'
            className='input_plat'
            onChange={(e) => setNom(e.target.value)}
            value={nom}
            placeholder= 'Entrer le nom du plat'
            />
            <label htmlFor='ingredients'>Indiquer les ingrédients</label>
            <textarea
            name='ingrédients'
            id='ingrédients'
            placeholder="Inscriver l'ensemble des Ingrédent composent votre plat "
            maxLength={200}
            onChange={(e) => setIngredients(e.target.value)}
            />
            <br/>
            <label htmlFor='description'>Description du plat</label>
            <textarea
            name='description'
            id='description'
            placeholder="description du plat"
            maxLength={200}
            onChange={(e) => setDescription(e.target.value)}
            />
            <input type='submit' value="Envoyer" className='submitRestaurant' />
            
            </form>
        </div>
    );
};

export default CreatePlat;