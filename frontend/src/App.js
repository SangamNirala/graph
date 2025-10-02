import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Slider, Switch, FormControlLabel, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Plot from 'react-plotly.js';
import axios from 'axios';

// --- Configuration ---
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/predict`;
const WINDOW_IN = 24;
const WINDOW_OUT = 24;
const MIN_IDX = WINDOW_IN;
const MAX_IDX = 890 - WINDOW_OUT - 1; // Adjust if your data size changes
const DEBOUNCE_DELAY = 50; // ms

// --- Custom Hook for Debouncing ---
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

function App() {
  const [sliderIdx, setSliderIdx] = useState(MIN_IDX);
  const debouncedIdx = useDebounce(sliderIdx, DEBOUNCE_DELAY);
  
  const [data, setData] = useState(null);
  const [confidence, setConfidence] = useState(false);
  const [auto, setAuto] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const intervalRef = useRef();

  const [allTemps, setAllTemps] = useState([]);
  const [allAdditionalFeatures, setAllAdditionalFeatures] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(json => {
        setAllTemps(json.temps);
        setAllAdditionalFeatures(json.features);
        console.log('✅ Data loaded successfully:', json.temps.length, 'temperature records');
      })
      .catch(error => {
        console.error('❌ Failed to load data.json:', error);
      });
  }, []);

  // Assume you have allTemps and allAdditionalFeatures loaded in your state or props
  // allTemps: array of all temperature values
  // allAdditionalFeatures: array of all additional feature arrays (length = n_additional_features)

  const handleSliderChange = async (newIdx) => {
    if (allTemps.length === 0 || allAdditionalFeatures.length === 0) return;
    setSliderIdx(newIdx);

    const windowIn = 24;
    const windowOut = 24;
    const X = allTemps.slice(newIdx, newIdx + windowIn);
    const X_add = [allAdditionalFeatures[newIdx + windowIn - 1]];
    const y = allTemps.slice(newIdx + windowIn, newIdx + windowIn + windowOut);

    if (X.length === windowIn && y.length === windowOut) {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/train`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          X: [X.map((v) => [v])],
          X_add: X_add,
          y: [y],
        }),
      });
    }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        X: [X.map((v) => [v])],
        X_add: X_add,
      }),
    });
    const result = await response.json();
    setData(result);
  };

  // Fetch data only when the debounced index changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Fetching prediction data for idx:', debouncedIdx, 'API_URL:', API_URL);
        const res = await axios.post(API_URL, { idx: debouncedIdx, confidence });
        console.log('✅ Prediction data received:', res.data.current_time);
        setData(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch prediction data:", error);
      }
    };
    fetchData();
  }, [debouncedIdx, confidence]);

  // Handle auto-simulation mode
  useEffect(() => {
    if (auto) {
      intervalRef.current = setInterval(() => {
        setSliderIdx(prev => {
          if (prev < MAX_IDX) return prev + 1;
          setAuto(false);
          return prev;
        });
      }, speed);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [auto, speed]);
  
  if (
    !data ||
    !data.history_temps || !Array.isArray(data.history_temps) ||
    !data.history_times || !Array.isArray(data.history_times) ||
    !data.recent_temps || !Array.isArray(data.recent_temps) ||
    !data.recent_times || !Array.isArray(data.recent_times) ||
    !data.future_times || !Array.isArray(data.future_times) ||
    !data.forecast || !Array.isArray(data.forecast) ||
    allTemps.length === 0 ||
    allAdditionalFeatures.length === 0
  ) {
    return <div style={{display:'flex', justifyContent:'center', alignItems:'center', height: '100vh'}}>Loading...</div>;
  }

  const {
    history_times = [],
    history_temps = [],
    current_time = '',
    recent_times = [],
    recent_temps = [],
    future_times = [],
    forecast = []
  } = data || {};

  // --- Create Shapes for Plotly ---
  // The dotted line connecting the two plots is simulated by drawing
  // a shape from the edge of one plot to the edge of the other.
  const connectingShapes = [
    // Line on the historical plot, pointing right
    {
        type: 'line',
        x0: current_time, y0: history_temps[history_temps.length - 1],
        x1: history_times[history_times.length -1], y1: history_temps[history_temps.length - 1],
        xref: 'x', yref: 'y',
        line: { color: '#1976d2', width: 2.5, dash: 'dot' }
    },
    // Line on the forecast plot, pointing left
    {
        type: 'line',
        x0: recent_times[recent_times.length - 1], y0: recent_temps[recent_temps.length - 1],
        x1: future_times[0], y1: recent_temps[recent_temps.length-1],
        xref: 'x', yref: 'y',
        line: { color: '#1976d2', width: 2.5, dash: 'dot' }
    }
  ];

  return (
    <Box sx={{ p: 0, minHeight: '100vh', bgcolor: '#f4f6fa' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1, pt: 3, pb: 2 }}>
        Real-Time Temperature Forecasting (Mumbai)
      </Typography>

      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {/* Historical Plot */}
        <Grid item xs={12} md={5}>
          <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" align="center" sx={{ fontWeight: 600, mb: 1 }}>Historical Data</Typography>
            <Plot
              data={[
                { x: history_times, y: history_temps, type: 'scatter', mode: 'lines', name: 'Historical', line: { color: 'blue' } },
                { x: [current_time, current_time], y: [Math.min(...history_temps), Math.max(...history_temps)], type: 'scatter', mode: 'lines', name: 'Current', line: { color: 'red', dash: 'dash' } }
              ]}
              layout={{
                width: 480, height: 340,
                margin: { l: 50, r: 20, t: 30, b: 40 },
                xaxis: { title: 'Time' }, yaxis: { title: 'Temperature (°C)' },
                hovermode: 'x unified', shapes: [connectingShapes[0]],
              }}
              config={{ displayModeBar: false }}
            />
          </Paper>
        </Grid>

        {/* Vertical Slider */}
        <Grid item xs={12} md={2}>
          <Paper elevation={4} sx={{ p: 2, borderRadius: 3, height: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography align="center" sx={{ fontWeight: 600, mb: 1, color: '#1976d2' }}>Current<br />Time<br />Selector</Typography>
            <Box sx={{ height: 250, display: 'flex' }}>
              <Slider
                orientation="vertical"
                min={MIN_IDX} max={MAX_IDX}
                value={sliderIdx}
                onChange={(_, v) => handleSliderChange(v)}
                sx={{
                  color: '#1976d2',
                  '& .MuiSlider-thumb': { width: 28, height: 28, bgcolor: '#fff', border: '3px solid currentColor' },
                }}
                disabled={auto}
              />
            </Box>
            <Typography sx={{ mt: 2, fontWeight: 500, color: '#1976d2' }}>{current_time}</Typography>
          </Paper>
        </Grid>

        {/* Forecast Plot */}
        <Grid item xs={12} md={5}>
          <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" align="center" sx={{ fontWeight: 600, mb: 1 }}>24-Hour Forecast</Typography>
            <Plot
              data={[
                { x: recent_times, y: recent_temps, type: 'scatter', mode: 'lines', name: 'Historical', line: { color: 'blue' } },
                { x: future_times, y: forecast, type: 'scatter', mode: 'lines', name: 'Forecast', line: { color: 'red', dash: 'dash' } },
                ...(confidence && data.lower ? [
                  { x: future_times, y: data.upper, type: 'scatter', mode: 'lines', fill: null, line: { color: 'rgba(255,0,0,0)' }, showlegend: false },
                  { x: future_times, y: data.lower, type: 'scatter', mode: 'lines', fill: 'tonexty', fillcolor: 'rgba(255,0,0,0.2)', line: { color: 'rgba(255,0,0,0)' }, name: '95% Confidence'}
                ] : [])
              ]}
              layout={{
                width: 480, height: 340,
                margin: { l: 50, r: 20, t: 30, b: 40 },
                xaxis: { title: 'Time' }, yaxis: { title: 'Temperature (°C)' },
                hovermode: 'x unified', shapes: [connectingShapes[1]],
              }}
              config={{ displayModeBar: false }}
            />
          </Paper>
        </Grid>
      </Grid>
      
      {/* Controls */}
      <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}>
        <FormControlLabel control={<Switch checked={confidence} onChange={e => setConfidence(e.target.checked)} />} label="Show Confidence Interval" />
        <FormControlLabel control={<Switch checked={auto} onChange={e => setAuto(e.target.checked)} />} label="Simulation Mode" />
        {auto && (
          <Box sx={{ width: 200 }}>
            <Typography>Speed (ms/update)</Typography>
            <Slider min={100} max={2000} step={100} value={speed} onChange={(_, v) => setSpeed(v)} valueLabelDisplay="auto" />
          </Box>
        )}
      </Box>

      {/* Forecast Table */}
      <Box sx={{ mt: 4, maxWidth: 1100, mx: 'auto', pb: 4 }}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 600, mb: 1 }}>Detailed Forecast Data</Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: 'bold'}}>Time</TableCell>
                <TableCell sx={{fontWeight: 'bold'}}>Forecast (°C)</TableCell>
                {confidence && data.lower && <>
                  <TableCell sx={{fontWeight: 'bold'}}>Lower 95%</TableCell>
                  <TableCell sx={{fontWeight: 'bold'}}>Upper 95%</TableCell>
                </>}
              </TableRow>
            </TableHead>
            <TableBody>
              {future_times.map((t, i) => (
                <TableRow key={t} hover>
                  <TableCell>{t}</TableCell>
                  <TableCell>{forecast[i].toFixed(2)}</TableCell>
                  {confidence && data.lower && <>
                    <TableCell>{data.lower[i].toFixed(2)}</TableCell>
                    <TableCell>{data.upper[i].toFixed(2)}</TableCell>
                  </>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default App;
