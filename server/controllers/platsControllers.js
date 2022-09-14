const express = require('express');
const db = require('../db');
const multer = require('../middleware/multer-config')
const Plat = db.plats
const User = db.users
const Restaurant = db.restaurants

exports.createPlat = (req, res, next) => {
    const plat = {
        nom: req.body.nom, 
        description: req.body.description,
        ingrédients: req.body.ingrédients,
        userId: req.auth.userId,
        restaurantId: req.params.id
    }
    Plat.create(plat)
    .then(() => {
        res.status(201).json({message: "le plat à bien été crée"})
    })
    .catch((err) => res.status(400).json({ err}))
};

exports.getAllPlats = (req, res, next) => {
    Plat.findAll({
        attributes: ["id", "nom", "description", "ingrédients"],})
        .then((plat) => res.status(200).json(plat))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err })
        })
}

exports.getOnePlats = (req, res, next) => {
    Plat.findOne({ where: { id: req.params.id }})
    .then((plat) => res.status(200).json(plat))
    .catch((err)=> {
        console.log(err);
        res.status(500).json({ err })
    })
}

exports.modifyPlats = (req, res, next) => {
    const id        = req.params.id
     const userId    = req.auth.userId

    const updatePlat = {
        nom: req.body.nom,
        description: req.body.description,
        ingrédients: req.body.ingrédients,
    }

    Plat.update(updatePlat, {
        where: {
            id:         id,
           
             userId:     userId
        }
    })
    .then(() => res.status(200).json({ message: 'Plat modifié' }))
    .catch(error => {
        console.log(error);
        res.status(400).json({ message: 'Impossible de modifier ce Plat', error })
    })
}

exports.deletePlat = (req, res, next) => {
    Plat.findOne({ where: { id: req.params.id}})
    .then((plat) => {

        Plat.destroy({ where: { id: req.params.id}})
        .then(() => res.status(200).json({ message: 'plat supprimé !'}))
        .catch((error) => res.status(400).json({ error}))
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error })
    });
}