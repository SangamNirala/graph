# Real-Time Temperature Forecasting (Mumbai)

This project is a full-stack application for real-time temperature forecasting using LSTM neural networks. It features a React frontend with a slider (scroller) that allows you to select a point in time, and a Python FastAPI backend that incrementally trains and predicts temperature using live data windows.

---

## Features

- **Live, Incremental Model Training:**  
  As you move the slider, the backend trains the model on the current window of data and predicts the next 24 hours.
- **Interactive Visualization:**  
  See historical data, current context, and future predictions in real time.
- **Feature Engineering:**  
  Uses time-based and cyclical features for improved forecasting.
- **Easy Data Preparation:**  
  Includes scripts to preprocess your data and generate the required frontend data file.

---

## Project Structure

```
.
├── backend/
│   ├── model_training.py
│   ├── api.py
│   └── ... (other backend files)
├── frontend/
│   ├── public/
│   │   └── data.json
│   └── src/
│       └── App.js
├── Mumbai.csv
├── generate_data_json.py
└── README.md
```
<code_block_to_apply_changes_from>
fastapi
uvicorn
pandas
numpy
scikit-learn
keras
joblib
```

#### b. **Start the backend server**

```bash
uvicorn backend.api:app --reload
```

This will start the FastAPI server at `http://localhost:8000`.

---

### 5. **Set Up the Frontend**

#### a. **Install Node.js dependencies**

```bash
cd frontend
npm install
```

#### b. **Start the frontend**

```bash
npm start
```

This will start the React app at `http://localhost:3000`.

---

## Usage

1. **Open the frontend in your browser:**  
   [http://localhost:3000](http://localhost:3000)

2. **Move the vertical slider:**  
   - The app will:
     - Train the model on the current window (past 24 hours) and its immediate future (next 24 hours).
     - Predict the next 24 hours using the updated model.
     - Update the plots and forecast table in real time.

3. **Simulation Mode:**  
   - Enable "Simulation Mode" to auto-advance the slider and watch the model adapt live.

---

## Logic & Functionality

### **Data Flow**

- **Frontend** loads all temperature and feature data from `data.json`.
- When the slider moves:
  1. **Frontend** sends the current window and its target to `/train` on the backend.
  2. **Backend** incrementally trains the LSTM model on this window.
  3. **Frontend** then sends the current window to `/predict`.
  4. **Backend** returns the forecast for the next 24 hours, which is displayed.

### **Model & Features**

- **Model:**  
  - Bidirectional LSTM with additional dense layers for engineered features.
  - Trained incrementally (online) as you interact.
- **Features:**  
  - Temperature history (last 24 hours)
  - Hour of day, day of week, month, day of year, weekend indicator
  - Cyclical encodings for hour and day of year

### **Why this approach?**

- **Online/Incremental Training:**  
  The model adapts to new data as you scroll, simulating a real-time learning scenario.
- **Live Forecasting:**  
  You see how the model would perform if it only had access to data up to the current point.

---

## Troubleshooting

- **FileNotFoundError:**  
  Make sure `Mumbai.csv` is in the project root.
- **Frontend "Loading..." forever:**  
  Ensure `data.json` exists in `frontend/public/` and is valid JSON.
- **Backend errors:**  
  Check that all dependencies are installed and the backend is running.

---

## Customization

- **To use your own data:**  
  Replace `Mumbai.csv` with your own CSV (matching the expected columns), and re-run `generate_data_json.py`.
- **To change window sizes:**  
  Adjust `WINDOW_IN` and `WINDOW_OUT` in both backend and frontend code.

---

## License

MIT License

---

## Credits

- Built with [React](https://reactjs.org/), [FastAPI](https://fastapi.tiangolo.com/), [Keras](https://keras.io/), and [scikit-learn](https://scikit-learn.org/).
```

---

