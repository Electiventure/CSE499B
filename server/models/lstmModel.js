const { LSTM } = require('tensorflow');
const { MinMaxScaler } = require('sklearn');
const { mean_squared_error } = require('sklearn.metrics');
const { train_test_split } = require('sklearn.model_selection');

// Load the dataset
const df = require('../data/CityBankFinbert.csv');

// Preprocess data
df['Date'] = pd.to_datetime(df['Date'], dayfirst=True); // Ensure Date column is in datetime format
df['Vol.'] = df['Vol.'].replace('[KMB]+$', '', regex=True).astype(float) * df['Vol.'].str.extract(r'[\d\.]+([KMB]+)', expand=False).fillna(1).replace(['K','M', 'B'], [10**3, 10**6, 10**9]).astype(int);

// Select relevant features for modeling
const df_filtered = df[['Open', 'Price', 'High', 'Low', 'Vol.']];

// Normalize data
const scaler = MinMaxScaler();
const scaled_data = scaler.fit_transform(df_filtered);

// Define a function to create sequences for LSTM
const create_sequences = (data, n_steps) => {
    const X = [];
    const y = [];
    for (let i = 0; i < data.length - n_steps; i++) {
        X.push(data.slice(i, i + n_steps));
        y.push(data[i + n_steps][0]); // Predicting the 'Open' price
    }
    return [X, y];
};

// Set number of time steps for LSTM
const n_steps = 10;
const [X, y] = create_sequences(scaled_data, n_steps);

// Split data into train and test sets
const [X_train, X_test, y_train, y_test] = train_test_split(X, y, test_size=0.2, random_state=42);

// Build and train LSTM model
const model = new Sequential([
    LSTM(50, return_sequences=true, input_shape=(X_train.shape[1], X_train.shape[2])),
    LSTM(50, return_sequences=false),
    Dense(1)
]);
model.compile(optimizer='adam', loss='mean_squared_error');
model.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.1, verbose=1);

// Make predictions
const y_pred = model.predict(X_test);

// Inverse transform predictions and actual values to original scale
const y_pred_inv = scaler.inverse_transform(y_pred.reshape(-1, 1)).flatten();
const y_test_inv = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten();

// Calculate metrics
const mae = mean_absolute_error(y_test_inv, y_pred_inv);
const mse = mean_squared_error(y_test_inv, y_pred_inv);
const rmse = math.sqrt(mse);
const r2 = r2_score(y_test_inv, y_pred_inv);

module.exports = {
    model,
    metrics: {
        mae,
        mse,
        rmse,
        r2
    }
};
