// Graph.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const Graph = ({ plotUrl, stockData }) => {
  return (
    <div>
      <h2>Stock Price Graph</h2>
      {stockData ? (
        <Line
          data={{
            labels: stockData.map(data => data.date),
            datasets: [
              {
                label: 'Stock Price',
                data: stockData.map(data => data.price),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }
            ]
          }}
          options={{
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day'
                }
              }
            }
          }}
        />
      ) : (
        <p>Loading stock data...</p>
      )}
    </div>
  );
};

export default Graph;
