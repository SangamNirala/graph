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
  Gift,
  Plus
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
          tasks: [
            "React/FastAPI/MongoDB Setup", 
            "Camera API Integration", 
            "Image Capture & Preview",
            "Multi-camera Support (Front/Back)",
            "Image Quality Optimization",
            "Batch Photo Capture Mode"
          ],
          deliverable: "Advanced Camera Food Scanner",
          freeTools: ["Browser Camera API", "React", "FastAPI", "MongoDB Community"],
          bonusFeatures: [
            "Camera flash toggle",
            "Grid overlay for better composition",
            "Image rotation & basic editing",
            "Photo gallery for recent scans"
          ]
        },
        {
          title: "Free AI Integration & Food Recognition", 
          tasks: [
            "Gemini Free API Setup", 
            "Food Recognition Logic", 
            "Basic Nutrition Database",
            "Response Parsing & Validation",
            "Confidence Score System",
            "Fallback Food Search"
          ],
          deliverable: "Smart AI Food Analysis System",
          freeTools: ["Gemini AI Free Tier", "USDA Food Database API", "Nutrition APIs"],
          bonusFeatures: [
            "Multiple food item detection in one image",
            "Portion size estimation using reference objects",
            "Food freshness assessment",
            "Cooking method detection (fried, grilled, etc.)"
          ]
        },
        {
          title: "User System & Advanced Calculations",
          tasks: [
            "User Registration & Authentication", 
            "Enhanced BMR/TDEE Calculator", 
            "Comprehensive Profile Management",
            "Activity Level Integration",
            "Health Condition Considerations",
            "Multiple Goal Setting (Weight, Fitness, Health)"
          ],
          deliverable: "Comprehensive User Profile System",
          freeTools: ["bcrypt", "JWT", "Local Storage", "Form Validation"],
          bonusFeatures: [
            "Body fat percentage tracking",
            "Metabolic age calculation",
            "Macro ratio recommendations",
            "Custom dietary restriction setup"
          ]
        },
        {
          title: "Advanced Daily Tracking Dashboard",
          tasks: [
            "Enhanced Food Log Interface", 
            "Smart Calorie Counter", 
            "Interactive Charts & Graphs",
            "Progress Tracking with Trends",
            "Meal Timing Analysis",
            "Hydration & Sleep Tracking"
          ],
          deliverable: "Complete Nutrition & Wellness Tracker",
          freeTools: ["Chart.js", "Local Storage", "CSS Charts", "React State"],
          bonusFeatures: [
            "Voice notes for meals",
            "Mood tracking correlation",
            "Energy level monitoring",
            "Quick meal templates"
          ]
        }
      ],
      budget: "FREE",
      team: "Solo Developer",
      kpis: ["Camera Works", "AI Recognition 85%", "User Registration", "Advanced Tracking"],
      totalFeatures: "24 Core + 16 Bonus = 40 Features"
    },
    {
      id: 2,
      title: "Food Database & Smart Meal Planning", 
      icon: <Brain className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      weeks: [
        {
          title: "Comprehensive Food Database Integration",
          tasks: [
            "USDA Food Data Central API", 
            "Free Recipe APIs Integration", 
            "Nutrition Data Parser",
            "Advanced Search Functionality",
            "Food Categories & Tags System",
            "Seasonal Food Recommendations"
          ],
          deliverable: "Massive Food Database (50K+ Items)",
          freeTools: ["USDA API", "Spoonacular Free Tier", "Edamam Free Tier", "Recipe APIs"],
          bonusFeatures: [
            "Barcode scanning for packaged foods",
            "Restaurant menu database",
            "International cuisine support",
            "Allergen and dietary restriction filtering"
          ]
        },
        {
          title: "AI-Powered Smart Meal Planning",
          tasks: [
            "Intelligent Meal Plan Generator", 
            "Calorie & Macro Target Matching", 
            "Dietary Preference Integration",
            "Budget-Conscious Planning",
            "Leftover Optimization",
            "Weekly & Monthly Planning"
          ],
          deliverable: "Personalized Smart Meal Planning System",
          freeTools: ["Algorithm Logic", "Free Recipe APIs", "Nutrition Calculations", "Local Processing"],
          bonusFeatures: [
            "Meal prep scheduling",
            "Family-size meal scaling",
            "Cooking skill level adaptation",
            "Time-based meal suggestions (quick/slow)"
          ]
        },
        {
          title: "Recipe System & Kitchen Management",
          tasks: [
            "Recipe Storage & Organization", 
            "Smart Ingredient Lists", 
            "Step-by-Step Cooking Instructions",
            "Nutrition Calculations Per Serving",
            "Recipe Rating & Reviews",
            "Custom Recipe Creation"
          ],
          deliverable: "Complete Recipe Management System",
          freeTools: ["MongoDB", "Recipe APIs", "Local Storage", "Basic CRUD"],
          bonusFeatures: [
            "Cooking timer integration",
            "Ingredient substitution suggestions",
            "Kitchen inventory tracking",
            "Meal cost estimation"
          ]
        },
        {
          title: "Smart Shopping & Inventory System",
          tasks: [
            "Intelligent Ingredient Aggregation", 
            "Auto Shopping List Generator", 
            "Grocery Store Organization",
            "Price Comparison Integration",
            "Pantry Management System",
            "Expiration Date Tracking"
          ],
          deliverable: "Complete Shopping & Inventory System",
          freeTools: ["Local Storage", "Export Functions", "Print CSS", "Free Price APIs"],
          bonusFeatures: [
            "Shopping list sharing",
            "Coupon & deal alerts",
            "Seasonal produce recommendations",
            "Local store integration"
          ]
        }
      ],
      budget: "FREE",
      team: "Solo Developer + Free APIs",
      kpis: ["50K+ Foods", "Recipe Matching", "Meal Plans Generated", "Shopping Efficiency"],
      totalFeatures: "24 Core + 16 Bonus = 40 Features"
    },
    {
      id: 3,
      title: "Analytics & Health Insights",
      icon: <Target className="w-6 h-6" />,
      color: "from-green-500 to-teal-500", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      weeks: [
        {
          title: "Advanced Health Analytics Engine",
          tasks: [
            "Comprehensive Nutrition Analysis", 
            "Deficiency Detection Algorithms", 
            "Health Score Calculations",
            "Metabolic Rate Monitoring",
            "Blood Sugar Impact Predictions",
            "Inflammation Index Tracking"
          ],
          deliverable: "AI-Powered Health Analytics Dashboard",
          freeTools: ["Chart.js", "Nutrition Algorithms", "Local Calculations", "Health APIs"],
          bonusFeatures: [
            "Personalized nutrition coaching insights",
            "Seasonal health recommendations",
            "Stress-nutrition correlation analysis",
            "Sleep-diet impact tracking"
          ]
        },
        {
          title: "Data Visualization & Reporting",
          tasks: [
            "Interactive Charts & Graphs", 
            "Comprehensive Progress Reports", 
            "Trend Analysis Engine",
            "Goal Achievement Tracking",
            "Comparative Analytics",
            "Predictive Modeling"
          ],
          deliverable: "Professional Analytics Suite",
          freeTools: ["Chart.js", "D3.js Free", "CSS Charts", "SVG Graphics"],
          bonusFeatures: [
            "Animated data visualizations",
            "Export to PDF reports",
            "Social media shareable infographics",
            "Weekly/monthly email summaries"
          ]
        },
        {
          title: "Smart Goal Management System",
          tasks: [
            "Multi-Goal Setting & Tracking", 
            "Timeline Planning & Milestones", 
            "Progress Prediction Algorithms",
            "Habit Formation Tracking",
            "Motivation & Reward Systems",
            "Goal Adjustment Recommendations"
          ],
          deliverable: "Intelligent Goal Management Platform",
          freeTools: ["Local Storage", "Date Calculations", "Progress Algorithms", "Notification API"],
          bonusFeatures: [
            "Goal sharing with friends/family",
            "Achievement celebration animations",
            "Streak rewards and badges",
            "Personalized motivation quotes"
          ]
        },
        {
          title: "Data Export & Integration Hub",
          tasks: [
            "Multi-Format Data Export", 
            "Progress Sharing Features", 
            "Professional Report Generation",
            "Print-Optimized Formats",
            "Cloud Backup Integration",
            "Data Import from Other Apps"
          ],
          deliverable: "Complete Data Management System",
          freeTools: ["JSON/CSV Export", "Print CSS", "Browser APIs", "Cloud Storage APIs"],
          bonusFeatures: [
            "Integration with fitness apps",
            "Calendar sync for meal planning",
            "Email scheduling for reports",
            "API endpoints for third-party apps"
          ]
        }
      ],
      budget: "FREE",
      team: "Solo Developer",
      kpis: ["Health Analytics", "Goal Tracking 95%", "Data Export", "User Insights"],
      totalFeatures: "24 Core + 16 Bonus = 40 Features"
    },
    {
      id: 4,
      title: "Gamification & Community",
      icon: <Gift className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50", 
      borderColor: "border-orange-200",
      weeks: [
        {
          title: "Advanced Gamification System",
          tasks: [
            "Multi-Level Streak Tracking", 
            "Dynamic Streak Calculations", 
            "Streak Recovery & Rewards",
            "Daily Challenge Generation",
            "Bonus Point Systems",
            "Seasonal Events & Competitions"
          ],
          deliverable: "Comprehensive Gamification Engine",
          freeTools: ["Local Storage", "Date Calculations", "Notification API", "CSS Animations"],
          bonusFeatures: [
            "Custom challenge creation",
            "Friend streak comparisons",
            "Monthly themed challenges",
            "Streak insurance system"
          ]
        },
        {
          title: "Achievement & Badge System",
          tasks: [
            "Dynamic Badge System (100+ Badges)", 
            "Achievement Logic Engine", 
            "Progress Milestone Tracking",
            "Rare & Hidden Badge Discovery",
            "Badge Showcase & Sharing",
            "Achievement Prediction System"
          ],
          deliverable: "Complete Achievement Platform",
          freeTools: ["SVG Icons", "Local Storage", "Achievement Algorithms", "CSS Badges"],
          bonusFeatures: [
            "Animated badge unlocks",
            "Badge trading system",
            "Achievement leaderboards",
            "Custom badge design contests"
          ]
        },
        {
          title: "Social & Community Features",
          tasks: [
            "Progress Sharing Platform", 
            "Community Challenge System", 
            "Recipe Sharing & Rating",
            "Success Story Platform",
            "User-Generated Content",
            "Mentorship Matching"
          ],
          deliverable: "Thriving Community Platform",
          freeTools: ["Web Share API", "Local Storage", "Social Media APIs", "URL Sharing"],
          bonusFeatures: [
            "Community forums",
            "Recipe contests & voting",
            "Expert Q&A sessions",
            "Local meetup organization"
          ]
        },
        {
          title: "Personalization & Customization",
          tasks: [
            "Advanced User Preferences", 
            "Dynamic Theme System", 
            "Personalized Dashboard Layouts",
            "Custom Habit Tracking",
            "AI-Powered Recommendations",
            "Adaptive User Experience"
          ],
          deliverable: "Fully Personalized Experience",
          freeTools: ["Local Storage", "CSS Variables", "Theme Engine", "Preference System"],
          bonusFeatures: [
            "Voice-controlled navigation",
            "Gesture-based interactions",
            "Accessibility customization",
            "Personalized notification schedules"
          ]
        }
      ],
      budget: "FREE",
      team: "Solo Developer + Community",
      kpis: ["90% Daily Engagement", "100+ Badges", "Community Growth", "95% Retention"],
      totalFeatures: "24 Core + 16 Bonus = 40 Features"
    },
    {
      id: 5,
      title: "Mobile & Performance Excellence",
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200", 
      weeks: [
        {
          title: "Advanced PWA Development",
          tasks: [
            "Service Worker Implementation", 
            "Offline-First Architecture", 
            "App Manifest Optimization",
            "Install Prompt Enhancement",
            "Background Sync System",
            "Push Notification Integration"
          ],
          deliverable: "Native-Like Progressive Web App",
          freeTools: ["Service Workers", "PWA Tools", "Browser APIs", "Workbox"],
          bonusFeatures: [
            "App store submission ready",
            "Automatic updates",
            "Offline data synchronization",
            "Native app shortcuts"
          ]
        },
        {
          title: "Mobile-First Excellence",
          tasks: [
            "Advanced Touch Optimization", 
            "Gesture-Based Navigation", 
            "Responsive Design Mastery",
            "Mobile Accessibility Features",
            "One-Handed Usage Optimization",
            "Mobile Camera Enhancements"
          ],
          deliverable: "Premium Mobile Experience",
          freeTools: ["CSS Media Queries", "Touch Events", "Responsive Design", "Mobile Testing"],
          bonusFeatures: [
            "Haptic feedback simulation",
            "Voice input integration",
            "Augmented reality food scanning",
            "Smart watch companion interface"
          ]
        },
        {
          title: "Offline & Sync Capabilities",
          tasks: [
            "Advanced Offline Data Storage", 
            "Intelligent Sync Algorithms", 
            "Offline Camera Processing",
            "Local AI Processing",
            "Conflict Resolution System",
            "Data Compression Techniques"
          ],
          deliverable: "Fully Offline-Capable App",
          freeTools: ["IndexedDB", "Local Storage", "Cache API", "Background Sync"],
          bonusFeatures: [
            "Offline meal planning",
            "Local recipe recommendations",
            "Offline progress tracking",
            "Smart data prioritization"
          ]
        },
        {
          title: "Performance & Optimization",
          tasks: [
            "Advanced Image Compression", 
            "Intelligent Lazy Loading", 
            "Code Splitting & Bundling",
            "Performance Monitoring",
            "Memory Management",
            "Battery Usage Optimization"
          ],
          deliverable: "Lightning-Fast Performance",
          freeTools: ["Browser APIs", "Lazy Loading", "Code Splitting", "Lighthouse"],
          bonusFeatures: [
            "Adaptive loading based on connection",
            "Predictive content loading",
            "Resource prioritization",
            "Performance analytics dashboard"
          ]
        }
      ],
      budget: "FREE",
      team: "Solo Developer + Performance Focus",
      kpis: ["95+ PWA Score", "2s Load Time", "100% Offline", "Battery Optimized"],
      totalFeatures: "24 Core + 16 Bonus = 40 Features"
    },
    {
      id: 6,
      title: "Polish, Community & Growth",
      icon: <Building className="w-6 h-6" />,
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      weeks: [
        {
          title: "UI/UX Excellence & Accessibility",
          tasks: [
            "Advanced Design Polish", 
            "Micro-Animations & Transitions", 
            "Complete Accessibility Compliance",
            "User Experience Testing",
            "Multi-Language Support",
            "Cultural Adaptation Features"
          ],
          deliverable: "World-Class User Interface",
          freeTools: ["CSS Animations", "Accessibility Tools", "i18n Libraries", "A11y Testing"],
          bonusFeatures: [
            "Dark/light/auto theme modes",
            "High contrast accessibility modes",
            "Screen reader optimization",
            "Keyboard navigation mastery"
          ]
        },
        {
          title: "Free Hosting & Global Deployment",
          tasks: [
            "Multi-Platform Deployment", 
            "CDN Integration", 
            "Global Performance Optimization",
            "Automated CI/CD Pipeline",
            "Error Monitoring & Logging",
            "A/B Testing Framework"
          ],
          deliverable: "Globally Accessible Live App",
          freeTools: ["Netlify", "Vercel", "GitHub Actions", "MongoDB Atlas Free", "Cloudflare"],
          bonusFeatures: [
            "Multiple deployment environments",
            "Automatic scaling",
            "Global edge caching",
            "Real-time performance monitoring"
          ]
        },
        {
          title: "Open Source & Documentation",
          tasks: [
            "Complete GitHub Repository", 
            "Comprehensive Documentation", 
            "API Documentation",
            "Contributing Guidelines",
            "Code Architecture Documentation",
            "Developer Tutorials"
          ],
          deliverable: "Professional Open Source Project",
          freeTools: ["GitHub", "Markdown", "GitHub Pages", "Documentation Tools"],
          bonusFeatures: [
            "Interactive code examples",
            "Video tutorial series",
            "Developer community forums",
            "Plugin/extension system"
          ]
        },
        {
          title: "Community Growth & Ecosystem",
          tasks: [
            "Multi-Platform Community Building", 
            "User Feedback Systems", 
            "Feature Request Management",
            "Community Moderation Tools",
            "Partnership Programs",
            "Content Creator Support"
          ],
          deliverable: "Thriving Community Ecosystem",
          freeTools: ["GitHub Issues", "Discord", "Reddit", "Social Media", "Newsletter Tools"],
          bonusFeatures: [
            "Community-driven feature voting",
            "User-generated content rewards",
            "Ambassador program",
            "Developer hackathons"
          ]
        }
      ],
      budget: "FREE",
      team: "Solo Developer + Growing Community",
      kpis: ["10K+ Users", "4.8+ Rating", "1K+ GitHub Stars", "Active Community"],
      totalFeatures: "24 Core + 16 Bonus = 40 Features"
    }
  ];

  const totalBudget = "FREE (Only Time Investment)";

  const views = [
    { id: 'timeline', name: 'Timeline View', icon: <Calendar className="w-4 h-4" /> },
    { id: 'tools', name: 'Free Tools', icon: <Gift className="w-4 h-4" /> },
    { id: 'features', name: 'Features Scope', icon: <Target className="w-4 h-4" /> },
    { id: 'summary', name: 'Feature Summary', icon: <Plus className="w-4 h-4" /> }
  ];

  const freeTools = [
    {
      category: 'AI & APIs',
      tools: [
        { name: 'Gemini AI', tier: 'Free Tier', usage: '15 requests/minute', features: 'Food recognition, meal planning, health insights' },
        { name: 'USDA Food Database', tier: 'Free', usage: 'Unlimited', features: '50K+ food items with complete nutrition data' },
        { name: 'Spoonacular API', tier: 'Free Tier', usage: '150 requests/day', features: 'Recipe search, meal planning, ingredients' },
        { name: 'Edamam Nutrition API', tier: 'Free Tier', usage: '100 requests/month', features: 'Nutrition analysis, dietary restrictions' }
      ]
    },
    {
      category: 'Development Stack',
      tools: [
        { name: 'React', tier: 'Open Source', usage: 'Unlimited', features: 'Modern UI framework with hooks and context' },
        { name: 'FastAPI', tier: 'Open Source', usage: 'Unlimited', features: 'High-performance Python API framework' },
        { name: 'MongoDB Community', tier: 'Free', usage: '512MB', features: 'Document database with advanced queries' },
        { name: 'Chart.js', tier: 'Open Source', usage: 'Unlimited', features: 'Beautiful interactive charts and graphs' }
      ]
    },
    {
      category: 'Hosting & Services',
      tools: [
        { name: 'Netlify', tier: 'Free Tier', usage: '100GB bandwidth', features: 'Static site hosting with CI/CD' },
        { name: 'Vercel', tier: 'Free Tier', usage: 'Unlimited projects', features: 'Frontend hosting with edge functions' },
        { name: 'GitHub Pages', tier: 'Free', usage: '1GB storage', features: 'Static site hosting with custom domains' },
        { name: 'MongoDB Atlas', tier: 'Free Tier', usage: '512MB database', features: 'Cloud database with backups' }
      ]
    },
    {
      category: 'Additional Free Services',
      tools: [
        { name: 'Cloudflare', tier: 'Free', usage: 'Global CDN', features: 'Performance optimization and security' },
        { name: 'GitHub Actions', tier: 'Free', usage: '2000 minutes/month', features: 'Automated CI/CD pipelines' },
        { name: 'Discord', tier: 'Free', usage: 'Unlimited', features: 'Community building and support' },
        { name: 'Web Push API', tier: 'Browser Native', usage: 'Unlimited', features: 'Push notifications and engagement' }
      ]
    }
  ];

  const featureSummary = [
    {
      month: 1,
      title: "Foundation & Core Features",
      coreCount: 24,
      bonusCount: 16,
      highlights: [
        "Advanced camera system with multi-device support",
        "AI food recognition with confidence scoring",
        "Comprehensive user profiling with health metrics",
        "Advanced nutrition tracking with mood correlation"
      ]
    },
    {
      month: 2,
      title: "Food Database & Smart Meal Planning",
      coreCount: 24,
      bonusCount: 16,
      highlights: [
        "50K+ food database with barcode scanning",
        "Intelligent meal planning with budget optimization",
        "Recipe management with cooking timers",
        "Smart shopping lists with price comparison"
      ]
    },
    {
      month: 3,
      title: "Analytics & Health Insights",
      coreCount: 24,
      bonusCount: 16,
      highlights: [
        "AI-powered health analytics and predictions",
        "Professional data visualization and reporting",
        "Smart goal management with habit tracking",
        "Complete data export and integration hub"
      ]
    },
    {
      month: 4,
      title: "Gamification & Community",
      coreCount: 24,
      bonusCount: 16,
      highlights: [
        "100+ achievement badges with trading system",
        "Dynamic challenges and seasonal competitions",
        "Community features with recipe sharing",
        "Fully personalized user experience"
      ]
    },
    {
      month: 5,
      title: "Mobile & Performance Excellence",
      coreCount: 24,
      bonusCount: 16,
      highlights: [
        "Native-like PWA with offline capabilities",
        "Premium mobile experience with AR features",
        "Intelligent sync with conflict resolution",
        "Lightning-fast performance optimization"
      ]
    },
    {
      month: 6,
      title: "Polish, Community & Growth",
      coreCount: 24,
      bonusCount: 16,
      highlights: [
        "World-class UI/UX with accessibility compliance",
        "Global deployment with edge optimization",
        "Professional open source documentation",
        "Thriving community ecosystem with 10K+ users"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Free Tier Notice */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 border-2 border-green-200"
      >
        <div className="flex items-center gap-3 mb-2">
          <Gift className="w-8 h-8 text-green-600" />
          <h2 className="text-2xl font-bold text-green-800">🚀 EXPANDED 100% FREE Implementation Plan</h2>
        </div>
        <p className="text-green-700 text-lg mb-2">
          Complete nutrition app with <strong>240 ENHANCED FEATURES</strong> using only free tools, APIs, and open-source solutions!
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-green-600">
          <span>💡 240 Total Features</span>
          <span>🎯 144 Core Features</span>
          <span>✨ 96 Bonus Features</span>
          <span>💸 $0 Total Cost</span>
        </div>
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
                  <div className="text-left">
                    <div className="text-sm font-bold">Month {month.id}</div>
                    <div className="text-xs opacity-90">{month.totalFeatures}</div>
                  </div>
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
                              <span>👥 {month.team}</span>
                              <span>🎯 {month.totalFeatures}</span>
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
                              
                              {/* Core Tasks */}
                              <div className="mb-3">
                                <h5 className="text-xs font-medium text-blue-700 mb-1">🎯 Core Features:</h5>
                                <ul className="space-y-1">
                                  {week.tasks.map((task, taskIndex) => (
                                    <li key={taskIndex} className="flex items-start gap-2 text-sm text-gray-600">
                                      <ChevronRight className="w-3 h-3 mt-0.5 text-gray-400" />
                                      {task}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Bonus Features */}
                              {week.bonusFeatures && (
                                <div className="mb-3">
                                  <h5 className="text-xs font-medium text-purple-700 mb-1">✨ Bonus Features:</h5>
                                  <ul className="space-y-1">
                                    {week.bonusFeatures.map((feature, featureIndex) => (
                                      <li key={featureIndex} className="flex items-start gap-2 text-sm text-purple-600">
                                        <Plus className="w-3 h-3 mt-0.5 text-purple-400" />
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              <div className="p-2 bg-green-50 rounded-lg border border-green-200 mb-2">
                                <span className="text-xs font-medium text-green-700">📋 {week.deliverable}</span>
                              </div>
                              
                              <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                                <span className="text-xs font-medium text-blue-700">
                                  🆓 Free Tools: {week.freeTools.join(', ')}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-6">🆓 Enhanced Free Tools & APIs Stack</h3>
              
              {freeTools.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{category.category}</h4>
                  <div className="grid md:grid-cols-1 gap-4">
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
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            {tool.tier}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          <strong>Usage:</strong> {tool.usage}
                        </div>
                        <div className="text-xs text-gray-500">
                          <strong>Features:</strong> {tool.features}
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
              <h3 className="text-2xl font-bold text-gray-800 mb-6">🎯 240 Enhanced Features Breakdown</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-800">✅ Core Feature Categories</h4>
                  {[
                    { category: 'Camera & AI Recognition', count: 24, description: 'Advanced food scanning with multi-item detection' },
                    { category: 'User Management', count: 24, description: 'Comprehensive profiles with health tracking' },
                    { category: 'Nutrition Tracking', count: 24, description: 'Smart logging with mood correlation' },
                    { category: 'Meal Planning', count: 24, description: 'AI-powered planning with budget optimization' },
                    { category: 'Analytics & Reports', count: 24, description: 'Health insights and predictive analytics' },
                    { category: 'Mobile & Performance', count: 24, description: 'PWA excellence with offline capabilities' }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {feature.count}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{feature.category}</div>
                        <div className="text-sm text-gray-600">{feature.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-purple-800">✨ Bonus Feature Categories</h4>
                  {[
                    { category: 'Advanced Camera Features', count: 16, description: 'AR scanning, batch capture, quality optimization' },
                    { category: 'Smart Recipe System', count: 16, description: 'Cooking timers, substitutions, cost tracking' },
                    { category: 'Community Features', count: 16, description: 'Recipe sharing, contests, mentorship' },
                    { category: 'Gamification', count: 16, description: '100+ badges, trading, seasonal events' },
                    { category: 'Accessibility & i18n', count: 16, description: 'Multi-language, screen reader, high contrast' },
                    { category: 'Developer Tools', count: 16, description: 'API docs, plugins, community tools' }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200"
                    >
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {feature.count}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{feature.category}</div>
                        <div className="text-sm text-gray-600">{feature.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">📊 Month-by-Month Feature Summary</h3>
              
              <div className="space-y-6">
                {featureSummary.map((month, index) => (
                  <motion.div
                    key={month.month}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                        {month.month}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{month.title}</h4>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {month.coreCount} Core Features
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            {month.bonusCount} Bonus Features
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      {month.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-start gap-2 text-sm text-gray-700">
                          <ChevronRight className="w-3 h-3 mt-0.5 text-gray-400" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Total Summary */}
              <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl border-2 border-green-200">
                <h4 className="text-xl font-bold text-gray-800 mb-3">🎯 Total Project Scope</h4>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-green-600">240</div>
                    <div className="text-sm text-gray-600">Total Features</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">144</div>
                    <div className="text-sm text-gray-600">Core Features</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">96</div>
                    <div className="text-sm text-gray-600">Bonus Features</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-green-600">$0</div>
                    <div className="text-sm text-gray-600">Total Cost</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl p-8 text-white text-center"
      >
        <h3 className="text-2xl font-bold mb-4">🚀 Ready to Build 240 Features for FREE?</h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          This comprehensive plan includes advanced features like AR food scanning, AI health insights, 
          community features, and professional analytics - all using free tools and APIs!
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
          <span className="px-3 py-1 bg-white/20 rounded-full">📱 PWA Ready</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">🏆 100+ Badges</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">🌍 Multi-Language</span>
          <span className="px-3 py-1 bg-white/20 rounded-full">♿ Accessible</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-green-600 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          Start Building 240 Features 🎯
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WorkflowVisualization;