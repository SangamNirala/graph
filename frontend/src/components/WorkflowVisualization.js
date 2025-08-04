import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  Calendar, 
  Users, 
  DollarSign, 
  Target, 
  Zap,
  Brain,
  Smartphone,
  CreditCard,
  Globe,
  Building
} from "lucide-react";

const WorkflowVisualization = () => {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [activeView, setActiveView] = useState('timeline');

  const months = [
    {
      id: 1,
      title: "Foundation MVP",
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      weeks: [
        {
          title: "Tech Setup & Architecture",
          tasks: ["Project Setup", "Database Design", "Security Framework", "API Documentation"],
          deliverable: "Development Environment Ready"
        },
        {
          title: "Camera & AI Integration", 
          tasks: ["Camera Functionality", "Gemini AI Setup", "Food Recognition", "Nutrition Analysis"],
          deliverable: "Working Food Scanner"
        },
        {
          title: "User Management",
          tasks: ["User Profiles", "BMR Calculations", "Goal Setting", "Daily Tracking"],
          deliverable: "User Profile System"
        },
        {
          title: "MVP Testing",
          tasks: ["QA Testing", "Bug Fixes", "Performance", "Integration Tests"],
          deliverable: "Functional MVP"
        }
      ],
      budget: "$60K",
      team: "Full Team (10)",
      kpis: ["95% Uptime", "Camera Works", "AI 80% Accuracy", "User Registration"]
    },
    {
      id: 2,
      title: "AI Enhancement", 
      icon: <Brain className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      weeks: [
        {
          title: "Food Database Expansion",
          tasks: ["10K+ Food Items", "Barcode Scanning", "Restaurant Menus", "International Cuisine"],
          deliverable: "Comprehensive Food Database"
        },
        {
          title: "Advanced AI Recognition",
          tasks: ["Multi-food Detection", "Portion Estimation", "Quality Assessment", "Ingredient Breakdown"],
          deliverable: "90% AI Accuracy"
        },
        {
          title: "Meal Planning Engine",
          tasks: ["AI Meal Plans", "Dietary Restrictions", "Budget Planning", "Seasonal Preferences"],
          deliverable: "Personalized Meal Plans"
        },
        {
          title: "Smart Recommendations",
          tasks: ["Recipe Discovery", "Nutritional Matching", "Skill Adaptation", "Family Scaling"],
          deliverable: "Beta Testing Ready"
        }
      ],
      budget: "$65K",
      team: "AI Focus (12)",
      kpis: ["90% AI Accuracy", "5+ Scans/Day", "Meal Plan Usage", "User Satisfaction"]
    },
    {
      id: 3,
      title: "Advanced Features",
      icon: <Target className="w-6 h-6" />,
      color: "from-green-500 to-teal-500", 
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      weeks: [
        {
          title: "Health Analytics",
          tasks: ["Nutritional Insights", "Deficiency Detection", "Blood Sugar Prediction", "Health Scoring"],
          deliverable: "Advanced Analytics"
        },
        {
          title: "Progress Tracking",
          tasks: ["Weight Predictions", "Body Composition", "Habit Tracking", "Milestone Celebrations"],
          deliverable: "Progress Dashboard"
        },
        {
          title: "Social Features",
          tasks: ["User Profiles", "Recipe Sharing", "Community Challenges", "Expert Q&A"],
          deliverable: "Social Platform"
        },
        {
          title: "Gamification",
          tasks: ["Achievement Badges", "Streak Tracking", "Leaderboards", "Virtual Rewards"],
          deliverable: "Engagement System"
        }
      ],
      budget: "$70K",
      team: "Full Stack (12)",
      kpis: ["70% DAU", "60% Retention", "Social Engagement", "Challenge Participation"]
    },
    {
      id: 4,
      title: "Business Platform",
      icon: <CreditCard className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50", 
      borderColor: "border-orange-200",
      weeks: [
        {
          title: "Subscription System",
          tasks: ["Multi-tier Plans", "Stripe Integration", "Billing Management", "Promo Codes"],
          deliverable: "Monetization Ready"
        },
        {
          title: "Payment Processing",
          tasks: ["International Payments", "Revenue Analytics", "Refund System", "Tax Compliance"],
          deliverable: "Payment Gateway"
        },
        {
          title: "Professional Tools",
          tasks: ["Coach Dashboard", "Client Management", "Progress Monitoring", "Communication Platform"],
          deliverable: "B2B Features"
        },
        {
          title: "Healthcare Integration",
          tasks: ["Medical Portal", "HIPAA Compliance", "Clinical Data", "Health Records"],
          deliverable: "Healthcare Ready"
        }
      ],
      budget: "$80K",
      team: "Business Focus (12)",
      kpis: ["15% Conversion", "$150 LTV", "5% Churn", "Revenue Growth"]
    },
    {
      id: 5,
      title: "Advanced AI",
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200", 
      weeks: [
        {
          title: "Predictive Analytics",
          tasks: ["Disease Risk Assessment", "Optimal Timing", "Supplement Engine", "Genetic Integration"],
          deliverable: "Predictive Health"
        },
        {
          title: "Smart Shopping",
          tasks: ["Grocery Optimization", "Price Comparison", "Meal Prep Scheduling", "Inventory Management"],
          deliverable: "Smart Shopping"
        },
        {
          title: "Wearable Integration", 
          tasks: ["Apple Health", "Fitbit", "Heart Rate Data", "Sleep Correlation"],
          deliverable: "Device Ecosystem"
        },
        {
          title: "Smart Home",
          tasks: ["Alexa/Google", "Smart Scales", "Kitchen Appliances", "Voice Commands"],
          deliverable: "IoT Integration"
        }
      ],
      budget: "$90K",
      team: "AI + IoT (12)",
      kpis: ["Device Connections", "Prediction Accuracy", "Voice Usage", "Shopping Integration"]
    },
    {
      id: 6,
      title: "Enterprise Scaling",
      icon: <Building className="w-6 h-6" />,
      color: "from-gray-600 to-gray-800",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      weeks: [
        {
          title: "Performance & Scale",
          tasks: ["Microservices", "CDN Integration", "Database Sharding", "Caching Strategies"],
          deliverable: "Scalable Architecture"
        },
        {
          title: "AI Optimization",
          tasks: ["Custom Models", "Edge Computing", "Multi-language", "Regional Cuisine"],
          deliverable: "Optimized AI"
        },
        {
          title: "Enterprise Features",
          tasks: ["Corporate Wellness", "Bulk Management", "White-label", "API Access"],
          deliverable: "Enterprise Ready"
        },
        {
          title: "Global Launch",
          tasks: ["DNA Integration", "Blood Work", "Life-stage Nutrition", "Global Compliance"],
          deliverable: "Global Platform"
        }
      ],
      budget: "$85K", 
      team: "Enterprise (15)",
      kpis: ["Global Scale", "Enterprise Clients", "API Usage", "White-label Adoption"]
    }
  ];

  const totalBudget = months.reduce((sum, month) => sum + parseInt(month.budget.replace('$', '').replace('K', '')), 0);

  const views = [
    { id: 'timeline', name: 'Timeline View', icon: <Calendar className="w-4 h-4" /> },
    { id: 'team', name: 'Team Allocation', icon: <Users className="w-4 h-4" /> },
    { id: 'budget', name: 'Budget Breakdown', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'dependencies', name: 'Dependencies', icon: <Globe className="w-4 h-4" /> }
  ];

  const teamData = [
    { role: 'Frontend Developers', count: 3, months: [1,2,3,4,5,6] },
    { role: 'Backend Developers', count: 3, months: [1,2,3,4,5,6] },
    { role: 'AI/ML Engineers', count: 2, months: [2,3,4,5,6] },
    { role: 'DevOps Engineers', count: 2, months: [1,2,3,4,5,6] },
    { role: 'QA Engineers', count: 2, months: [1,2,3,4,5,6] },
    { role: 'UI/UX Designers', count: 2, months: [1,2,3,4] },
    { role: 'Business Analysts', count: 1, months: [4,5,6] }
  ];

  return (
    <div className="space-y-8">
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
                              <span>👥 {month.team}</span>
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
                              <div className="p-2 bg-green-50 rounded-lg border border-green-200">
                                <span className="text-xs font-medium text-green-700">📋 {week.deliverable}</span>
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

            {/* Timeline Overview */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📅 Complete Timeline Overview</h3>
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
                        Budget: {month.budget} • Team: {month.team}
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

        {activeView === 'team' && (
          <motion.div
            key="team"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">👥 Team Allocation Across Months</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Role</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-800">Count</th>
                      {months.map(month => (
                        <th key={month.id} className="text-center py-3 px-2 font-semibold text-gray-800">
                          M{month.id}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {teamData.map((team, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium text-gray-700">{team.role}</td>
                        <td className="text-center py-4 px-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full font-semibold">
                            {team.count}
                          </span>
                        </td>
                        {months.map(month => (
                          <td key={month.id} className="text-center py-4 px-2">
                            {team.months.includes(month.id) ? (
                              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
                            ) : (
                              <div className="w-4 h-4 bg-gray-200 rounded-full mx-auto"></div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  <span>Not Required</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'budget' && (
          <motion.div
            key="budget"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">💰 Budget Breakdown</h3>
              
              <div className="mb-8 text-center">
                <div className="text-4xl font-bold text-green-600">${totalBudget}K</div>
                <p className="text-gray-600 mt-1">Total Project Budget</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {months.map((month) => (
                  <motion.div
                    key={month.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl ${month.bgColor} ${month.borderColor} border`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {month.icon}
                      <span className="font-semibold text-gray-800">Month {month.id}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{month.budget}</div>
                    <div className="text-sm text-gray-600 mt-1">{month.title}</div>
                  </motion.div>
                ))}
              </div>

              {/* Budget Categories */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Cost Categories</h4>
                  {[
                    { name: 'Development Team', percentage: 60, amount: `$${Math.round(totalBudget * 0.6)}K` },
                    { name: 'Infrastructure', percentage: 10, amount: `$${Math.round(totalBudget * 0.1)}K` },
                    { name: 'Marketing', percentage: 20, amount: `$${Math.round(totalBudget * 0.2)}K` },
                    { name: 'Legal & Compliance', percentage: 10, amount: `$${Math.round(totalBudget * 0.1)}K` }
                  ].map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                        <span className="text-sm font-semibold text-gray-800">{category.amount}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${category.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Monthly Distribution</h4>
                  <div className="h-64 flex items-end gap-2">
                    {months.map((month, index) => {
                      const budgetValue = parseInt(month.budget.replace('$', '').replace('K', ''));
                      const maxBudget = Math.max(...months.map(m => parseInt(m.budget.replace('$', '').replace('K', ''))));
                      const height = (budgetValue / maxBudget) * 100;
                      
                      return (
                        <div key={month.id} className="flex-1 flex flex-col items-center">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`w-full bg-gradient-to-t ${month.color} rounded-t-lg`}
                          />
                          <div className="text-xs font-medium text-gray-600 mt-2">M{month.id}</div>
                          <div className="text-xs text-gray-500">{month.budget}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'dependencies' && (
          <motion.div
            key="dependencies"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">🔗 Project Dependencies & Critical Path</h3>
              
              {/* Critical Path */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-800 mb-4">Critical Path</h4>
                <div className="flex flex-wrap gap-4 items-center">
                  {months.map((month, index) => (
                    <React.Fragment key={month.id}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${month.color} text-white font-medium`}
                      >
                        {month.icon}
                        <span className="text-sm">M{month.id}: {month.title}</span>
                      </motion.div>
                      {index < months.length - 1 && (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Parallel Streams */}
              <div className="space-y-6">
                <h4 className="font-semibold text-gray-800">Parallel Development Streams</h4>
                
                {[
                  {
                    name: 'Frontend Development',
                    color: 'from-blue-500 to-cyan-500',
                    items: ['UI Setup', 'AI Interface', 'Social Features', 'Payment Flow', 'Wearable Sync', 'Enterprise UI']
                  },
                  {
                    name: 'Backend Development', 
                    color: 'from-green-500 to-teal-500',
                    items: ['API Server', 'AI Engine', 'Analytics', 'Business Logic', 'Ecosystem Connect', 'Microservices']
                  },
                  {
                    name: 'AI/ML Development',
                    color: 'from-purple-500 to-pink-500', 
                    items: ['Basic Setup', 'Advanced Training', 'Predictive Analytics', 'Business AI', 'Smart Learning', 'Advanced Personalization']
                  }
                ].map((stream, streamIndex) => (
                  <div key={streamIndex} className="space-y-2">
                    <h5 className={`font-medium bg-gradient-to-r ${stream.color} bg-clip-text text-transparent`}>
                      {stream.name}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {stream.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: streamIndex * 0.2 + itemIndex * 0.1 }}
                          className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-700 border border-gray-200"
                        >
                          Month {itemIndex + 1}: {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Risk Mitigation */}
              <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Risk Mitigation</h4>
                <ul className="space-y-1 text-sm text-yellow-700">
                  <li>• Each month builds on previous - no parallel critical path risks</li>
                  <li>• AI accuracy testing in Month 2 prevents downstream issues</li>
                  <li>• Business logic testing in Month 4 validates monetization</li>
                  <li>• Performance testing throughout prevents scaling bottlenecks</li>
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
        className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-2xl p-8 text-white text-center"
      >
        <h3 className="text-2xl font-bold mb-4">🚀 Ready to Start Building?</h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          This comprehensive workflow ensures systematic development of your subscription-based nutrition app. 
          Each phase builds upon the previous, with clear deliverables and success metrics.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          Begin Implementation 🎯
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WorkflowVisualization;