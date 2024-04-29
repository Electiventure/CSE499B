// predictController.js
const { predict: predictLSTMModel } = require('../models/lstmModel');
const { predict: predictGRUModel } = require('../models/gruModel');

// Controller functions for making predictions
const predictLSTMModelController = async (req, res) => {
  try {
    const predictions = await predictLSTMModel(req.body.dataset);
    res.status(200).json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'Error predicting using LSTM model' });
  }
};

const predictGRUModelController = async (req, res) => {
  try {
    const predictions = await predictGRUModel(req.body.dataset);
    res.status(200).json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'Error predicting using GRU model' });
  }
};

module.exports = {
  predictLSTMModel: predictLSTMModelController,
  predictGRUModel: predictGRUModelController
};
