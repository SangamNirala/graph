from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
from keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify ["http://localhost:3000"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load artifacts at startup
model = load_model('lstm_mumbai_temp.keras')
scaler = joblib.load('scaler_mumbai_temp.save')
df = pd.read_csv('Mumbai.csv', parse_dates=['time'])
df = df[['time', 'temperature_2m (°C)']].rename(columns={'time': 'datetime', 'temperature_2m (°C)': 'temperature'})
df['hour'] = df['datetime'].dt.hour
df['dayofweek'] = df['datetime'].dt.dayofweek
df['is_weekend'] = df['dayofweek'].isin([5, 6]).astype(int)
df['day_of_year'] = df['datetime'].dt.dayofyear
df['hour_sin'] = np.sin(2 * np.pi * df['hour']/24)
df['hour_cos'] = np.cos(2 * np.pi * df['hour']/24)
df['day_of_year_sin'] = np.sin(2 * np.pi * df['day_of_year']/365)
df['day_of_year_cos'] = np.cos(2 * np.pi * df['day_of_year']/365)

window_in, window_out = 24, 24

@app.get("/api/health")
def health():
    return {"status": "healthy"}

class PredictRequest(BaseModel):
    idx: int
    confidence: bool = False

@app.post('/api/predict')
def predict(req: PredictRequest):
    idx = req.idx
    if idx < window_in or idx > len(df) - window_out - 1:
        return {"error": "Index out of range"}
    input_data = df['temperature'].values[idx-window_in:idx]
    input_scaled = scaler.transform(input_data.reshape(-1, 1)).reshape(1, window_in, 1)
    row = df.iloc[idx]
    additional_features = np.array([
        row['hour_sin'], row['hour_cos'],
        row['day_of_year_sin'], row['day_of_year_cos'],
        row['is_weekend']
    ]).reshape(1, -1)
    if req.confidence:
        n_iterations = 30
        predictions = []
        for _ in range(n_iterations):
            y_pred = model.predict([input_scaled, additional_features], verbose=0)[0]
            predictions.append(y_pred)
        predictions = np.array(predictions)
        y_pred_mean = np.mean(predictions, axis=0)
        y_pred_std = np.std(predictions, axis=0)
        y_pred_mean_denorm = scaler.inverse_transform(y_pred_mean.reshape(-1, 1)).flatten()
        y_pred_upper = scaler.inverse_transform((y_pred_mean + 1.96 * y_pred_std).reshape(-1, 1)).flatten()
        y_pred_lower = scaler.inverse_transform((y_pred_mean - 1.96 * y_pred_std).reshape(-1, 1)).flatten()
        return {
            "forecast": y_pred_mean_denorm.tolist(),
            "lower": y_pred_lower.tolist(),
            "upper": y_pred_upper.tolist(),
            "future_times": pd.date_range(row['datetime'], periods=window_out+1, freq='h')[1:].strftime('%Y-%m-%dT%H:%M').tolist(),
            "current_time": row['datetime'].strftime('%Y-%m-%dT%H:%M'),
            "history_times": df['datetime'][:idx+1].dt.strftime('%Y-%m-%dT%H:%M').tolist(),
            "history_temps": df['temperature'][:idx+1].tolist(),
            "recent_times": df['datetime'][idx-6:idx+1].dt.strftime('%Y-%m-%dT%H:%M').tolist(),
            "recent_temps": df['temperature'][idx-6:idx+1].tolist()
        }
    else:
        y_pred = model.predict([input_scaled, additional_features], verbose=0)[0]
        y_pred_denorm = scaler.inverse_transform(y_pred.reshape(-1, 1)).flatten()
        return {
            "forecast": y_pred_denorm.tolist(),
            "lower": None,
            "upper": None,
            "future_times": pd.date_range(row['datetime'], periods=window_out+1, freq='h')[1:].strftime('%Y-%m-%dT%H:%M').tolist(),
            "current_time": row['datetime'].strftime('%Y-%m-%dT%H:%M'),
            "history_times": df['datetime'][:idx+1].dt.strftime('%Y-%m-%dT%H:%M').tolist(),
            "history_temps": df['temperature'][:idx+1].tolist(),
            "recent_times": df['datetime'][idx-6:idx+1].dt.strftime('%Y-%m-%dT%H:%M').tolist(),
            "recent_temps": df['temperature'][idx-6:idx+1].tolist()
        }