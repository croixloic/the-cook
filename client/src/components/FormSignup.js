import React, { useState } from "react";
import axios from "axios";

const FormSignup = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cook, setCook] = useState(false)
  const handleSignup = (e) => {
    e.preventDefault();

    if( !pseudo || !email || !password) {
        alert("veuillez remplir tous les champs du formulaire")
    }
    else {
        axios.post(`${process.env.REACT_APP_API_URL}/user/signup`,{
            pseudo,
            email,
            password,
            cook,
        })
        .then ((res) => {
          axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
            email,
            password,
          })
          .then((res) => {
            localStorage.token = res.data.token;
            window.location="/";
          })
          .catch ((err) => console.log(err))
        })
        .catch((err) => console.log(err))
        
    }
  };
  return (
    <form onSubmit={handleSignup}>
      <label htmlFor="pseudo">Pseudo</label>
      <input
        type="text"
        name="pseudo"
        className="input_signup"
        onChange={(e) => setPseudo(e.target.value)}
        value={pseudo}
        placeholder="Entrer un pseudo"
      />

      <label htmlFor="email">email</label>
      <input
        type="texte"
        name="email"
        className="input_signup"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Entrer un email"
      />

      <label htmlFor="password">password</label>
      <input
        type="password"
        name="password"
        className="input_signup"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="mot de passe"
      />
      {/* <div className="password error">
        <span>{error}</span>
      </div> */}
      <br/>

      <label htmlFor="cook">Restaurateur</label>
      <input 
      type="checkbox"
      name="cook"
      className="input_signup"
      onChange={(e) => setCook(true)}
      value={cook}
      />
      <span>cocher si vous étes un restaurateur</span>
      <input type="submit" className="submit"  value="S'inscrire"/>
    </form>
  );
};

export default FormSignup;
