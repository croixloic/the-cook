const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers')
const auth = require('../middleware/auth')

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/allusers', userController.getAllUser)
router.get('/profil', auth, userController.getOneUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', auth, userController.deleteUser)

module.exports= router;