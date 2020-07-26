const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controllers.js');

router.get('/',controller.get);
router.post('/',controller.post);
router.post('/auth',controller.authenticate);
router.put('/:id',controller.put);
router.delete('/',controller.delete);


module.exports = router; 