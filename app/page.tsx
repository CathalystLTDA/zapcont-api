/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

type HealthCheckResponse = {
  status: 'ok'
  dbConnection: boolean
  serverTime: string
}

type UserCountResponse = {
  status: 'ok' | 'error'
  count?: number
  message?: string
  timestamp: string
}

export default function Home() {
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null)
  const [userCountData, setUserCountData] = useState<UserCountResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch both health and user count data in parallel
        const [healthRes, countRes] = await Promise.all([
          fetch('/api/health'),
          fetch('/api/users/count')
        ])
        
        if (!healthRes.ok) throw new Error('Failed to fetch health data')
        if (!countRes.ok) throw new Error('Failed to fetch user count data')
        
        const healthData = await healthRes.json()
        const countData = await countRes.json()
        
        setHealthData(healthData)
        setUserCountData(countData)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-gray-900 dark:text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-bold text-4xl mb-8"
        >
          Seu João Status
        </motion.h1>

        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl"
          >
            Loading system data...
          </motion.p>
        ) : error ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl text-red-500"
          >
            Error: {error}
          </motion.p>
        ) : healthData ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 max-w-md text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl font-semibold mb-4"
            >
              {healthData.status === 'ok' ? 'All Systems Operational' : 'Systems Down'}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-2"
            >
              <span className="font-medium">Database Connection:</span>{' '}
              {healthData.dbConnection ? (
                <span className="text-green-600">Healthy</span>
              ) : (
                <span className="text-red-600">Unhealthy</span>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-2"
            >
              <span className="font-medium">Server Time:</span>{' '}
              {new Date(healthData.serverTime).toLocaleString()}
            </motion.div>
            
            {userCountData && userCountData.status === 'ok' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <span className="font-medium">Registered Users:</span>{' '}
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  {userCountData.count?.toLocaleString() || 0}
                </span>
              </motion.div>
            )}
          </motion.div>
        ) : null}
      </main>
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-4 max-w-md mx-auto mb-8">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition duration-300"
          onClick={() => window.location.href = '/dashboard'}
          whileTap={{ scale: 0.95 }}
          whileFocus={{ scale: 1.05 }}
        >
          Acessar o Painel
        </motion.button>
      </div>
    </div>
  )
}
