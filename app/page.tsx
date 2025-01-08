'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MicrogameContainer, microgames } from '@/components/MicrogameContainer'
import { QuestionCard } from '@/components/QuestionCard'
import { StartPage } from '@/components/StartPage'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { questions } from './utils/questions'

const minigamesRationale = `
# Minigames in CampusQuest: Enhancing Survey Engagement

## Introduction

CampusQuest incorporates minigames into its survey process to increase user engagement and participation. This approach is based on the concept of gamification, which has been shown to improve user experience and data quality in survey research.

## Research Basis

A study conducted on campus demonstrated that gamifying surveys significantly increases user engagement. The experiment involved a feedback machine using a Nerf gun, where users answered yes or no questions by hitting targets. This interactive approach resulted in higher participation rates and more thoughtful responses compared to traditional survey methods.

## Benefits of Minigames in Surveys

1. **Increased Engagement**: Minigames break the monotony of traditional surveys, making the process more enjoyable for participants.

2. **Improved Focus**: Short, interactive games between questions help maintain user attention throughout the survey.

3. **Enhanced Data Quality**: Engaged participants are more likely to provide thoughtful and accurate responses.

4. **Reduced Survey Fatigue**: The variety introduced by minigames can help combat survey fatigue, allowing for longer or more in-depth questionnaires.

5. **Positive Association**: Users are more likely to have a positive view of the survey process, increasing the likelihood of future participation.

## Implemented Minigames

CampusQuest features the following minigames:

1. **Rapid Clicking**: Tests user reflexes and maintains alertness.
2. **Color Matching**: Engages visual processing and decision-making skills.
3. **Memory Match**: Exercises short-term memory and pattern recognition.
4. **Word Scramble**: Challenges language skills and problem-solving abilities.
5. **Obstacle Jump**: Tests timing and hand-eye coordination.
6. **Circle Slide**: Improves precision and spatial awareness.

These games are designed to be quick, engaging, and relevant to the university context, ensuring they complement rather than distract from the survey's primary purpose.

## Conclusion

By incorporating minigames into the survey process, CampusQuest aims to create a more engaging and effective feedback mechanism for university students. This approach not only increases participation rates but also potentially improves the quality of the data collected, leading to more accurate insights into the student experience.
`

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showQuestion, setShowQuestion] = useState(false)
  const [gamesCompleted, setGamesCompleted] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [showEndMessage, setShowEndMessage] = useState(false)
  const [successfulGames, setSuccessfulGames] = useState(0)
  const [playedGames, setPlayedGames] = useState<number[]>([])

  const handleStart = () => {
    setGameStarted(true)
  }

  const handleGameComplete = (success: boolean) => {
    setGamesCompleted((prev) => prev + 1)
    if (success) {
      setSuccessfulGames((prev) => prev + 1)
    }
    setPlayedGames((prev) => [...prev, gamesCompleted % microgames.length])
    setShowQuestion(true)
  }

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer])
    setShowQuestion(false)
    setCurrentQuestionIndex((prev) => prev + 1)
    if (currentQuestionIndex + 1 >= questions.length) {
      setShowEndMessage(true)
    } else {
      // Reset played games if all games have been played
      if (playedGames.length === microgames.length) {
        setPlayedGames([])
      }
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setShowQuestion(false)
    setGamesCompleted(0)
    setAnswers([])
    setGameStarted(false)
    setShowEndMessage(false)
    setSuccessfulGames(0)
    setPlayedGames([])
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
              {showEndMessage && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="w-full max-w-md mx-auto mt-8">
                    <CardHeader>
                      <CardTitle className="text-center">CampusQuest Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center mb-4">Games Completed: {gamesCompleted}</p>
                      <p className="text-center mb-4">Successful Games: {successfulGames}</p>
                      <p className="text-center mb-4">Questions Answered: {answers.length}</p>
                      <details>
                        <summary className="cursor-pointer text-blue-500 hover:text-blue-700">Why Minigames?</summary>
                        <div className="mt-2 prose" dangerouslySetInnerHTML={{ __html: minigamesRationale }} />
                      </details>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="campusquest"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {showQuestion ? (
                <QuestionCard
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <MicrogameContainer onGameComplete={handleGameComplete} playedGames={playedGames} />
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

