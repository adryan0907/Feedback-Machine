import React from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import type { QuestionCardProps } from '@/types/quiz'

export function QuestionCard({ question, onAnswer, currentQuestion, totalQuestions }: QuestionCardProps) {
  if (!question) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">Loading question...</p>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4">
      <motion.div 
        className="w-full text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-sm font-medium text-muted-foreground mb-2 block">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold">
          {question.text}
        </h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group relative overflow-hidden h-full">
              <div className="bg-background hover:bg-accent rounded-lg p-6 transition-all duration-200 h-full">
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <p className="text-lg">{option}</p>
                </div>
              </div>
            </Card>
          </motion.button>
        ))}
      </div>

      <div className="w-full max-w-2xl mx-auto relative h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-primary"
          initial={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}

