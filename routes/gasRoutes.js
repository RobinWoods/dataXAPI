const express = require('express');
const router = express.Router();
const gasController = require('../controllers/gasController');


router.get('/', gasController.getAllGas);

router.get('/:nomGaz', gasController.getGasByName);

router.post('/', gasController.createGas);


module.exports = router;