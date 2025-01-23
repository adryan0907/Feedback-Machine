import React from 'react'
import { motion } from 'framer-motion'

interface QuestionCardProps {
  question: string
  options: string[]
  onAnswer: (answer: string) => void
  currentQuestion: number
  totalQuestions: number
}

export function QuestionCard({ question, options, onAnswer, currentQuestion, totalQuestions }: QuestionCardProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen mx-auto">
      <motion.h2 
        className="text-6xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {question}
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-8">
        {options.map((option, index) => (
          <button
            key={option}
            onClick={() => onAnswer(option)}
            className="w-full p-6 text-center rounded-2xl bg-[#8CD6E8] text-black font-medium 
              transform transition-all duration-300 ease-out
              hover:scale-[1.02] hover:brightness-105 hover:shadow-[0_0_15px_rgba(140,214,232,0.5)]
              active:scale-[0.98]
              focus:outline-none focus:ring-0"
            style={{
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <div className="text-xl">{option}</div>
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-red-500"
          initial={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

    </div>
  )
}

