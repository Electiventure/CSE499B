// Plot.js
import React from 'react';

const Plot = ({ plotUrl, neutralCount, positiveCount, negativeCount }) => {
  return (
    <div id="plotContainer">
      <img src={`data:image/png;base64,${plotUrl}`} alt="Predicted vs. Actual Prices" />
      <div id="sentimentCounts">
        <h2>Sentiment Counts:</h2>
        <ul>
          <li>Neutral: {neutralCount}</li>
          <li>Positive: {positiveCount}</li>
          <li>Negative: {negativeCount}</li>
        </ul>
      </div>
    </div>
  );
};

export default Plot;
