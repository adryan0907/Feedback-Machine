'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface MicrogameProps {
  onComplete: (success: boolean) => void
  timeLimit: number
}

const microgames = [
  {
    name: 'Rapid Clicking',
    component: ({ onComplete, timeLimit }: MicrogameProps) => {
      const [clicks, setClicks] = useState(0)
      const [timeLeft, setTimeLeft] = useState(timeLimit)
      const target = 5

      useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 0) {
              clearInterval(timer)
              onComplete(clicks >= target)
              return 0
            }
            return prev - 0.1
          })
        }, 100)
        return () => clearInterval(timer)
      }, [clicks, onComplete, timeLimit])

      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Click {target} times quickly!</h2>
          <p className="text-xl mb-4">Clicks: {clicks}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-32 h-32 rounded-full bg-blue-400 text-white text-2xl font-bold"
            onClick={() => setClicks(c => c + 1)}
          >
            Click!
          </motion.button>
          <Progress value={(timeLeft / timeLimit) * 100} className="w-full mt-4" />
        </div>
      )
    }
  },
  {
    name: 'Color Matching',
    component: ({ onComplete, timeLimit }: MicrogameProps) => {
      const colors = ['red', 'blue', 'green', 'yellow']
      const [targetColor, setTargetColor] = useState('')
      const [options, setOptions] = useState<string[]>([])
      const [timeLeft, setTimeLeft] = useState(timeLimit)

      useEffect(() => {
        setTargetColor(colors[Math.floor(Math.random() * colors.length)])
        setOptions(colors.sort(() => Math.random() - 0.5))
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 0) {
              clearInterval(timer)
              onComplete(false)
              return 0
            }
            return prev - 0.1
          })
        }, 100)
        return () => clearInterval(timer)
      }, [onComplete, timeLimit])

      const handleColorClick = (color: string) => {
        onComplete(color === targetColor)
      }

      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Match the color: {targetColor}</h2>
          <div className="grid grid-cols-2 gap-4">
            {options.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleColorClick(color)}
                className={`w-24 h-24 rounded-full bg-${color}-500`}
              />
            ))}
          </div>
          <Progress value={(timeLeft / timeLimit) * 100} className="w-full mt-4" />
        </div>
      )
    }
  }
]

interface MicrogameContainerProps {
  onGameComplete: (success: boolean) => void
}

export function MicrogameContainer({ onGameComplete }: MicrogameContainerProps) {
  const timeLimit = 4; // Set time limit to 4 seconds
  const [currentGame, setCurrentGame] = useState(0)

  const nextGame = () => {
    setCurrentGame((current) => (current + 1) % microgames.length)
  }

  const handleGameComplete = (success: boolean) => {
    onGameComplete(success)
  }

  const CurrentGame = microgames[currentGame].component

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">{microgames[currentGame].name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CurrentGame onComplete={handleGameComplete} timeLimit={timeLimit} />
      </CardContent>
    </Card>
  )
}

