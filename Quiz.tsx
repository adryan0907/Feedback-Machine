'use client'

import React, { useState } from 'react'
import { QuestionCard } from './components/QuestionCard'
import { questions } from './data/questions'
import type { Question } from './types/quiz'

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer])
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Handle quiz completion
      console.log('Quiz completed!', answers)
    }
  }

  // Add console.log to debug
  console.log('Questions:', questions)
  console.log('Current Question:', questions[currentQuestionIndex])

  return (
    <div className="min-h-screen py-12">
      {Array.isArray(questions) && questions.length > 0 ? (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          currentQuestion={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      ) : (
        <div className="text-center p-4">
          <p className="text-muted-foreground">No questions available</p>
        </div>
      )}
    </div>
  )
}

