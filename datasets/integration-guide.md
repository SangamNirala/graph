# 🔧 Dataset Integration Guide

This guide provides step-by-step instructions for integrating all the nutrition app datasets into your application.

## 🚀 Quick Start (15 Minutes)

### 1. Set Up API Keys
```bash
# Copy the API keys template
cp datasets/api-keys-template.env backend/.env

# Edit the file and add your actual API keys
nano backend/.env
```

### 2. Install Required Dependencies
```bash
# Backend dependencies
cd backend
pip install requests python-dotenv pymongo motor pandas numpy

# Frontend dependencies  
cd ../frontend
yarn add axios recharts lucide-react
```

### 3. Test Basic Integration
```python
# Test USDA API connection
import requests
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get('USDA_API_KEY', 'DEMO_KEY')

response = requests.get(
    f"https://api.nal.usda.gov/fdc/v1/foods/search?query=banana&api_key={api_key}"
)
print(f"Status: {response.status_code}")
print(f"Results: {len(response.json().get('foods', []))} foods found")
```

## 📊 Phase 1: Core Food Database (Week 1)

### USDA Food Data Integration

1. **Set up the API client**:
```python
# backend/services/usda_service.py
import requests
import os
from typing import List, Dict, Optional
import asyncio
import aiohttp

class USDAFoodService:
    def __init__(self):
        self.api_key = os.environ.get('USDA_API_KEY', 'DEMO_KEY')
        self.base_url = "https://api.nal.usda.gov/fdc/v1"
        
    async def search_foods(self, query: str, limit: int = 25) -> List[Dict]:
        """Search for foods using USDA API"""
        url = f"{self.base_url}/foods/search"
        params = {
            'query': query,
            'pageSize': limit,
            'api_key': self.api_key
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params) as response:
                data = await response.json()
                return data.get('foods', [])
    
    async def get_food_details(self, fdc_id: int) -> Optional[Dict]:
        """Get detailed nutrition data for a specific food"""
        url = f"{self.base_url}/food/{fdc_id}"
        params = {'api_key': self.api_key}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params) as response:
                if response.status == 200:
                    return await response.json()
                return None
```

2. **Create database models**:
```python
# backend/models/food.py
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime

class FoodNutrient(BaseModel):
    nutrient_id: int
    nutrient_name: str
    unit_name: str
    value: float

class Food(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    fdc_id: Optional[int] = None
    description: str
    brand_name: Optional[str] = None
    category: str
    serving_size: float = 100
    serving_unit: str = "g"
    nutrients: List[FoodNutrient] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

3. **Add API endpoints**:
```python
# backend/routes/foods.py
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from services.usda_service import USDAFoodService
from models.food import Food

router = APIRouter(prefix="/api/foods", tags=["foods"])
food_service = USDAFoodService()

@router.get("/search")
async def search_foods(q: str, limit: int = 25) -> List[Dict]:
    """Search for foods in the USDA database"""
    try:
        foods = await food_service.search_foods(q, limit)
        return foods
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{fdc_id}")
async def get_food_details(fdc_id: int) -> Dict:
    """Get detailed nutrition information for a food"""
    food = await food_service.get_food_details(fdc_id)
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    return food
```

### Sample Data Import

4. **Import sample data**:
```python
# backend/scripts/import_sample_data.py
import json
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def import_sample_foods():
    """Import sample food data into MongoDB"""
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Load sample data
    with open('../datasets/nutrition-data/usda-food-samples.json', 'r') as f:
        sample_foods = json.load(f)
    
    # Insert into database
    result = await db.foods.insert_many(sample_foods)
    print(f"Imported {len(result.inserted_ids)} sample foods")

if __name__ == "__main__":
    asyncio.run(import_sample_foods())
```

## 🍳 Phase 2: Recipe System (Week 2)

### Recipe Database Integration

1. **Recipe model and service**:
```python
# backend/models/recipe.py
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid

class RecipeIngredient(BaseModel):
    name: str
    amount: float
    unit: str
    fdc_id: Optional[int] = None
    calories: float

