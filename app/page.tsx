/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

type HealthCheckResponse = {
  status: 'ok'
  dbConnection: boolean
  serverTime: string
}

export default function Home() {
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHealth() {
      try {
        const res = await fetch('/api/health')
        if (!res.ok) throw new Error('Failed to fetch health data')
        const data = await res.json()
        setHealthData(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchHealth()
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
          Vercel + Neon Health Check
        </motion.h1>

        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl"
          >
            Loading health data...
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
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="font-medium">Server Time:</span>{' '}
              {new Date(healthData.serverTime).toLocaleString()}
            </motion.div>
          </motion.div>
        ) : null}
      </main>
    </div>
  )
}
