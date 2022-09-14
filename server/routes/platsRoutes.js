const express = require('express')
const router = express.Router();
const platController = require('../controllers/platsControllers');
const auth = require('../middleware/auth')

router.get('/plats', platController.getAllPlats)
router.get('/:id', platController.getOnePlats)
router.post('/plat/:id', auth, platController.createPlat)
router.put('/:id', auth, platController.modifyPlats )
router.delete('/:id', auth, platController.deletePlat)

module.exports= router
