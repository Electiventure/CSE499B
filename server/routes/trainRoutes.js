// trainRoutes.js
const express = require('express');
const router = express.Router();
const { trainLSTMModel, trainGRUModel } = require('../controllers/trainController');

// Routes for training models
router.post('/train/lstm', trainLSTMModel);
router.post('/train/gru', trainGRUModel);

module.exports = router;
