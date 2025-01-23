'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { questions } from '../utils/questions'
import { Bar } from 'react-chartjs-2'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface Answer {
  answers: string[]
  timestamp: string
  pixelsEarned: number
}

export default function AdminPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Answer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedQuestion, setSelectedQuestion] = useState(0)

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await fetch('/api/answers')
        if (!response.ok) throw new Error('Failed to fetch answers')
        const data = await response.json()
        setAnswers(data.answers)
      } catch (err) {
        setError('Failed to load answers')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnswers()
  }, [])

  // Calculate statistics for visualization
  const stats = useMemo(() => {
    if (!answers.length) return null

    const questionStats = questions.map((q, qIndex) => {
      const responses: { [key: string]: number } = {}
      let totalResponses = 0

      answers.forEach(answer => {
        if (answer.answers[qIndex]) {
          responses[answer.answers[qIndex]] = (responses[answer.answers[qIndex]] || 0) + 1
          totalResponses++
        }
      })

      return {
        question: q.question,
        responses,
        totalResponses
      }
    })

    return questionStats
  }, [answers])

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!stats) return null

    const currentStats = stats[selectedQuestion]
    const data = {
      labels: Object.keys(currentStats.responses),
      datasets: [
        {
          label: 'Number of Responses',
          data: Object.values(currentStats.responses),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }

    return data
  }, [stats, selectedQuestion])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto relative">
        {/* Back Button */}
        <motion.button
          className="fixed top-4 right-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group z-50"
          onClick={() => router.push('/')}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <X className="w-6 h-6 text-gray-800 group-hover:text-[#8CD6E8]" />
        </motion.button>

        <motion.h1 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Response Analytics
        </motion.h1>

        {/* Visualization Section */}
        {stats && chartData && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Question
              </label>
              <select
                value={selectedQuestion}
                onChange={(e) => setSelectedQuestion(Number(e.target.value))}
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {questions.slice(0, 5).map((q, i) => (
                  <option key={i} value={i}>
                    Question {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                {questions[selectedQuestion].question}
              </h2>
              <p className="text-gray-600 mb-4">
                Total Responses: {stats[selectedQuestion].totalResponses}
              </p>
            </div>

            <div className="h-[400px]">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                      text: 'Response Distribution',
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}

        {/* Raw Data Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Raw Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  {questions.slice(0, 5).map((q, i) => (
                    <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question {i + 1}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pixels Earned
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {answers.map((answer, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(answer.timestamp).toLocaleString()}
                    </td>
                    {answer.answers.slice(0, 5).map((ans, i) => (
                      <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {ans || 'Skipped'}
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {answer.pixelsEarned}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {answers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No responses yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 