class Recipe(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    prep_time: int  # minutes
    cook_time: Optional[int] = None
    servings: int
    difficulty: str  # Easy, Medium, Hard
    category: str
    dietary_tags: List[str] = []
    ingredients: List[RecipeIngredient]
    instructions: List[str]
    nutrition_per_100g: Dict[str, float]
    total_nutrition: Dict[str, float]
```

2. **Import sample recipes**:
```python
# backend/scripts/import_recipes.py
import json
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def import_sample_recipes():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    with open('../datasets/recipes/sample-recipes.json', 'r') as f:
        recipes = json.load(f)
    
    result = await db.recipes.insert_many(recipes)
    print(f"Imported {len(result.inserted_ids)} sample recipes")

asyncio.run(import_sample_recipes())
```

## 🤖 Phase 3: Food Recognition (Week 3-4)

### Machine Learning Setup

1. **Download Food-101 dataset**:
```bash
# Install Kaggle CLI
pip install kaggle

# Configure Kaggle credentials (download kaggle.json from your account)
mkdir ~/.kaggle
cp kaggle.json ~/.kaggle/
chmod 600 ~/.kaggle/kaggle.json

# Download Food-101 dataset
kaggle datasets download -d kmader/food41
unzip food41.zip -d datasets/food-recognition/
```

2. **Basic food recognition service**:
```python
# backend/services/food_recognition.py
import cv2
import numpy as np
import tensorflow as tf
from typing import List, Tuple, Optional
import json

class FoodRecognitionService:
    def __init__(self):
        # Load pre-trained model (you'll need to train or download this)
        self.model = self.load_model()
        
        # Load food categories
        with open('../datasets/food-recognition/food-categories.json', 'r') as f:
            self.categories = json.load(f)
    
    def load_model(self):
        """Load the trained food recognition model"""
        # This would load your trained TensorFlow/Keras model
        # For now, return None - you'll implement this after training
        return None
    
    def preprocess_image(self, image_data: bytes) -> np.ndarray:
        """Preprocess image for model prediction"""
        # Convert bytes to OpenCV image
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Resize to model input size (224x224 for most food models)
        img = cv2.resize(img, (224, 224))
        
        # Convert BGR to RGB
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Normalize
        img = img.astype(np.float32) / 255.0
        
        # Add batch dimension
        img = np.expand_dims(img, axis=0)
        
        return img
    
    async def predict_food(self, image_data: bytes) -> List[Tuple[str, float]]:
        """Predict food from image data"""
        if not self.model:
            # Fallback: return mock predictions for now
            return [
                ("banana", 0.85),
                ("apple", 0.12),
                ("orange", 0.03)
            ]
        
        # Preprocess image
        img = self.preprocess_image(image_data)
        
        # Make prediction
        predictions = self.model.predict(img)
        
        # Get top 5 predictions with confidence scores
        top5_indices = np.argsort(predictions[0])[-5:][::-1]
        
        results = []
        for idx in top5_indices:
            food_name = self.get_food_name_by_index(idx)
            confidence = float(predictions[0][idx])
            results.append((food_name, confidence))
        
        return results
```

## 🎯 Phase 4: Gamification System (Week 5)

### Badges and Achievements

1. **Import gamification data**:
```python
# backend/scripts/import_gamification.py
import json
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

async def import_gamification_data():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    
    # Import badges
    with open('../datasets/gamification/badges-achievements.json', 'r') as f:
        badge_data = json.load(f)
    
    await db.badges.insert_many(badge_data['badges'])
    await db.badge_categories.insert_one(badge_data['badgeCategories'])
    
    # Import challenges
    with open('../datasets/gamification/challenges-templates.json', 'r') as f:
        challenge_data = json.load(f)
    
    await db.daily_challenges.insert_many(challenge_data['dailyChallenges'])
    await db.weekly_challenges.insert_many(challenge_data['weeklyChallenges'])
    await db.monthly_challenges.insert_many(challenge_data['monthlyChallenges'])
    
    print("Gamification data imported successfully!")

asyncio.run(import_gamification_data())
```

## 📱 Phase 5: Frontend Integration

### React Components

1. **Food search component**:
```javascript
// frontend/src/components/FoodSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const FoodSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchFoods = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/foods/search`,
        { params: { q: query, limit: 10 } }
      );
      setResults(response.data);
    } catch (error) {
      console.error('Food search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="food-search">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchFoods()}
          placeholder="Search for foods..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          onClick={searchFoods}
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      <div className="grid gap-3">
        {results.map((food, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{food.description}</h3>
            <p className="text-sm text-gray-600">
              {food.brandOwner && `Brand: ${food.brandOwner}`}
            </p>
            <p className="text-sm text-gray-600">
              Category: {food.foodCategory || 'Unknown'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSearch;
```

2. **Camera food scanner**:
```javascript
// frontend/src/components/FoodScanner.js
import React, { useRef, useState } from 'react';
import { Camera } from 'lucide-react';

const FoodScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [predictions, setPredictions] = useState([]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera if available
      });
      videoRef.current.srcObject = stream;
      setIsScanning(true);
    } catch (error) {
      console.error('Camera access error:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const captureAndAnalyze = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    // Convert to blob
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob);
      
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/foods/recognize`,
          {
            method: 'POST',
            body: formData
          }
        );
        
        const result = await response.json();
        setPredictions(result.predictions || []);
      } catch (error) {
        console.error('Food recognition error:', error);
      }
    });
  };

  return (
    <div className="food-scanner">
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full max-w-md mx-auto rounded-lg"
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {!isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <button
              onClick={startCamera}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg"
            >
              <Camera size={20} />
              Start Camera
            </button>
          </div>
        )}
      </div>
      
      {isScanning && (
        <div className="mt-4 text-center">
          <button
            onClick={captureAndAnalyze}
            className="px-6 py-2 bg-green-500 text-white rounded-lg"
          >
            Scan Food
          </button>
        </div>
      )}
      
      {predictions.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Recognition Results:</h3>
          {predictions.map((pred, index) => (
            <div key={index} className="flex justify-between p-2 border rounded">
              <span>{pred.food_name}</span>
              <span className="text-blue-600">
                {(pred.confidence * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodScanner;
```

## 🔍 Testing Your Integration

### API Testing Script
```python
# test_integration.py
import asyncio
import requests
import os
from dotenv import load_dotenv

load_dotenv()

async def test_all_apis():
    """Test all API integrations"""
    backend_url = "http://localhost:8001/api"
    
    # Test food search
    print("Testing food search...")
    response = requests.get(f"{backend_url}/foods/search", params={"q": "banana"})
    print(f"Food search status: {response.status_code}")
    
    # Test recipe search
    print("Testing recipe search...")
    response = requests.get(f"{backend_url}/recipes")
    print(f"Recipe search status: {response.status_code}")
    
    # Test badge system
    print("Testing badge system...")
    response = requests.get(f"{backend_url}/badges")
    print(f"Badge system status: {response.status_code}")
    
    print("Integration tests completed!")

if __name__ == "__main__":
    asyncio.run(test_all_apis())
```

## 🚨 Common Issues & Solutions

### Issue: "API Key Invalid"
**Solution**: Check your .env file and ensure API keys are correctly formatted without quotes.

### Issue: "Module not found"
**Solution**: Install missing dependencies:
```bash
pip install -r requirements.txt
cd frontend && yarn install
```

### Issue: "Database connection failed"
**Solution**: Ensure MongoDB is running and MONGO_URL is correct in .env

### Issue: "CORS errors in frontend"
**Solution**: Check that REACT_APP_BACKEND_URL is set correctly in frontend/.env

## 📈 Performance Optimization

1. **Caching Strategy**:
   - Cache USDA API responses for 24 hours
   - Store frequently searched foods in local database
   - Use Redis for session-based caching

2. **Database Indexing**:
   ```javascript
   // MongoDB indexes for better performance
   db.foods.createIndex({ "description": "text" })
   db.foods.createIndex({ "fdc_id": 1 })
   db.recipes.createIndex({ "title": "text", "ingredients.name": "text" })
   ```

3. **Image Optimization**:
   - Compress images before sending to recognition API
   - Use WebP format when possible
   - Implement lazy loading for food images

## 🎯 Next Steps

After completing this integration guide:

1. **Week 6-8**: Train your food recognition model using Food-101 dataset
2. **Week 9-10**: Implement advanced features like portion size estimation
3. **Week 11-12**: Add social features and community challenges
4. **Month 4+**: Optimize for mobile and add PWA features

---

For additional help, see the `troubleshooting.md` file or open an issue in the repository.