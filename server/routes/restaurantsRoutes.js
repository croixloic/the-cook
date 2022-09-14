const express = require('express')
const router = express.Router()
const restaurantsControllers= require('../controllers/restaurantsControllers')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.get('/restaurants',  restaurantsControllers.getAllRestaurants)
router.get('/:id', restaurantsControllers.getOneRestaurants)
router.post('/restaurants', auth, multer, restaurantsControllers.createRestaurant)
router.put('/:id', auth, restaurantsControllers.modifyRestaurants)
router.delete('/:id', auth, restaurantsControllers.deleteRestaurant)

module.exports = router