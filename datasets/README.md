# 🍽️ Nutrition App Datasets

This directory contains all the datasets and data sources needed for the comprehensive nutrition and meal planning app. All datasets listed here are **free** and publicly available.

## 📊 Dataset Overview

### 1. **Food & Nutrition Databases**
- **USDA Food Data Central API** - Primary nutrition database
- **Open Food Facts** - Barcode scanning and international products
- **MyFoodRepo** - Community-driven food database

### 2. **Recipe Databases**
- **Spoonacular API** - Recipe search and meal planning
- **Edamam Recipe API** - Nutrition analysis and recipes
- **Recipe1M+** - Large-scale recipe dataset

### 3. **Food Recognition Datasets**
- **Food-101** - 101,000 food images across 101 categories
- **Food-500** - Extended food recognition dataset
- **USDA Food Images** - Real food images with nutrition data

### 4. **Health & Fitness Data**
- **WHO BMI Standards** - Body Mass Index calculations
- **Physical Activity Compendium** - Activity calorie data
- **Nutrition Recommendations** - Daily value standards

### 5. **Gamification Data**
- **Achievement Templates** - Badge and milestone systems
- **Challenge Frameworks** - Daily/weekly challenge templates
- **Goal Setting Data** - Health goal frameworks

## 🚀 Quick Setup Instructions

1. **Get API Keys** (All Free):
   - USDA FoodData Central: Register at [data.gov](https://api.data.gov/signup/)
   - Spoonacular: Sign up at [spoonacular.com](https://spoonacular.com/food-api)
   - Edamam: Register at [edamam.com](https://developer.edamam.com/)

2. **Download Offline Datasets**:
   ```bash
   # Food-101 Dataset
   kaggle datasets download -d kmader/food41

   # USDA Offline Data
   wget https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_csv_2024-04-18.zip

   # Open Food Facts
   wget https://static.openfoodfacts.org/data/en.openfoodfacts.org.products.csv
   ```

3. **Environment Variables**:
   ```env
   USDA_API_KEY=your_usda_api_key
   SPOONACULAR_API_KEY=your_spoonacular_key
   EDAMAM_APP_ID=your_edamam_app_id
   EDAMAM_APP_KEY=your_edamam_app_key
   ```

## 📈 Dataset Usage Statistics

| Dataset | Size | Records | Update Frequency |
|---------|------|---------|------------------|
| USDA FoodData Central | ~2.5GB | 1.2M foods | Monthly |
| Open Food Facts | ~15GB | 3M+ products | Real-time |
| Food-101 | ~5GB | 101K images | Static |
| Recipe1M+ | ~1.2GB | 1M+ recipes | Static |

## 🎯 Feature Implementation Mapping

### Month 1: Foundation Features
- **Camera Integration** → Food-101 dataset for recognition
- **Basic Nutrition** → USDA API for core data
- **User Profiles** → BMI/TDEE calculation data

### Month 2: Food Database & Meal Planning
- **50K+ Foods** → USDA + Open Food Facts integration
- **Recipe System** → Spoonacular + Recipe1M+ datasets
- **Shopping Lists** → Product barcode data

### Month 3: Analytics & Health Insights
- **Health Analytics** → WHO standards + activity data
- **Progress Tracking** → Goal framework templates
- **Reporting** → Nutrition recommendation data

### Month 4: Gamification & Community
- **100+ Badges** → Achievement framework data
- **Challenges** → Pre-built challenge templates
- **Social Features** → Community interaction frameworks

### Month 5: Mobile & Performance
- **Offline Data** → Compressed local datasets
- **PWA Features** → Critical data caching strategies

### Month 6: Polish & Growth
- **Internationalization** → Multi-language food data
- **Accessibility** → Standardized nutrition formats

## 📋 Implementation Priority

1. **Phase 1** - Core Data (Week 1-2)
   - Set up USDA API integration
   - Download Food-101 for image recognition
   - Implement basic nutrition calculations

2. **Phase 2** - Extended Database (Week 3-4)
   - Integrate Open Food Facts for barcode scanning
   - Add Spoonacular recipe API
   - Set up local caching system

3. **Phase 3** - Smart Features (Month 2-3)
   - Machine learning food recognition
   - AI meal planning algorithms
   - Health analytics engine

4. **Phase 4** - Community & Gamification (Month 4+)
   - User-generated content systems
   - Social sharing capabilities
   - Achievement and badge systems

## 🔧 Technical Requirements

- **Storage**: ~25GB for complete offline dataset
- **RAM**: 4GB+ for ML food recognition
- **API Calls**: ~10,000/month for active development
- **Database**: MongoDB for flexible food data storage

## 📄 License Information

All datasets are available under permissive licenses:
- **USDA Data**: Public domain (CC0)
- **Open Food Facts**: Open Database License
- **Food-101**: Research/Educational use
- **APIs**: Subject to respective terms of service

## 🆘 Support & Updates

For questions about dataset integration or updates, see:
- [API Documentation](./api-documentation.md)
- [Dataset Integration Guide](./integration-guide.md)
- [Troubleshooting](./troubleshooting.md)

---
*Last updated: January 2025*