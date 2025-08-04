import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";
import WorkflowVisualization from "./components/WorkflowVisualization";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="py-8 px-4 bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-4"
          >
            🍽️ Nutrition App Development
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Complete 6-Month Implementation Workflow for Subscription-Based Personalized Nutrition & Meal Planning App
          </motion.p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <WorkflowVisualization />
      </main>
      
      <footer className="py-8 px-4 text-center text-gray-500">
        <p>© 2025 Nutrition App Development Plan - Interactive Workflow Visualization</p>
      </footer>
    </div>
  );
}

export default App;