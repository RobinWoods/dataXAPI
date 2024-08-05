const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middleware/auth');

router.get('/', reportController.getAllYearOfReports);

router.get('/:startDate/:finishDate/:formuleGaz', reportController.orderReportByGasAndTime);

router.post('/', auth.authenticateToken, auth.checkPoste('Agent administratif'),reportController.createReport);


module.exports = router;