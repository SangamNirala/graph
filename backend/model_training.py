import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from keras.models import Model
from keras.layers import LSTM, Dense, Dropout, Bidirectional, Input, concatenate
from keras.losses import MeanSquaredError
import joblib
import os

MODEL_PATH = "lstm_mumbai_temp.keras"
SCALER_PATH = "scaler_mumbai_temp.save"

# Model builder
def build_model(window_in, window_out, n_additional_features):
    temp_input = Input(shape=(window_in, 1), name='temp_input')
    x = Bidirectional(LSTM(128, return_sequences=True))(temp_input)
    x = Dropout(0.3)(x)
    x = Bidirectional(LSTM(64))(x)
    x = Dropout(0.3)(x)
    additional_input = Input(shape=(n_additional_features,), name='additional_input')
    additional_dense = Dense(32, activation='relu')(additional_input)
    additional_dense = Dropout(0.2)(additional_dense)
    merged = concatenate([x, additional_dense])
    merged = Dense(128, activation='relu')(merged)
    merged = Dropout(0.2)(merged)
    output = Dense(window_out)(merged)
    model = Model(inputs=[temp_input, additional_input], outputs=output)
    model.compile(optimizer='adam', loss=MeanSquaredError())
    return model

# Model/scaler loader
def load_model_and_scaler(window_in, window_out, n_additional_features):
    from keras.models import load_model
    if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
        model = load_model(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
    else:
        model = build_model(window_in, window_out, n_additional_features)
        scaler = None
    return model, scaler

# Incremental training
def train_on_batch(model, scaler, X, X_add, y):
    if scaler is None:
        scaler = MinMaxScaler()
        scaler.fit(X.reshape(-1, 1))
        joblib.dump(scaler, SCALER_PATH)
    X_scaled = scaler.transform(X.reshape(-1, 1)).reshape(X.shape)
    y_scaled = scaler.transform(y.reshape(-1, 1)).reshape(y.shape)
    model.fit([X_scaled, X_add], y_scaled, epochs=1, batch_size=32, verbose=0)
    model.save(MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)
    return model, scaler

# Prediction
def predict_on_batch(model, scaler, X, X_add):
    X_scaled = scaler.transform(X.reshape(-1, 1)).reshape(X.shape)
    pred_scaled = model.predict([X_scaled, X_add])
    pred = scaler.inverse_transform(pred_scaled)
    return pred

# (Optional) Feature engineering utility
def prepare_features(df):
    df['hour'] = df['datetime'].dt.hour
    df['dayofweek'] = df['datetime'].dt.dayofweek
    df['month'] = df['datetime'].dt.month
    df['day_of_year'] = df['datetime'].dt.dayofyear
    df['is_weekend'] = df['dayofweek'].isin([5, 6]).astype(int)
    df['hour_sin'] = np.sin(2 * np.pi * df['hour']/24)
    df['hour_cos'] = np.cos(2 * np.pi * df['hour']/24)
    df['day_of_year_sin'] = np.sin(2 * np.pi * df['day_of_year']/365)
    df['day_of_year_cos'] = np.cos(2 * np.pi * df['day_of_year']/365)
    return df 