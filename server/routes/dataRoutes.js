// dataRoutes.js
const express = require('express');
const router = express.Router();
const { fetchStockData } = require('../controllers/dataController');

// Route for fetching stock data
router.get('/stockdata', fetchStockData);

module.exports = router;
