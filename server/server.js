const express = require('express');
const bodyParser = require('body-parser');
const gruModel = require('./models/gruModel'); // Import GRU model
const lstmModel = require('./models/lstmModel'); // Import LSTM model

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Train GRU model
app.post('/api/train/gru', (req, res) => {
  const { dataset } = req.body;
  gruModel.train(dataset)
    .then(() => res.status(200).send('GRU model trained successfully'))
    .catch(err => {
      console.error('Error training GRU model:', err);
      res.status(500).send('Error training GRU model');
    });
});

// Train LSTM model
app.post('/api/train/lstm', (req, res) => {
  const { dataset } = req.body;
  lstmModel.train(dataset)
    .then(() => res.status(200).send('LSTM model trained successfully'))
    .catch(err => {
      console.error('Error training LSTM model:', err);
      res.status(500).send('Error training LSTM model');
    });
});

// Predict using GRU model
app.post('/api/predict/gru', (req, res) => {
  const { dataset } = req.body;
  gruModel.predict(dataset)
    .then(predictions => res.json(predictions))
    .catch(err => {
      console.error('Error predicting using GRU model:', err);
      res.status(500).send('Error predicting using GRU model');
    });
});

// Predict using LSTM model
app.post('/api/predict/lstm', (req, res) => {
  const { dataset } = req.body;
  lstmModel.predict(dataset)
    .then(predictions => res.json(predictions))
    .catch(err => {
      console.error('Error predicting using LSTM model:', err);
      res.status(500).send('Error predicting using LSTM model');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
