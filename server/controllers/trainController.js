// trainController.js
const { train: trainLSTMModel } = require('../models/lstmModel');
const { train: trainGRUModel } = require('../models/gruModel');

// Controller functions for training models
const trainLSTMModelController = async (req, res) => {
  try {
    await trainLSTMModel(req.body.dataset);
    res.status(200).json({ message: 'LSTM model trained successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error training LSTM model' });
  }
};

const trainGRUModelController = async (req, res) => {
  try {
    await trainGRUModel(req.body.dataset);
    res.status(200).json({ message: 'GRU model trained successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error training GRU model' });
  }
};

module.exports = {
  trainLSTMModel: trainLSTMModelController,
  trainGRUModel: trainGRUModelController
};
