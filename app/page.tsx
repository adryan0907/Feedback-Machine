'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MicrogameContainer, microgames } from '@/components/MicrogameContainer'
import { QuestionCard } from '@/components/QuestionCard'
import { StartPage } from '@/components/StartPage'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { questions } from './utils/questions'
import PixelGrid from '@/components/pixel-grid'
import ColorPalette from '@/components/color-palette'
import { PixelArt } from '@/components/PixelArt'

const TOTAL_QUESTIONS = 5
const GRID_SIZE = 32 * 32
const INITIAL_COLOR = '#FFFFFF'
const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF']

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showQuestion, setShowQuestion] = useState(false)
  const [gamesCompleted, setGamesCompleted] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [showEndMessage, setShowEndMessage] = useState(false)
  const [successfulGames, setSuccessfulGames] = useState(0)
  const [playedGames, setPlayedGames] = useState<number[]>([])
  const [pixels, setPixels] = useState<string[]>(Array(GRID_SIZE).fill(INITIAL_COLOR))
  const [activeColor, setActiveColor] = useState(COLORS[0])

  const handleStart = useCallback(() => {
    setGameStarted(true)
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
    setShowQuestion(false)
    setGamesCompleted(0)
    setAnswers([])
    setGameStarted(false)
    setShowEndMessage(false)
    setSuccessfulGames(0)
    setPlayedGames([])
    setPixels(Array(GRID_SIZE).fill(INITIAL_COLOR))
  }, [])

  const handlePixelClick = useCallback((index: number) => {
    setPixels((prev) => {
      const newPixels = [...prev]
      newPixels[index] = activeColor
      return newPixels
    })
  }, [activeColor])

  const memoizedContent = useMemo(() => {
    if (!gameStarted) {
      return <StartPage onStart={handleStart} />
    }

    if (showEndMessage) {
      return (
        <>
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Thank You!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">You have arrived at your floor. Thank you for participating in CampusQuest!</p>
              <p className="text-center mb-4">Games Completed: {gamesCompleted}</p>
              <p className="text-center mb-4">Successful Games: {successfulGames}</p>
              <p className="text-center mb-4">Questions Answered: {answers.length}</p>
              <Button onClick={handleRestart} className="w-full mt-4">
                Start New Quest
              </Button>
            </CardContent>
          </Card>
          <PixelArt
            pixels={pixels}
            activeColor={activeColor}
            onColorSelect={setActiveColor}
            onPixelClick={handlePixelClick}
          />
        </>
      )
    }

    if (showQuestion) {
      return (
        <QuestionCard
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
          onAnswer={handleAnswer}
        />
      )
    }

    return <MicrogameContainer onGameComplete={handleGameComplete} playedGames={playedGames} />
  }, [gameStarted, showEndMessage, showQuestion, gamesCompleted, successfulGames, answers.length, pixels, activeColor, currentQuestionIndex, handleStart, handleRestart, handleAnswer, handleGameComplete, handlePixelClick, playedGames])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-500 relative">
      <div className="container mx-auto p-4 relative z-10">
        <h1 className="text-4xl font-bold text-white text-center mb-8">CampusQuest: University Experience</h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={gameStarted ? (showEndMessage ? "end" : "campusquest") : "start"}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            {memoizedContent}
          </motion.div>
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

