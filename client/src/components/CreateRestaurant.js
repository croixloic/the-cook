import React, { useState } from 'react';
import axios from 'axios';

const CreateRestaurant = () => {

    const [nom, setNom] = useState("")
    const [bio, setBio] = useState("")
    const [localisation, setLocalisation] = useState("")
    const [images, setImages] = useState()


    const handleFile = (e) => {
        setImages (e.target.files[0])
        console.log(e.target.files[0]);
    }

    const CreateRestaurant = (e) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append ('image', images)
        formData.append ('nom', nom)
        formData.append ('bio', bio)
        formData.append('localisation', localisation)

        if(nom === "" || bio === "" || localisation === ""){
            alert("veuillez remplir les champ")
        } else {
            axios.post(`${process.env.REACT_APP_API_URL}/restaurants/restaurants`, formData)
            .then(() => {
                setLocalisation("")
                setBio("")
                setNom("")
                setImages()
                e.target.reset()
            })
        }
    }
    return (
        <form onSubmit={CreateRestaurant}>
            <label htmlFor='nom'>Nom de votre restaurant</label>
            <input 
            type="text"
            name='nom'
            className='input_restaurant'
            onChange={(e) => setNom(e.target.value)}
            value={nom}
            placeholder="Entrer le nom du restaurant"
            />
            <br />
            <label htmlFor='bio'>Présentation de votre restaurant</label>
            <textarea
            name='bio'
            id='bio'
            placeholder='Présentation de votre restaurant'
            maxLength={400}
            onChange={(e) => setBio(e.target.value)}
            >
            </textarea>
            <br />
            <label>Localisation du restaurant</label>
            <input 
            type='text'
            name='localisation'
            className='input_restaurant'
            onChange={(e) => setLocalisation(e.target.value)}
            />
            <input type="file" name="images" className="btn" id="images" onChange={(e) => {handleFile(e)}} />

            <input type="submit" value="Envoyer" className='submitRestaurant'/>
        </form>
    );
};

export default CreateRestaurant;