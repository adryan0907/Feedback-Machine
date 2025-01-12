'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MicrogameContainer, microgames } from '@/components/MicrogameContainer'
import { QuestionCard } from '@/components/QuestionCard'
import { StartPage } from '@/components/StartPage'
import { EndScreen } from '@/components/EndScreen'
import { questions } from './utils/questions'

const TOTAL_QUESTIONS = 5

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showQuestion, setShowQuestion] = useState(false)
  const [gamesCompleted, setGamesCompleted] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [showEndMessage, setShowEndMessage] = useState(false)
  const [successfulGames, setSuccessfulGames] = useState(0)
  const [playedGames, setPlayedGames] = useState<number[]>([])

  const handleStart = useCallback(() => {
    setGameStarted(true)
    setShowQuestion(true)
  }, [])

  const handleGameComplete = useCallback((success: boolean) => {
    setGamesCompleted((prev) => prev + 1)
    if (success) {
      setSuccessfulGames((prev) => prev + 1)
    }
    setPlayedGames((prev) => [...prev, gamesCompleted % (microgames.length)])
    setShowQuestion(true)
  }, [gamesCompleted])

  const handleAnswer = useCallback((answer: string) => {
    setAnswers((prev) => [...prev, answer])
    setShowQuestion(false)
    setCurrentQuestionIndex((prev) => prev + 1)
    if (currentQuestionIndex + 1 >= TOTAL_QUESTIONS) {
      setShowEndMessage(true)
    } else {
      if (playedGames.length === microgames.length) {
        setPlayedGames([])
      }
    }
  }, [currentQuestionIndex, playedGames.length])

  const handleRestart = useCallback(() => {
    setCurrentQuestionIndex(0)
    setShowQuestion(true)
    setGamesCompleted(0)
    setAnswers([])
    setGameStarted(false)
    setShowEndMessage(false)
    setSuccessfulGames(0)
    setPlayedGames([])
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={gameStarted ? (showEndMessage ? "end" : "game") : "start"}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {!gameStarted && (
              <StartPage onStart={handleStart} />
            )}
            {gameStarted && !showEndMessage && showQuestion && (
              <QuestionCard
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
                currentQuestion={currentQuestionIndex}
                totalQuestions={TOTAL_QUESTIONS}
              />
            )}
            {gameStarted && !showEndMessage && !showQuestion && (
              <MicrogameContainer
                onGameComplete={handleGameComplete}
                playedGames={playedGames.length === 0 ? [] : playedGames}
              />
            )}
            {showEndMessage && (
              <EndScreen
                gamesCompleted={gamesCompleted}
                successfulGames={successfulGames}
                answersCount={answers.length}
                onRestart={handleRestart}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

