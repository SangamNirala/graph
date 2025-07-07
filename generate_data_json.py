import pandas as pd
import numpy as np
import json

df = pd.read_csv('Mumbai.csv', parse_dates=['time'])
df = df[['time', 'temperature_2m (°C)']].rename(columns={'time': 'datetime', 'temperature_2m (°C)': 'temperature'})

# Feature engineering
df['hour'] = df['datetime'].dt.hour
df['dayofweek'] = df['datetime'].dt.dayofweek
df['month'] = df['datetime'].dt.month
df['day_of_year'] = df['datetime'].dt.dayofyear
df['is_weekend'] = df['dayofweek'].isin([5, 6]).astype(int)
df['hour_sin'] = np.sin(2 * np.pi * df['hour']/24)
df['hour_cos'] = np.cos(2 * np.pi * df['hour']/24)
df['day_of_year_sin'] = np.sin(2 * np.pi * df['day_of_year']/365)
df['day_of_year_cos'] = np.cos(2 * np.pi * df['day_of_year']/365)

features = np.column_stack([
    df['hour_sin'], df['hour_cos'],
    df['day_of_year_sin'], df['day_of_year_cos'],
    df['is_weekend']
])

out = {
    "temps": df['temperature'].tolist(),
    "features": features.tolist()
}

with open('frontend/public/data.json', 'w') as f:
    json.dump(out, f)
