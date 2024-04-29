// stockDataModel.js
const fs = require('fs').promises;

const fetchStockData = async () => {
  try {
    // Read the CSV file containing stock data
    const csvData = await fs.readFile('DutchBanglaBankFinbert.csv', 'utf-8');
    const rows = csvData.split('\n').map(row => row.split(','));

    // Parse the CSV data and extract relevant information
    const stockData = rows.slice(1).map(row => ({
      Date: row[0],
      Price: parseFloat(row[2]),
      Open: parseFloat(row[3]),
      High: parseFloat(row[4]),
      Low: parseFloat(row[5]),
      Volume: parseFloat(row[6])
    }));

    return stockData;
  } catch (error) {
    throw new Error('Error fetching stock data');
  }
};

module.exports = {
  fetchStockData
};
