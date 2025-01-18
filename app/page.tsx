'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { QuestionCard } from '@/components/QuestionCard'
import { StartPage } from '@/components/StartPage'
import { questions } from './utils/questions'
import { PixelArt } from '@/components/PixelArt'

const TOTAL_QUESTIONS = 5

export default function Home() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [questionsCompleted, setQuestionsCompleted] = useState(false)

  const handleStart = useCallback(() => {
    setGameStarted(true)
  }, [])

  const handleAnswer = useCallback((answer: string) => {
    setAnswers((prev) => [...prev, answer])
    setCurrentQuestionIndex((prev) => prev + 1)
    if (currentQuestionIndex + 1 >= TOTAL_QUESTIONS) {
      setQuestionsCompleted(true)
    }
  }, [currentQuestionIndex])

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={!gameStarted ? "start" : questionsCompleted ? "pixel-art" : "questions"}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {!gameStarted && (
              <StartPage onStart={handleStart} />
            )}
            {gameStarted && !questionsCompleted && (
              <QuestionCard
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
                currentQuestion={currentQuestionIndex}
                totalQuestions={TOTAL_QUESTIONS}
              />
            )}
            {questionsCompleted && (
              <PixelArt />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

