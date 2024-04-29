// predictRoutes.js
const express = require('express');
const router = express.Router();
const { predictLSTMModel, predictGRUModel } = require('../controllers/predictController');

// Routes for making predictions
router.post('/predict/lstm', predictLSTMModel);
router.post('/predict/gru', predictGRUModel);

module.exports = router;
