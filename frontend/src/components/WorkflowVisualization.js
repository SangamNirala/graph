import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  Calendar, 
  Users, 
  Target, 
  Zap,
  Brain,
  Smartphone,
  Globe,
  Building,
  Gift
} from "lucide-react";

const WorkflowVisualization = () => {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [activeView, setActiveView] = useState('timeline');

  const months = [
    {
      id: 1,
      title: "Foundation & Core Features",
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      weeks: [
        {
          title: "Project Setup & Camera Integration",
          tasks: ["React/FastAPI Setup", "MongoDB Local Setup", "Camera API Integration", "Image Capture & Preview"],
          deliverable: "Working Camera Food Scanner",
          freeTools: ["Browser Camera API", "React", "FastAPI", "MongoDB Community"]
        },
        {
          title: "Free AI Integration", 
          tasks: ["Gemini Free API Setup", "Food Recognition Logic", "Basic Nutrition Database", "Response Parsing"],
          deliverable: "AI Food Analysis (Free Tier)",
          freeTools: ["Gemini AI Free Tier", "USDA Food Database API", "Nutrition APIs"]
        },
        {
          title: "User System & Calculations",
          tasks: ["User Registration", "BMR/TDEE Calculator", "Profile Management", "Local Data Storage"],
          deliverable: "User Profile System",
          freeTools: ["bcrypt", "JWT", "Local Storage", "Form Validation"]
        },
        {
          title: "Daily Tracking Dashboard",
          tasks: ["Food Log Interface", "Calorie Counter", "Basic Charts", "Progress Tracking"],
          deliverable: "Basic Nutrition Tracker",
          freeTools: ["Chart.js", "Local Storage", "CSS Charts", "React State"]
        }
      ],
      budget: "FREE",
      team: "Solo Developer",
      kpis: ["Camera Works", "AI Recognition", "User Registration", "Basic Tracking"]
    },
    {
      id: 2,
      title: "Food Database & Meal Planning", 
      icon: <Brain className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      weeks: [
        {
          title: "Free Food Database Integration",
          tasks: ["USDA Food Data Central API", "Free Recipe APIs", "Nutrition Data Parser", "Search Functionality"],
          deliverable: "Comprehensive Food Database",
          freeTools: ["USDA API", "Spoonacular Free Tier", "Edamam Free Tier", "Recipe APIs"]
        },
        {
          title: "AI Meal Planning (Free Tier)",
          tasks: ["Rule-based Meal Plans", "Calorie Target Matching", "Macro Balance Logic", "Recipe Suggestions"],
          deliverable: "Basic Meal Planning",
          freeTools: ["Algorithm Logic", "Free Recipe APIs", "Nutrition Calculations", "Local Processing"]
        },
        {
          title: "Recipe System",
          tasks: ["Recipe Storage", "Ingredient Lists", "Cooking Instructions", "Nutrition Calculations"],
          deliverable: "Recipe Management System",
          freeTools: ["MongoDB", "Recipe APIs", "Local Storage", "Basic CRUD"]
        },
        {
          title: "Shopping Lists",
          tasks: ["Ingredient Aggregation", "Shopping List Generator", "Grocery Organization", "Export Options"],
          deliverable: "Auto-Generated Shopping Lists",
          freeTools: ["Local Storage", "Export Functions", "Print CSS", "Download APIs"]
        }
      ],
      budget: "FREE",
      team: "Solo Developer + Free APIs",
      kpis: ["10K+ Foods", "Recipe Matching", "Meal Plans Generated", "Shopping Lists"]
    },
    {
      id: 3,
      title: "Analytics & Progress Tracking",
      icon: <Target className="w-6 h-6" />,
      color: "from-green-500 to-teal-500", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      weeks: [
        {
          title: "Health Analytics (Code-Based)",
          tasks: ["Nutrition Analysis", "Deficiency Detection", "Progress Calculations", "Health Insights"],
          deliverable: "Health Analytics Dashboard",
          freeTools: ["Chart.js", "Nutrition Algorithms", "Local Calculations", "Progress Tracking"]
        },
        {
          title: "Data Visualization",
          tasks: ["Charts & Graphs", "Progress Reports", "Trend Analysis", "Goal Tracking"],
          deliverable: "Visual Analytics",
          freeTools: ["Chart.js", "D3.js Free", "CSS Charts", "SVG Graphics"]
        },
        {
          title: "Goal Setting System",
          tasks: ["Weight Goals", "Nutrition Targets", "Timeline Planning", "Milestone Tracking"],
          deliverable: "Goal Management System",
          freeTools: ["Local Storage", "Date Calculations", "Progress Algorithms", "Notification API"]
        },
        {
          title: "Export & Sharing",
          tasks: ["Data Export", "Progress Sharing", "Report Generation", "Print Functionality"],
          deliverable: "Data Export System",
          freeTools: ["JSON Export", "CSV Generation", "Print CSS", "Browser APIs"]
        }
      ],
      budget: "FREE",
      team: "Solo Developer",
      kpis: ["Analytics Dashboard", "Goal Tracking", "Data Export", "Progress Reports"]
    },
    {
      id: 4,
      title: "Gamification & Engagement",
      icon: <Gift className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50", 
      borderColor: "border-orange-200",
      weeks: [
        {
          title: "Streak Tracking System",
          tasks: ["Daily Log Streaks", "Streak Calculations", "Streak Rewards", "Motivation Messages"],
          deliverable: "Streak Tracking",
          freeTools: ["Local Storage", "Date Calculations", "Notification API", "CSS Animations"]
        },
        {
          title: "Achievement Badges",
          tasks: ["Badge System", "Achievement Logic", "Progress Milestones", "Badge Display"],
          deliverable: "Achievement System",
          freeTools: ["SVG Icons", "Local Storage", "Achievement Algorithms", "CSS Badges"]
        },
        {
          title: "Basic Social Features",
          tasks: ["Progress Sharing", "Challenge System", "Community Features", "Motivation Tools"],
          deliverable: "Community Features",
          freeTools: ["Web Share API", "Local Challenges", "Social Media APIs", "URL Sharing"]
        },
        {
          title: "Personalization",
          tasks: ["User Preferences", "Custom Themes", "Personal Dashboard", "Habit Tracking"],
          deliverable: "Personalized Experience",
          freeTools: ["Local Storage", "CSS Variables", "Theme Switching", "Preference System"]
        }
      ],
      budget: "FREE",
      team: "Solo Developer",
      kpis: ["Daily Engagement", "Streak Maintenance", "Badge Collection", "User Retention"]
    },
    {
      id: 5,
      title: "Mobile Optimization",
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200", 
      weeks: [
        {
          title: "PWA Development",
          tasks: ["Service Worker", "Offline Functionality", "App Manifest", "Install Prompt"],
          deliverable: "Progressive Web App",
          freeTools: ["Service Workers", "PWA Tools", "Browser APIs", "Workbox"]
        },
        {
          title: "Mobile-First UI/UX",
          tasks: ["Touch Optimization", "Mobile Navigation", "Responsive Design", "Gesture Support"],
          deliverable: "Mobile-Optimized Interface",
          freeTools: ["CSS Media Queries", "Touch Events", "Responsive Design", "Mobile Testing"]
        },
        {
          title: "Offline Functionality",
          tasks: ["Offline Data Storage", "Sync When Online", "Offline Camera", "Local Processing"],
          deliverable: "Offline-Capable App",
          freeTools: ["IndexedDB", "Local Storage", "Cache API", "Background Sync"]
        },
        {
          title: "Performance Optimization",
          tasks: ["Image Compression", "Lazy Loading", "Code Splitting", "Performance Monitoring"],
          deliverable: "Optimized Performance",
          freeTools: ["Browser APIs", "Lazy Loading", "Code Splitting", "Lighthouse"]
        }
      ],
      budget: "FREE",
      team: "Solo Developer",
      kpis: ["Mobile Performance", "PWA Score", "Offline Usage", "Load Times"]
    },
    {
      id: 6,
      title: "Polish & Community",
      icon: <Building className="w-6 h-6" />,
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      weeks: [
        {
          title: "UI/UX Polish",
          tasks: ["Design Improvements", "Animation Polish", "Accessibility", "User Testing"],
          deliverable: "Polished Interface",
          freeTools: ["CSS Animations", "Accessibility Tools", "User Feedback", "A11y Testing"]
        },
        {
          title: "Free Hosting & Deployment",
          tasks: ["Netlify/Vercel Deploy", "GitHub Pages", "Free Database", "CI/CD Setup"],
          deliverable: "Live Deployed App",
          freeTools: ["Netlify", "Vercel", "GitHub Actions", "MongoDB Atlas Free"]
        },
        {
          title: "Documentation & Open Source",
          tasks: ["GitHub Repository", "README Documentation", "API Documentation", "Contributing Guide"],
          deliverable: "Open Source Project",
          freeTools: ["GitHub", "Markdown", "GitHub Pages", "Documentation Tools"]
        },
        {
          title: "Community Building",
          tasks: ["GitHub Issues", "Discord Server", "User Feedback", "Feature Requests"],
          deliverable: "Community Platform",
          freeTools: ["GitHub Issues", "Discord", "Reddit", "Social Media"]
        }
      ],
      budget: "FREE",
      team: "Solo Developer + Community",
      kpis: ["App Performance", "User Feedback", "GitHub Stars", "Community Growth"]
    }
  ];

  const totalBudget = "FREE (Only Time Investment)";

  const views = [
    { id: 'timeline', name: 'Timeline View', icon: <Calendar className="w-4 h-4" /> },
    { id: 'tools', name: 'Free Tools', icon: <Gift className="w-4 h-4" /> },
    { id: 'features', name: 'Features Scope', icon: <Target className="w-4 h-4" /> },
    { id: 'limitations', name: 'Limitations', icon: <Globe className="w-4 h-4" /> }
  ];

  const freeTools = [
    {
      category: 'AI & APIs',
      tools: [
        { name: 'Gemini AI', tier: 'Free Tier', usage: '15 requests/minute' },
        { name: 'USDA Food Database', tier: 'Free', usage: 'Unlimited' },
        { name: 'Spoonacular API', tier: 'Free Tier', usage: '150 requests/day' },
        { name: 'Edamam Nutrition API', tier: 'Free Tier', usage: '100 requests/month' }
      ]
    },
    {
      category: 'Development',
      tools: [
        { name: 'React', tier: 'Open Source', usage: 'Unlimited' },
        { name: 'FastAPI', tier: 'Open Source', usage: 'Unlimited' },
        { name: 'MongoDB Community', tier: 'Free', usage: '512MB' },
        { name: 'Chart.js', tier: 'Open Source', usage: 'Unlimited' }
      ]
    },
    {
      category: 'Hosting & Deployment',
      tools: [
        { name: 'Netlify', tier: 'Free Tier', usage: '100GB bandwidth' },
        { name: 'Vercel', tier: 'Free Tier', usage: 'Unlimited projects' },
        { name: 'GitHub Pages', tier: 'Free', usage: '1GB storage' },
        { name: 'MongoDB Atlas', tier: 'Free Tier', usage: '512MB database' }
      ]
    }
  ];

  const limitations = [
    {
      category: 'API Limitations',
      items: [
        'Gemini AI: 15 requests/minute (need to implement rate limiting)',
        'Recipe APIs: Limited daily requests (need caching)',
        'No real-time sync across devices (local storage only)',
        'Limited AI accuracy compared to premium models'
      ]
    },
    {
      category: 'Removed Premium Features',
      items: [
        'Subscription payments & monetization',
        'Professional coaching dashboards',
        'Healthcare integration & HIPAA compliance',
        'Wearable device integrations',
        'Advanced enterprise features',
        'Real-time collaboration',
        'Premium AI models',
        'Global scaling infrastructure'
      ]
    },
    {
      category: 'Scalability Constraints',
      items: [
        'Single server deployment (no auto-scaling)',
        'Local storage limitations on mobile',
        'No CDN for global performance',
        'Limited concurrent users'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Free Tier Notice */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 border-2 border-green-200"
      >
        <div className="flex items-center gap-3 mb-2">
          <Gift className="w-8 h-8 text-green-600" />
          <h2 className="text-2xl font-bold text-green-800">100% FREE Implementation Plan</h2>
        </div>
        <p className="text-green-700 text-lg">
          Complete nutrition app using only free tools, APIs, and open-source solutions. Zero cost, maximum value! 🚀
        </p>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-white/50 rounded-xl backdrop-blur-sm border border-gray-200">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              activeView === view.id
                ? 'bg-white shadow-md text-purple-600 font-medium'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            {view.icon}
            <span className="hidden sm:inline">{view.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Month Selection */}
            <div className="flex flex-wrap gap-2 justify-center">
              {months.map((month) => (
                <motion.button
                  key={month.id}
                  onClick={() => setSelectedMonth(month.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedMonth === month.id
                      ? `bg-gradient-to-r ${month.color} text-white shadow-lg`
                      : `${month.bgColor} ${month.borderColor} border text-gray-700 hover:shadow-md`
                  }`}
                >
                  {month.icon}
                  <span className="hidden sm:inline">Month {month.id}</span>
                  <span className="sm:hidden">{month.id}</span>
                </motion.button>
              ))}
            </div>

            {/* Selected Month Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMonth}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                {(() => {
                  const month = months.find(m => m.id === selectedMonth);
                  return (
                    <>
                      {/* Header */}
                      <div className={`bg-gradient-to-r ${month.color} p-6 text-white`}>
                        <div className="flex items-center gap-4 mb-4">
                          {month.icon}
                          <div>
                            <h2 className="text-2xl font-bold">Month {month.id}: {month.title}</h2>
                            <div className="flex flex-wrap gap-4 mt-2 text-white/90">
                              <span>💰 {month.budget}</span>
                              <span>👤 {month.team}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* KPIs */}
                        <div className="flex flex-wrap gap-2">
                          {month.kpis.map((kpi, index) => (
                            <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                              {kpi}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Weeks */}
                      <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          {month.weeks.map((week, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                            >
                              <h4 className="font-semibold text-gray-800 mb-2">
                                Week {index * 2 + 1}-{index * 2 + 2}: {week.title}
                              </h4>
                              <ul className="space-y-1 mb-3">
                                {week.tasks.map((task, taskIndex) => (
                                  <li key={taskIndex} className="flex items-start gap-2 text-sm text-gray-600">
                                    <ChevronRight className="w-3 h-3 mt-0.5 text-gray-400" />
                                    {task}
                                  </li>
                                ))}
                              </ul>
                              <div className="p-2 bg-green-50 rounded-lg border border-green-200 mb-2">
                                <span className="text-xs font-medium text-green-700">📋 {week.deliverable}</span>
                              </div>
                              {week.freeTools && (
                                <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                                  <span className="text-xs font-medium text-blue-700">
                                    🆓 Free Tools: {week.freeTools.join(', ')}
                                  </span>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            {/* Timeline Overview */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📅 Complete Free Implementation Timeline</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                {months.map((month, index) => (
                  <motion.div
                    key={month.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-start gap-4 pb-8"
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${month.color} flex items-center justify-center text-white font-bold z-10`}>
                      {month.id}
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="font-semibold text-gray-800">{month.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Cost: {month.budget} • Team: {month.team}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {month.kpis.slice(0, 2).map((kpi, kpiIndex) => (
                          <span key={kpiIndex} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                            {kpi}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'tools' && (
          <motion.div
            key="tools"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">🆓 Free Tools & APIs Stack</h3>
              
              {freeTools.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{category.category}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.tools.map((tool, toolIndex) => (
                      <motion.div
                        key={toolIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: categoryIndex * 0.2 + toolIndex * 0.1 }}
                        className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Gift className="w-5 h-5 text-green-500" />
                          <span className="font-semibold text-gray-800">{tool.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div className="flex justify-between items-center">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                              {tool.tier}
                            </span>
                            <span className="text-xs text-gray-500">{tool.usage}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeView === 'features' && (
          <motion.div
            key="features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">🎯 What We CAN Build (Free Features)</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-800">✅ Core Features Included</h4>
                  {[
                    'Camera food scanning with AI recognition',
                    'Basic nutrition tracking and calorie counting',
                    'User profiles with BMR/TDEE calculations',
                    'Meal planning with free recipe APIs',
                    'Progress tracking and analytics',
                    'Achievement badges and streak tracking',
                    'Progressive Web App (PWA) functionality',
                    'Offline capabilities with local storage',
                    'Data export and sharing features',
                    'Open-source community features'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-800">🚀 Advanced Free Features</h4>
                  {[
                    'Shopping list auto-generation',
                    'Custom recipe creation and storage',
                    'Goal setting and milestone tracking',
                    'Data visualization with charts',
                    'Social sharing capabilities',
                    'Multi-theme customization',
                    'Responsive mobile-first design',
                    'GitHub-based community support',
                    'Documentation and tutorials',
                    'Performance optimization'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="flex items-start gap-2"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'limitations' && (
          <motion.div
            key="limitations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">⚠️ Limitations & Removed Features</h3>
              
              {limitations.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{category.category}</h4>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: categoryIndex * 0.2 + itemIndex * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                      >
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-yellow-800">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Workarounds */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Workarounds & Solutions</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Rate limiting: Implement smart caching and request queuing</li>
                  <li>• Storage limits: Use efficient data compression and cleanup</li>
                  <li>• Offline sync: Store essential data locally, sync when online</li>
                  <li>• Scalability: Start small, optimize for performance</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl p-8 text-white text-center"
      >
        <h3 className="text-2xl font-bold mb-4">🎯 Ready to Build for FREE?</h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          This realistic plan uses only free tools and APIs. Perfect for learning, portfolios, or launching an MVP without spending money!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-green-600 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          Start FREE Development 🚀
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WorkflowVisualization;