'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { QuestionCard } from '@/components/QuestionCard'
import { StartPage } from '@/components/StartPage'
import { questions } from './utils/questions'
import PixelArt from '@/components/PixelArt'

const TOTAL_QUESTIONS = 5
const TOMASH_IMAGE = "https://i.ibb.co/rmc10Mt/ovodv-httpss-mj-run9g-LNTGXsh24-Happy-guy-standing-open-month-cd580a6c-5a38-44ca-9c27-3e549b9eee5b-0.png"

export default function Home() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [questionsCompleted, setQuestionsCompleted] = useState(false)
  const [pixelsEarned, setPixelsEarned] = useState(0)
  const [showEndImage, setShowEndImage] = useState(false)
  const [countdown, setCountdown] = useState(3)

  const handleStart = useCallback(() => {
    setGameStarted(true)
  }, [])

  const handleAnswer = useCallback((answer: string) => {
    setCurrentQuestionIndex((prev) => prev + 1)
    
    if (answer !== 'skip') {
      setAnswers((prev) => [...prev, answer])
      // Award 1 pixel for each answered question
      setPixelsEarned(prev => prev + 1)
      
      // Award 2 bonus pixels for questions beyond the first 5
      if (currentQuestionIndex >= 5) {
        setPixelsEarned(prev => prev + 2)
      }
    }
    
    // End questions after 10 questions or if user has answered at least 5 and chooses to skip
    if (currentQuestionIndex + 1 >= TOTAL_QUESTIONS || 
        (answer === 'skip' && currentQuestionIndex >= 4)) {
      setQuestionsCompleted(true)
      
      // If user earned no pixels (skipped all questions), show end screen directly
      if (pixelsEarned === 0) {
        setShowEndImage(true)
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              setTimeout(() => {
                window.location.href = '/'
              }, 500)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    }
  }, [currentQuestionIndex, pixelsEarned])

  if (showEndImage) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center transition-opacity duration-500">
          <motion.h1 
            className="text-5xl lg:text-6xl font-bold leading-tight mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Thank you for your <span className="text-[#8CD6E8]">participation</span>!
          </motion.h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Returning to start in <span className="font-bold">{countdown}</span> seconds...
          </p>

          <img
            src={TOMASH_IMAGE}
            alt="3D character mascot in yellow jacket"
            className="w-auto h-auto object-contain mx-auto"
            style={{ maxHeight: '60vh' }}
          />
        </div>
      </div>
    )
  }

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
                answeredCount={answers.length}
              />
            )}
            {questionsCompleted && !showEndImage && (
              <PixelArt pixelsEarned={pixelsEarned} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

