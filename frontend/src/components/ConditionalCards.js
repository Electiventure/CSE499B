// ConditionalCards.js
import React from 'react';

const ConditionalCards = ({ predictions }) => {
  return (
    <div>
      {predictions && (
        <div>
          <h2>Prediction Details</h2>
          {predictions.map((prediction, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <p>Date: {prediction.date}</p>
              <p>Predicted Price: {prediction.predictedPrice}</p>
              <p>Actual Price: {prediction.actualPrice}</p>
              <p>Sentiment: {prediction.sentiment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConditionalCards;
