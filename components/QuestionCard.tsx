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
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <motion.h2 
        className="text-6xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Question {currentQuestion + 1}
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-8">
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswer(option)}
            className="group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="bg-[#8CD6E8] rounded-2xl p-6 transform transition-transform group-hover:scale-105">
              <h3 className="text-xl font-bold mb-2">ANSWER</h3>
              <p className="text-lg">{option}</p>
            </div>
          </motion.button>
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