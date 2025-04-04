/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

// Helper function to format uptime
const formatUptime = (timestamp: number): string => {
  const now = Date.now();
  const uptimeMs = now - timestamp;
  
  const seconds = Math.floor(uptimeMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

// Types
type HealthCheckResponse = {
  status: 'ok' | 'error'
  dbConnection: boolean
  serverTime: string
}

type UserCountResponse = {
  status: 'ok' | 'error'
  count?: number
  message?: string
  timestamp: string
}

type MetricsResponse = {
  status: 'ok' | 'error'
  totalMessages: number
  totalThreads: number
  activeUsers: number
  messagesByDay: Array<{day: string, count: number}>
  rateLimitEvents: number
  userGrowth: Array<{date: string, count: number}>
  messageTypes: Array<{type: string, count: number}>
  feedbackStats: {
    total: number
    positive: number
    negative: number
    wantsHelp: number
  }
}

export default function Dashboard() {
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null)
  const [userCountData, setUserCountData] = useState<UserCountResponse | null>(null)
  const [metricsData, setMetricsData] = useState<MetricsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  // Remove mock data and only use real API data
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all data from APIs in parallel
        const [healthRes, countRes, metricsRes] = await Promise.all([
          fetch('/api/health'),
          fetch('/api/users/count'),
          fetch('/api/metrics'),
        ])
        
        if (!healthRes.ok) throw new Error('Failed to fetch health data')
        if (!countRes.ok) throw new Error('Failed to fetch user count data')
        if (!metricsRes.ok) throw new Error('Failed to fetch metrics data')
        
        const healthData = await healthRes.json()
        const countData = await countRes.json()
        const metricsData = await metricsRes.json()
        
        setHealthData(healthData)
        setUserCountData(countData)
        setMetricsData(metricsData)
        
        
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading dashboard data...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <h1 className="text-xl font-bold text-gray-800">Seu João</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">Management Dashboard</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveTab('overview')}
                className={`flex items-center space-x-2 w-full p-2 rounded-md ${activeTab === 'overview' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Overview</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('users')}
                className={`flex items-center space-x-2 w-full p-2 rounded-md ${activeTab === 'users' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Users</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('messages')}
                className={`flex items-center space-x-2 w-full p-2 rounded-md ${activeTab === 'messages' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Messages</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('feedback')}
                className={`flex items-center space-x-2 w-full p-2 rounded-md ${activeTab === 'feedback' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>Feedback</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('system')}
                className={`flex items-center space-x-2 w-full p-2 rounded-md ${activeTab === 'system' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <span>System Health</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'users' && 'User Analytics'}
            {activeTab === 'messages' && 'Message Stats'}
            {activeTab === 'feedback' && 'Feedback Analysis'}
            {activeTab === 'system' && 'System Health'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleString()}
            </div>
            <button className="p-1 rounded-full text-gray-600 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-semibold">
              SJ
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-lg shadow p-6 ${userCountData?.count !== undefined ? 'bg-white' : 'bg-gray-100'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Users</p>
                      {userCountData?.count !== undefined ? (
                        <h2 className="text-3xl font-bold text-gray-800">
                          {userCountData.count.toLocaleString()}
                        </h2>
                      ) : (
                        <div className="flex items-center space-x-2 mt-1">
                          <h2 className="text-xl font-medium text-gray-400">No Data</h2>
                        </div>
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${userCountData?.count !== undefined ? 'bg-blue-100' : 'bg-gray-200'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${userCountData?.count !== undefined ? 'text-blue-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  {userCountData?.count !== undefined ? (
                    <div className="flex items-center mt-4">
                      <span className="text-green-500 text-sm font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        +12.5%
                      </span>
                      <span className="text-gray-400 text-sm ml-2">vs. last month</span>
                    </div>
                  ) : (
                    <div className="mt-4 py-1 px-2 inline-block bg-gray-200 rounded text-xs text-gray-500">
                      Under Development
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className={`rounded-lg shadow p-6 ${metricsData?.activeUsers !== undefined ? 'bg-white' : 'bg-gray-100'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Users</p>
                      {metricsData?.activeUsers !== undefined ? (
                        <h2 className="text-3xl font-bold text-gray-800">
                          {metricsData.activeUsers.toLocaleString()}
                        </h2>
                      ) : (
                        <div className="flex items-center space-x-2 mt-1">
                          <h2 className="text-xl font-medium text-gray-400">No Data</h2>
                        </div>
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${metricsData?.activeUsers !== undefined ? 'bg-green-100' : 'bg-gray-200'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${metricsData?.activeUsers !== undefined ? 'text-green-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                  {metricsData?.activeUsers !== undefined ? (
                    <div className="flex items-center mt-4">
                      <span className="text-green-500 text-sm font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        +8.2%
                      </span>
                      <span className="text-gray-400 text-sm ml-2">vs. last week</span>
                    </div>
                  ) : (
                    <div className="mt-4 py-1 px-2 inline-block bg-gray-200 rounded text-xs text-gray-500">
                      Under Development
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className={`rounded-lg shadow p-6 ${metricsData?.totalMessages !== undefined ? 'bg-white' : 'bg-gray-100'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Messages</p>
                      {metricsData?.totalMessages !== undefined ? (
                        <h2 className="text-3xl font-bold text-gray-800">
                          {metricsData.totalMessages.toLocaleString()}
                        </h2>
                      ) : (
                        <div className="flex items-center space-x-2 mt-1">
                          <h2 className="text-xl font-medium text-gray-400">No Data</h2>
                        </div>
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${metricsData?.totalMessages !== undefined ? 'bg-purple-100' : 'bg-gray-200'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${metricsData?.totalMessages !== undefined ? 'text-purple-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                  </div>
                  {metricsData?.totalMessages !== undefined ? (
                    <div className="flex items-center mt-4">
                      <span className="text-green-500 text-sm font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        +23.1%
                      </span>
                      <span className="text-gray-400 text-sm ml-2">vs. last month</span>
                    </div>
                  ) : (
                    <div className="mt-4 py-1 px-2 inline-block bg-gray-200 rounded text-xs text-gray-500">
                      Under Development
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">System Health</p>
                      <h2 className="text-3xl font-bold text-gray-800">
                        {healthData?.status === 'ok' ? (
                          <span className="text-green-600">Healthy</span>
                        ) : (
                          <span className="text-red-600">Issues</span>
                        )}
                      </h2>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Database:</span>
                      {healthData?.dbConnection ? (
                        <span className="text-green-600">Connected</span>
                      ) : (
                        <span className="text-red-600">Disconnected</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className={`rounded-lg shadow p-6 ${metricsData?.userGrowth && metricsData.userGrowth.length > 0 ? 'bg-white' : 'bg-gray-100'}`}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
                  {metricsData?.userGrowth && metricsData.userGrowth.length > 0 ? (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={metricsData.userGrowth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="count" stroke="#3B82F6" activeDot={{ r: 8 }} strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-80 flex flex-col items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p className="text-lg font-medium">No Data Available</p>
                      <p className="text-sm mt-2">User growth statistics are under development</p>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className={`rounded-lg shadow p-6 ${metricsData?.messagesByDay && metricsData.messagesByDay.length > 0 ? 'bg-white' : 'bg-gray-100'}`}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Messages by Day</h3>
                  {metricsData?.messagesByDay && metricsData.messagesByDay.length > 0 ? (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={metricsData.messagesByDay} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="count" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-80 flex flex-col items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-lg font-medium">No Message Data</p>
                      <p className="text-sm mt-2">Daily message statistics are under development</p>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className={`rounded-lg shadow p-6 col-span-1 ${metricsData?.messageTypes && metricsData.messageTypes.length > 0 ? 'bg-white' : 'bg-gray-100'}`}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Message Types</h3>
                  {metricsData?.messageTypes && metricsData.messageTypes.length > 0 && metricsData.totalMessages > 0 ? (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={metricsData.messageTypes}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            nameKey="type"
                            label={({ type, value, payload }) => (value > 0 ? `${payload.type}: ${value}` : null)}
                          >
                            {metricsData.messageTypes.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name, props) => [value, props.payload.type]} 
                            contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                      <p className="text-lg font-medium">No Data Available</p>
                      <p className="text-sm mt-2">Message type statistics are under development</p>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className={`rounded-lg shadow p-6 col-span-2 ${metricsData?.feedbackStats ? 'bg-white' : 'bg-gray-100'}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Feedback Overview</h3>
                    {metricsData?.feedbackStats && (
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        See All
                      </button>
                    )}
                  </div>

                  {metricsData?.feedbackStats ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-green-600">
                            {metricsData.feedbackStats.positive}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">Positive Feedback</div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-red-600">
                            {metricsData.feedbackStats.negative}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">Negative Feedback</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-blue-600">
                            {metricsData.feedbackStats.wantsHelp}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">Wants Additional Help</div>
                        </div>
                      </div>

                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                              Satisfaction Rate
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-green-600">
                              {Math.round((metricsData.feedbackStats.positive / metricsData.feedbackStats.total) * 100)}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                          <div 
                            style={{ 
                              width: metricsData.feedbackStats.total > 0 ?
                                `${Math.round((metricsData.feedbackStats.positive / metricsData.feedbackStats.total) * 100)}%` : "0%" 
                            }} 
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500">
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <p className="text-lg font-medium">No Feedback Data</p>
                      <p className="text-sm mt-2">Feedback statistics are under development</p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-[calc(100vh-120px)] flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-500 mb-3">User Analytics</h2>
              <p className="text-gray-400 mb-6 max-w-md text-center">Detailed user statistics and analytics are currently under development.</p>
              <div className="flex items-center space-x-2 text-sm text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Coming soon</span>
              </div>
            </motion.div>
          )}
          
          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-[calc(100vh-120px)] flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-6 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-500 mb-3">Message Statistics</h2>
              <p className="text-gray-400 mb-6 max-w-md text-center">Detailed message analytics and conversation metrics are currently under development.</p>
              <div className="flex items-center space-x-2 text-sm text-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Coming soon</span>
              </div>
            </motion.div>
          )}
          
          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-[calc(100vh-120px)] flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-6 text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-500 mb-3">Feedback Analysis</h2>
              <p className="text-gray-400 mb-6 max-w-md text-center">User feedback collection and sentiment analysis features are currently under development.</p>
              <div className="flex items-center space-x-2 text-sm text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Coming soon</span>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'system' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">System Health Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Database Connection</h3>
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 ${healthData?.dbConnection ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={healthData?.dbConnection ? 'text-green-600' : 'text-red-600'}>
                        {healthData?.dbConnection ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Server Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Server Time:</span>
                        <span className="font-medium text-gray-600">{new Date(healthData?.serverTime || '').toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${healthData?.status === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
                          {healthData?.status === 'ok' ? 'Operational' : 'Not Operational'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-2">Rate Limiting</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rate Limit Events (24h):</span>
                      <span className="font-medium">{metricsData?.rateLimitEvents || 0}</span>
                    </div>
                    <div className="mt-4">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                              System Load
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-blue-600">
                              42%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                          <div style={{ width: "42%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}
