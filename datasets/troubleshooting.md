# 🔧 Troubleshooting Guide

This guide covers common issues you might encounter while setting up and using the nutrition app datasets.

## 🚨 Quick Fixes

### Issue: "Failed to load environment variables"
```bash
# Check if .env file exists
ls -la backend/.env

# If missing, copy template
cp datasets/api-keys-template.env backend/.env

# Edit and add your API keys
nano backend/.env
```

### Issue: "DEMO_KEY rate limit exceeded"
```bash
# Get your free USDA API key
echo "1. Visit: https://api.data.gov/signup/"
echo "2. Sign up for free account"  
echo "3. Get API key from dashboard"
echo "4. Replace DEMO_KEY in backend/.env"
```

### Issue: "ModuleNotFoundError"
```bash
# Install missing Python packages
pip install -r backend/requirements.txt

# For Node.js dependencies
cd frontend && yarn install
```

## 🔑 API Key Issues

### USDA Food Data Central API

**Problem**: Getting 401 Unauthorized
```python
# Test your API key
import requests
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get('USDA_API_KEY')

response = requests.get(
    f"https://api.nal.usda.gov/fdc/v1/foods/search?query=test&api_key={api_key}"
)
print(f"Status: {response.status_code}")
print(f"Response: {response.text[:200]}")
```

**Solutions**:
- Ensure API key is correct (no extra spaces/quotes)
- Check rate limits: 1,000 requests/hour for free tier
- Use DEMO_KEY for initial testing (limited to 25 requests/hour)

### Spoonacular API

**Problem**: 402 Payment Required
```javascript
// Check your API usage
const response = await fetch(
  `https://api.spoonacular.com/recipes/complexSearch?query=chicken&apiKey=${API_KEY}`
);
console.log('Status:', response.status);
console.log('Headers:', response.headers.get('X-RateLimit-Remaining'));
```

**Solutions**:
- Free tier: 150 requests/day
- Implement caching to reduce API calls
- Use local recipe database for development

### Edamam API

**Problem**: 403 Forbidden
```bash
# Check both APP_ID and APP_KEY
curl -X GET \
  "https://api.edamam.com/api/nutrition-data?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=1%20large%20apple"
```

**Solutions**:
- Both APP_ID and APP_KEY required
- Free tier: 5 requests/minute
- Check URL encoding for special characters

## 🗄️ Database Issues

### MongoDB Connection Problems

**Problem**: "Connection refused"
```python
# Test MongoDB connection
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def test_connection():
    try:
        client = AsyncIOMotorClient(os.environ['MONGO_URL'])
        # Test connection
        await client.admin.command('ping')
        print("MongoDB connection successful!")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")

import asyncio
asyncio.run(test_connection())
```

**Solutions**:
- Check if MongoDB is running: `sudo systemctl status mongod`
- Verify MONGO_URL format: `mongodb://localhost:27017`
- For MongoDB Atlas, ensure IP whitelist includes your IP

### Data Import Issues

**Problem**: "Duplicate key error"
```python
# Clear existing data before import
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def clear_collections():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    db = client[os.environ['DB_NAME']]
    
    # Clear collections
    await db.foods.delete_many({})
    await db.recipes.delete_many({})
    await db.badges.delete_many({})
    print("Collections cleared!")

asyncio.run(clear_collections())
```

**Problem**: "Memory error during bulk import"
```python
# Import in smaller batches
async def batch_import(data, collection, batch_size=1000):
    for i in range(0, len(data), batch_size):
        batch = data[i:i + batch_size]
        await collection.insert_many(batch)
        print(f"Imported batch {i//batch_size + 1}")
```

## 📁 File System Issues

### Dataset Download Problems

**Problem**: "kaggle command not found"
```bash
# Install Kaggle CLI
pip install kaggle

# Set up credentials
mkdir -p ~/.kaggle
# Download kaggle.json from your Kaggle account settings
cp kaggle.json ~/.kaggle/
chmod 600 ~/.kaggle/kaggle.json
```

