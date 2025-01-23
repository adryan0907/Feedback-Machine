import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface QuestionCardProps {
  question: string
  options: string[]
  onAnswer: (answer: string) => void
  currentQuestion: number
  totalQuestions: number
  answeredCount: number
}

export function QuestionCard({ question, options, onAnswer, currentQuestion, totalQuestions, answeredCount }: QuestionCardProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-white to-gray-50">
      {/* Add decorative elements in the background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#8CD6E8] rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#8CD6E8] rounded-full opacity-10 blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-24 h-64 bg-[#8CD6E8] rounded-full opacity-5 blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-24 h-64 bg-[#8CD6E8] rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="w-full max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex justify-center items-center gap-4">
            <motion.div
              className="px-4 py-2 bg-[#8CD6E8] bg-opacity-20 rounded-full text-sm font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              Pixels Earned: {answeredCount} {currentQuestion >= 5 && answeredCount > 0 && "+ Bonus!"}
            </motion.div>
            {currentQuestion >= 5 && (
              <motion.div
                className="px-4 py-2 bg-[#8CD6E8] bg-opacity-20 rounded-full text-sm font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                Answer for +2 Extra Pixels!
              </motion.div>
            )}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {question}
          </h2>
          
          <div className="w-full max-w-md mx-auto">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#8CD6E8]"
                initial={{ width: `${((currentQuestion) / totalQuestions) * 100}%` }}
                animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-gray-600 mt-2 text-sm">
              Question {currentQuestion + 1} of {totalQuestions}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
          {options.map((option, index) => (
            <motion.button
              key={option}
              onClick={() => onAnswer(option)}
              className="p-6 rounded-2xl bg-white border-2 border-[#8CD6E8] text-gray-800 
                hover:bg-[#8CD6E8] hover:text-white hover:border-transparent
                transition-all duration-300 ease-out group shadow-sm hover:shadow-md
                flex items-center justify-center text-center min-h-[120px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="text-xl font-medium group-hover:text-white">
                  {option}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => onAnswer('skip')}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center gap-2 transition-colors"
          >
            Skip this question
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Add decorative dots */}
        <div className="absolute top-1/4 left-4 w-2 h-2 bg-[#8CD6E8] rounded-full opacity-50" />
        <div className="absolute top-3/4 right-4 w-2 h-2 bg-[#8CD6E8] rounded-full opacity-50" />
        <div className="absolute bottom-1/4 left-8 w-3 h-3 bg-[#8CD6E8] rounded-full opacity-30" />
      </div>
    </div>
  )
}

