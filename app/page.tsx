'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MicrogameContainer } from '@/components/MicrogameContainer'
import { QuestionCard } from '@/components/QuestionCard'
import { StartPage } from '@/components/StartPage'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { questions } from './utils/questions'

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showQuestion, setShowQuestion] = useState(false)
  const [gamesCompleted, setGamesCompleted] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [showEndMessage, setShowEndMessage] = useState(false)

  const handleStart = () => {
    setGameStarted(true)
  }

  const handleGameComplete = (success: boolean) => {
    setGamesCompleted((prev) => prev + 1)
    setShowQuestion(true)
  }

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer])
    setShowQuestion(false)
    setCurrentQuestionIndex((prev) => prev + 1)
    if (currentQuestionIndex + 1 >= questions.length) {
      setShowEndMessage(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setShowQuestion(false)
    setGamesCompleted(0)
    setAnswers([])
    setGameStarted(false)
    setShowEndMessage(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 relative">
      <div className="container mx-auto p-4 relative z-10">
        <h1 className="text-4xl font-bold text-white text-center mb-8">CampusQuest: University Experience</h1>
        <AnimatePresence mode="wait">
          {!gameStarted ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <StartPage onStart={handleStart} />
            </motion.div>
          ) : showEndMessage ? (
            <motion.div
              key="end"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">Thank You!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center mb-4">You have arrived at your floor. Thank you for participating in CampusQuest!</p>
                  <Button onClick={handleRestart} className="w-full">
                    Start New Quest
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="campusquest"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {!showQuestion ? (
                <MicrogameContainer onGameComplete={handleGameComplete} />
              ) : (
                <QuestionCard
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {gameStarted && !showEndMessage && (
          <Button onClick={handleRestart} className="mt-4 w-full">
            Restart CampusQuest
          </Button>
        )}
      </div>
    </div>
  )
}