**Problem**: "Permission denied for dataset download"
```bash
# Check Kaggle authentication
kaggle datasets list

# If error, re-download kaggle.json and check permissions
ls -la ~/.kaggle/kaggle.json
# Should show: -rw------- (600)
```

**Problem**: "Insufficient disk space"
```bash
# Check available space
df -h

# Food-101 dataset is 5GB, ensure you have at least 10GB free
# Consider using external storage or cloud storage
```

### File Path Issues

**Problem**: "FileNotFoundError" when loading datasets
```python
# Use absolute paths
import os
from pathlib import Path

# Get project root directory
PROJECT_ROOT = Path(__file__).parent.parent
DATASETS_DIR = PROJECT_ROOT / "datasets"

# Load data with absolute path
data_file = DATASETS_DIR / "nutrition-data" / "usda-food-samples.json"
if not data_file.exists():
    raise FileNotFoundError(f"Dataset file not found: {data_file}")
```

## 🤖 Machine Learning Issues

### Food Recognition Model Problems

**Problem**: "Model file not found"
```python
# Check if model file exists
import os
from pathlib import Path

model_path = Path("models/food_recognition_model.h5")
if not model_path.exists():
    print("Model not found. You need to train or download a model first.")
    print("See datasets/ml-food-recognition/food-recognition-guide.json")
```

**Problem**: "Out of memory during training"
```python
# Reduce batch size and image size
batch_size = 16  # Reduce from 32
input_size = 128  # Reduce from 224

# Use gradient accumulation for larger effective batch size
from tensorflow.keras import mixed_precision
policy = mixed_precision.Policy('mixed_float16')
mixed_precision.set_global_policy(policy)
```

**Problem**: "Low recognition accuracy"
```python
# Improve model performance
strategies = [
    "Use transfer learning from pre-trained ImageNet models",
    "Augment training data (rotation, brightness, contrast)",
    "Clean training data (remove mislabeled images)",
    "Increase training data with web scraping or user uploads",
    "Ensemble multiple models for better accuracy"
]

for strategy in strategies:
    print(f"- {strategy}")
```

### Camera Integration Issues

**Problem**: "Camera access denied"
```javascript
// Check camera permissions
navigator.permissions.query({name: 'camera'}).then((result) => {
  console.log('Camera permission:', result.state);
  if (result.state === 'denied') {
    alert('Please enable camera access in browser settings');
  }
});

// Request camera with error handling
navigator.mediaDevices.getUserMedia({video: true})
  .then(stream => {
    // Success
    videoElement.srcObject = stream;
  })
  .catch(error => {
    console.error('Camera error:', error);
    if (error.name === 'NotAllowedError') {
      alert('Camera access was denied. Please check browser permissions.');
    } else if (error.name === 'NotFoundError') {
      alert('No camera found on this device.');
    }
  });
```

## 🌐 Network & CORS Issues

### API Connection Problems

**Problem**: "CORS policy blocked request"
```python
# Backend CORS configuration
from starlette.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Problem**: "Connection timeout"
```python
# Increase timeout for slow APIs
import httpx

async with httpx.AsyncClient(timeout=30.0) as client:
    response = await client.get(url)
```

### Frontend API Integration

**Problem**: "Network request failed"
```javascript
// Check environment variables
console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);

// Test API connection
const testConnection = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/`);
    console.log('API connection test:', response.status);
  } catch (error) {
    console.error('API connection failed:', error);
  }
};

testConnection();
```

## 📊 Performance Issues

### Slow API Responses

**Problem**: "API calls taking too long"
```python
# Implement caching
from functools import lru_cache
import asyncio

# Cache USDA API responses
@lru_cache(maxsize=1000)
def cached_food_search(query: str):
    return requests.get(f"https://api.nal.usda.gov/fdc/v1/foods/search?query={query}&api_key={API_KEY}")

# Async batch processing
async def process_foods_batch(food_ids: list):
    tasks = [get_food_details(food_id) for food_id in food_ids]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return results
```

