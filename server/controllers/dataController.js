// dataController.js
const { fetchStockData } = require('../models/stockDataModel');

// Controller function for fetching stock data
const fetchStockDataController = async (req, res) => {
  try {
    const stockData = await fetchStockData();
    res.status(200).json(stockData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stock data' });
  }
};

module.exports = {
  fetchStockData: fetchStockDataController
};
