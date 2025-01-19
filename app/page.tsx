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

  const handleStart = useCallback(() => {
    setGameStarted(true)
  }, [])

  const handleAnswer = useCallback((answer: string) => {
    setAnswers((prev) => [...prev, answer])
    setCurrentQuestionIndex((prev) => prev + 1)
  }, [])

  const isQuestionsCompleted = currentQuestionIndex >= TOTAL_QUESTIONS

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={!gameStarted ? "start" : isQuestionsCompleted ? "pixel-art" : "question"}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {!gameStarted && (
              <StartPage onStart={handleStart} />
            )}
            {gameStarted && !isQuestionsCompleted && (
              <QuestionCard
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
                currentQuestion={currentQuestionIndex}
                totalQuestions={TOTAL_QUESTIONS}
              />
            )}
            {isQuestionsCompleted && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#0047AB] mb-8">
                  Congratulations! You've completed all {TOTAL_QUESTIONS} questions!
                </h2>
                <p className="text-xl text-[#0047AB] mb-8">
                  As a reward, you can now create your own pixel art!
                </p>
                <PixelArt />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