**Problem**: "Database queries slow"
```javascript
// Add database indexes
db.foods.createIndex({ "description": "text" })
db.foods.createIndex({ "fdcId": 1 })
db.foods.createIndex({ "category": 1 })
db.recipes.createIndex({ "title": "text", "ingredients.name": "text" })

// Use aggregation pipeline for complex queries
const pipeline = [
  { $match: { category: "Fruits and Fruit Juices" } },
  { $project: { description: 1, nutrients: 1 } },
  { $limit: 10 }
];
```

### Memory Usage Issues

**Problem**: "High memory consumption"
```python
# Optimize data loading
import pandas as pd

# Use chunking for large datasets
def load_large_dataset(file_path, chunk_size=10000):
    chunks = []
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # Process chunk
        processed_chunk = process_data(chunk)
        chunks.append(processed_chunk)
    return pd.concat(chunks, ignore_index=True)

# Use generators for data iteration
def food_data_generator(file_path):
    with open(file_path, 'r') as f:
        for line in f:
            yield json.loads(line)
```

## 🔄 Data Synchronization Issues

### Offline/Online Sync

**Problem**: "Data conflicts after offline usage"
```javascript
// Implement conflict resolution
const syncData = async () => {
  const localChanges = getLocalChanges();
  const serverData = await fetchServerData();
  
  const conflicts = findConflicts(localChanges, serverData);
  
  if (conflicts.length > 0) {
    // Resolve conflicts (e.g., last-write-wins, user choice)
    const resolved = await resolveConflicts(conflicts);
    await uploadResolvedData(resolved);
  }
  
  await uploadCleanChanges(localChanges.filter(c => !conflicts.includes(c)));
};
```

**Problem**: "Partial data sync failures"
```python
# Implement retry logic with exponential backoff
import asyncio
import random

async def retry_with_backoff(func, max_retries=3):
    for attempt in range(max_retries):
        try:
            return await func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise e
            
            wait_time = (2 ** attempt) + random.uniform(0, 1)
            print(f"Retry {attempt + 1}/{max_retries} in {wait_time:.2f}s")
            await asyncio.sleep(wait_time)
```

## 🧪 Testing & Debugging

### Unit Testing Issues

**Problem**: "Tests failing with database connection"
```python
# Use test database
import pytest
from motor.motor_asyncio import AsyncIOMotorClient

@pytest.fixture
async def test_db():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client.test_nutrition_app
    
    # Clean up after test
    yield db
    
    # Drop test database
    await client.drop_database("test_nutrition_app")
    client.close()
```

### Debugging API Issues

**Problem**: "API returning unexpected results"
```python
# Add detailed logging
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

async def debug_api_call(url, params):
    logger.debug(f"Making API call to: {url}")
    logger.debug(f"Parameters: {params}")
    
    response = await make_api_call(url, params)
    
    logger.debug(f"Response status: {response.status_code}")
    logger.debug(f"Response headers: {dict(response.headers)}")
    logger.debug(f"Response body: {response.text[:500]}...")
    
    return response
```

## 📞 Getting Help

If you're still experiencing issues:

1. **Check the logs**:
   ```bash
   # Backend logs
   tail -f /var/log/supervisor/backend.*.log
   
   # Frontend logs (browser console)
   # Open Developer Tools > Console
   ```

2. **Create a minimal reproduction**:
   ```python
   # Isolate the problematic code
   import requests
   
   # Test single API call
   response = requests.get("https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&api_key=DEMO_KEY")
   print(response.status_code)
   print(response.json())
   ```

3. **Check system resources**:
   ```bash
   # Check memory usage
   free -h
   
   # Check disk space
   df -h
   
   # Check running processes
   ps aux | grep -E "(mongo|python|node)"
   ```

4. **Common environment checks**:
   ```bash
   # Python version
   python --version
   
   # Node version
   node --version
   
   # Package versions
   pip list | grep -E "(requests|motor|fastapi)"
   ```

---

If none of these solutions work, please create an issue with:
- Your operating system and version
- Python/Node.js versions
- Complete error messages
- Steps to reproduce the issue
- Relevant log outputs

We're here to help! 🚀