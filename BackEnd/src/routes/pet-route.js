const express = require('express');
const router = express.Router();
const controller = require('../controllers/pet-controllers.js');

router.get('/',controller.get);
router.post('/owner',controller.getByOwnerId);
router.post('/',controller.post);
router.put('/:id',controller.put);
router.delete('/:id',controller.delete);


module.exports = router; 