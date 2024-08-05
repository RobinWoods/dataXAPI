const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');

router.get('/', agencyController.findAllAgencies);

router.get('/:city', agencyController.findAllCities);

module.exports = router;