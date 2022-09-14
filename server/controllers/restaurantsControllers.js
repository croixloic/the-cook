const express = require('express');
const db = require('../db');
const multer = require('../middleware/multer-config');
const fs = require('fs');
const Restaurant= db.restaurants
const User = db.users

exports.createRestaurant = (req, res, next) => {
    const restaurant = {
        nom: req.body.nom,
        bio: req.body.bio,
        localisation: req.body.localisation,
        images: req.body.files,
        userId: req.auth.userId,

    };
    console.log(req.body);
    if (req.file != undefined) {
        restaurant.images = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename}`;
    }
    Restaurant.create(restaurant)
    .then(() => {
        res.status(201).json({ message: "restaurant à bien été crée"})
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({ err })})
};

exports.getAllRestaurants = (req, res, next) => {
    Restaurant.findAll({
        attributes: ["id","nom", "bio", "localisation", "images", "userId"],})
        .then((restaurants)=> res.status(200).json(restaurants))
        .catch((err)=> {
            console.log(err);
            res.status(500).json({ err })
        })
}

exports.getOneRestaurants = (req, res, next) => {
    Restaurant.findOne({ where: { id: req.params.id } })
    .then((restaurant) => res.status(200).json(restaurant))
    .catch((err) => {
        console.log(err)
        res.status(500).json({ err })
    })

}
exports.modifyRestaurants = (req, res, next) => {
    console.log(req.body);
    Restaurant.findOne({ where: { id: req.params.id }})
    .then ((restaurant) => {

        const restaurantId = req.params.id
        const userId = req.auth.userId
        
        const restaurantObject = req.file ? {
            ...req.body,
            images: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        } : { ...req.body }
        console.log(req.file);
        console.log(req.auth.admin);
        console.log(req.auth.userId);
        console.log(restaurant.userId);
        if(req.auth.admin || req.auth.userId === restaurant.userId){

            Restaurant.update(restaurantObject, {
            where: {
                id: restaurantId,
                
            }
        })
        .then(() => res.status(200).json({ message: 'restaurant modifié avec succès' }))
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Impossible de modifier ce restaurant', error });
        })
    }
    else {
        res.status(400).json({ error: 'Impossible de modifier ce restaurant', error }); 
    }
    })
    .catch(error => res.status(400).json({ error: 'Impossible de modifier ce post', error }));
}

exports.deleteRestaurant = (req, res, next) => {
    Restaurant.findOne({ where: { id: req.params.id}})
    .then((restaurant) => {

        Restaurant.destroy({ where: { id: req.params.id}})
        .then(() => res.status(200).json({ message: 'restaurant supprimé !'}))
        .catch((error) => res.status(400).json({ error}))
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error })
    });
}
