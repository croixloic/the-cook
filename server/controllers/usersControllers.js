const express = require('express');
 const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const passwordValidator = require('password-validator');
const db = require('../db'); 
const User = db.users;

const schema = new passwordValidator();
  schema
  .is().min(8)                                    
  .is().max(100)  
  .has().uppercase()                                                        
  .has().lowercase()                              
  .has().digits(2)                                
  .has().not().spaces()                           
  .is().not().oneOf(['Passw0rd', 'Password123']); 


exports.signup= (req, res, next) => {
    if(!schema.validate(req.body.password)) {
        return res.status(400).json({ message: "votre mot de passe doit contenir au minimum 8 caractère, débuté par une majuscule,  contenir au moins 2 chiffres, pas d'espace "})  
    }
    else {      
            bcrypt.hash(req.body.password, 10)
            .then((hash) => {
             const user = { 
                 pseudo : req.body.pseudo,
                 email: req.body.email,
                 admin: false,
                 cook: req.body.cook,
                 password: hash,
             };
             User.create(user)
             .then(()=>res.status(201).json({ message: " Bravo compte crée  !" })) 
             .catch((error) =>{
                 console.log(error);
                 res.status(400).json({ error })
             })
             
          })
          .catch(error => {
              const message = `l'utilisateur n'a pas pu être enregistré`
              res.status(404).json({message, data: error})
              console.log(error);
          })
  }
 }

 exports.login = (req, res, next) => {
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;

    User.findOne({ where: { email: loginEmail } })
    .then((user) => {
        if (user == null){
            return res.status(401).json({error: "Utilisateur non trouvé"});
        }
        if (req.body.email == "admin@admin.fr") {
           res.status(200).json({
               userId: user.id,
               token: jwt.sign(
                   { userId: user.id, admin: user.admin},
                   'RANDOM_TOKEN_SECRET',
                   { expiresIn: '24h' }
                   )
                   
               });
        }
        else {
            bcrypt.compare(loginPassword, user.password).then((valid) => {
                if (valid == false ) {
             // Si le mot de passe n'est pas le bon
             return res.status(401).json({ error: "Mot de passe incorrect !" });
           } 
               res.status(200).json({
                   userId: user.id,
                   token: jwt.sign(
                       { userId: user.id },
                       'RANDOM_TOKEN_SECRET',
                       { expiresIn: '24h' }
                       )
                       
                   });
               
       })
       }
       })
       .catch((error) => res.status(500).json({ error}));
   };

exports.getAllUser = (req, res, next) => {
    User.findAll({
    attributes: ["pseudo", "email", "admin", "cook"],})
    .then((users) =>{
        res.status(200).json(users);
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json(error)
    })
};

    exports.getOneUser = (req, res, next) =>{
        User.findOne({
            where: { id: req.auth.userId },
            attributes: ["id","pseudo", "email", "admin", "cook"],})
            .then((user) =>{
                res.status(200).json(user);
            })
            .catch((error)=>{
                console.log(error);
                res.status(500).json(error)
            })
     };
        
    exports.updateUser = (req, res, next) => {  
        const updateProfilUser = {
            pseudo: req.body.pseudo,
            email: req.body.email,
        };
        User.update(updateProfilUser, {where: { id: req.auth.userId }})
        .then(() => {
            console.log(updateProfilUser);
            res.status(200).json({ message: "l'utilisateur est modifié"})
    })
        .catch((error) => res.status(400).json({ error }))
    };

    exports.updateUser = (req, res, next) => {  
        const updateProfilUser = {
            pseudo: req.body.lastName,
            email: req.body.email,
        };
        User.update(updateProfilUser, {where: { id: req.auth.userId }})
        .then(() => {
            console.log(updateProfilUser);
            res.status(200).json({ message: "l'utilisateur est modifié"})
    })
        .catch((error) => res.status(400).json({ error }))
    };

    exports.deleteUser = (req, res, next) =>{
        User.findOne({ where: { id: req.auth.userId }})
        .then((user) => {

            User.destroy({ where: { id: req.auth.userId }})
            .then(() => res.status(200).json({ message: 'utilisateur supprimé !'}))
            .catch((error) => res.status(400).json({ error}))
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error })
        });
        };