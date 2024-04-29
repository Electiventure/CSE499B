import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ConditionalCards from './components/ConditionalCards';
import Footer from './components/Footer';
import Graph from './components/Graph';
import Navbar from './components/Navbar';

const App = () => {
  const [dataset, setDataset] = useState('');
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [stockData, setStockData] = useState(null); // Add state for stock data

  // Fetch data and predictions on component mount
  useEffect(() => {
    fetchData('CityBankFinbert.csv', 'GRU'); // Default dataset and model
    fetchPredictions(); // Fetch predictions on component mount
    fetchStockData(); // Fetch stock data on component mount
  }, []);

  const fetchData = async (dataset, model) => {
    try {
      const response = await axios.get(`/api/predict?dataset=${dataset}&model=${model}`);
      // Handle data fetched from API
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPredictions = async () => {
    try {
      const response = await axios.get('/api/predictions'); // Assuming an endpoint to fetch predictions
      setPredictions(response.data);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  const fetchStockData = async () => {
    try {
      const response = await axios.get('/api/stockdata'); // Assuming an endpoint to fetch stock data
      setStockData(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const trainModel = async (modelName) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`/api/train/${modelName}`, { dataset });
      setSuccessMessage(`${modelName.toUpperCase()} model trained successfully`);
    } catch (error) {
      console.error(`Error training ${modelName.toUpperCase()} model:`, error);
      setError(`Error training ${modelName.toUpperCase()} model`);
    }
    setLoading(false);
  };

  const predictModel = async (modelName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`/api/predict/${modelName}`, { dataset });
      setPredictions(response.data);
    } catch (error) {
      console.error(`Error predicting using ${modelName.toUpperCase()} model:`, error);
      setError(`Error predicting using ${modelName.toUpperCase()} model`);
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <Graph plotUrl={predictions ? predictions.plotUrl : ''} stockData={stockData} />
      <ConditionalCards predictions={predictions} />
      <div>
        <h1>Stock Price Prediction</h1>
        <label htmlFor="dataset">Select Dataset:</label>
        <select id="dataset" value={dataset} onChange={(e) => setDataset(e.target.value)}>
          <option value="">Select Dataset</option>
          <option value="CityBankFinbert.csv">City Bank</option>
          <option value="DutchBanglaBankFinbert.csv">Dutch Bangla Bank</option>
        </select>
        <button onClick={() => trainModel('gru')} disabled={loading || !dataset}>Train GRU Model</button>
        <button onClick={() => trainModel('lstm')} disabled={loading || !dataset}>Train LSTM Model</button>
        <button onClick={() => predictModel('gru')} disabled={loading || !dataset}>Predict using GRU Model</button>
        <button onClick={() => predictModel('lstm')} disabled={loading || !dataset}>Predict using LSTM Model</button>
        {loading && <p>Loading...</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default App;
