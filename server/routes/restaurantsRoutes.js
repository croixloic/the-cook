const express = require('express')
const router = express.Router()
const restaurantsControllers= require('../controllers/restaurantsControllers')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.get('/restaurants',  restaurantsControllers.getAllRestaurants)
router.get('/:id', restaurantsControllers.getOneRestaurants)
router.get('restaurants/like/:id', auth, restaurantsControllers.allLike )
router.post('/restaurants', auth, multer, restaurantsControllers.createRestaurant)
router.post('/restaurants/like/:id',auth, restaurantsControllers.likeRestaurant)
router.put('/:id', auth, restaurantsControllers.modifyRestaurants)
router.delete('/:id', auth, restaurantsControllers.deleteRestaurant)

module.exports = router