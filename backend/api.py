from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from model_training import build_model, load_model_and_scaler, train_on_batch, predict_on_batch

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model config
window_in, window_out, n_additional_features = 24, 24, 5
model, scaler = load_model_and_scaler(window_in, window_out, n_additional_features)

@app.post("/train")
async def train(request: Request):
    global model, scaler
    data = await request.json()
    X = np.array(data['X'])  # shape: (batch, window_in, 1)
    X_add = np.array(data['X_add'])  # shape: (batch, n_additional_features)
    y = np.array(data['y'])  # shape: (batch, window_out)
    model, scaler = train_on_batch(model, scaler, X, X_add, y)
    return {"status": "trained"}

@app.post("/predict")
async def predict(request: Request):
    data = await request.json()
    X = np.array(data['X'])  # shape: (batch, window_in, 1)
    X_add = np.array(data['X_add'])  # shape: (batch, n_additional_features)
    pred = predict_on_batch(model, scaler, X, X_add)
    return {"prediction": pred.tolist()}
