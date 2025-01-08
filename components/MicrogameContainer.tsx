'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface MicrogameProps {
  onComplete: (success: boolean) => void
  timeLimit: number
}

const microgames = [
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
  },
  {
    name: 'Rapid Clicking',
    component: ({ onComplete, timeLimit }: MicrogameProps) => {
      const [clicks, setClicks] = useState(0)
      const [timeLeft, setTimeLeft] = useState(timeLimit)
      const target = 3

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
    name: 'Memory Match',
    component: ({ onComplete, timeLimit }: MicrogameProps) => {
      const [flippedCards, setFlippedCards] = useState<number[]>([])
      const [matchedPairs, setMatchedPairs] = useState<number[]>([])
      const [timeLeft, setTimeLeft] = useState(timeLimit)
      const cards = ['🎓', '📚', '🏫', '🖥️']
      const shuffledCards = [...cards, ...cards].sort(() => Math.random() - 0.5)

      useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 0) {
              clearInterval(timer)
              onComplete(matchedPairs.length === cards.length)
              return 0
            }
            return prev - 0.1
          })
        }, 100)
        return () => clearInterval(timer)
      }, [matchedPairs.length, onComplete, timeLimit])

      const handleCardClick = (index: number) => {
        if (flippedCards.length === 2) return
        setFlippedCards([...flippedCards, index])
        if (flippedCards.length === 1) {
          if (shuffledCards[flippedCards[0]] === shuffledCards[index]) {
            setMatchedPairs([...matchedPairs, flippedCards[0], index])
          }
          setTimeout(() => setFlippedCards([]), 1000)
        }
      }

      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Match all pairs!</h2>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {shuffledCards.map((card, index) => (
              <motion.button
                key={index}
                className={`w-16 h-16 bg-blue-400 rounded-md flex items-center justify-center text-2xl ${
                  flippedCards.includes(index) || matchedPairs.includes(index) ? 'bg-green-400' : ''
                }`}
                onClick={() => handleCardClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {flippedCards.includes(index) || matchedPairs.includes(index) ? card : '?'}
              </motion.button>
            ))}
          </div>
          <Progress value={(timeLeft / timeLimit) * 100} className="w-full mt-4" />
        </div>
      )
    }
  },
  {
    name: 'Word Scramble',
    component: ({ onComplete, timeLimit }: MicrogameProps) => {
      const words = ['CAMPUS', 'STUDENT', 'LECTURE', 'LIBRARY', 'RESEARCH']
      const [currentWord, setCurrentWord] = useState('')
      const [scrambledWord, setScrambledWord] = useState('')
      const [userInput, setUserInput] = useState('')
      const [timeLeft, setTimeLeft] = useState(timeLimit)

      useEffect(() => {
        const word = words[Math.floor(Math.random() * words.length)]
        setCurrentWord(word)
        setScrambledWord(word.split('').sort(() => Math.random() - 0.5).join(''))
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

      const handleSubmit = () => {
        onComplete(userInput.toUpperCase() === currentWord)
      }

      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Unscramble the word!</h2>
          <p className="text-3xl font-bold mb-4">{scrambledWord}</p>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter the unscrambled word"
          />
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
          <Progress value={(timeLeft / timeLimit) * 100} className="w-full mt-4" />
        </div>
      )
    }
  },
  {
    name: 'Obstacle Jump',
    component: ({ onComplete, timeLimit }: MicrogameProps) => {
      const [isJumping, setIsJumping] = useState(false)
      const [obstaclePosition, setObstaclePosition] = useState(100)
      const [timeLeft, setTimeLeft] = useState(timeLimit)
      const [gameOver, setGameOver] = useState(false)

      useEffect(() => {
        const jumpTimer = setInterval(() => {
          if (isJumping) {
            setIsJumping(false)
          }
        }, 500)

        const obstacleTimer = setInterval(() => {
          setObstaclePosition((prev) => {
            if (prev <= 0) {
              return 100
            }
            return prev - 5
          })
        }, 50)

        const gameTimer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 0) {
              clearInterval(gameTimer)
              setGameOver(true)
              onComplete(true)
              return 0
            }
            return prev - 0.1
          })
        }, 100)

        return () => {
          clearInterval(jumpTimer)
          clearInterval(obstacleTimer)
          clearInterval(gameTimer)
        }
      }, [isJumping, onComplete, timeLimit])

      useEffect(() => {
        if (obstaclePosition < 20 && obstaclePosition > 0 && !isJumping) {
          setGameOver(true)
          onComplete(false)
        }
      }, [obstaclePosition, isJumping, onComplete])

      const handleJump = () => {
        if (!isJumping && !gameOver) {
          setIsJumping(true)
        }
      }

      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Jump over the obstacle!</h2>
          <div className="w-full h-32 bg-gray-200 relative overflow-hidden">
            <motion.div
              className="w-8 h-16 bg-blue-500 absolute bottom-0 left-4"
              animate={{ y: isJumping ? -40 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            />
            <motion.div
              className="w-8 h-8 bg-red-500 absolute bottom-0"
              animate={{ x: obstaclePosition + '%' }}
            />
          </div>
          <Button onClick={handleJump} className="mt-4 w-full" disabled={gameOver}>
            Jump
          </Button>
          <Progress value={(timeLeft / timeLimit) * 100} className="w-full mt-4" />
        </div>
      )
    }
  },
  {
    name: 'Circle Slide',
    component: ({ onComplete, timeLimit }: MicrogameProps) => {
      const [circlePosition, setCirclePosition] = useState(50)
      const [obstacles, setObstacles] = useState<number[]>([])
      const [timeLeft, setTimeLeft] = useState(timeLimit)
      const [gameOver, setGameOver] = useState(false)

      useEffect(() => {
        const obstacleTimer = setInterval(() => {
          setObstacles((prev) => {
            const newObstacles = prev.map((y) => y + 5).filter((y) => y < 100)
            if (newObstacles.length < 3) {
              newObstacles.push(0)
            }
            return newObstacles
          })
        }, 100)

        const gameTimer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 0) {
              clearInterval(gameTimer)
              setGameOver(true)
              onComplete(true)
              return 0
            }
            return prev - 0.1
          })
        }, 100)

        return () => {
          clearInterval(obstacleTimer)
          clearInterval(gameTimer)
        }
      }, [onComplete, timeLimit])

      useEffect(() => {
        const collision = obstacles.some((y) => y > 80 && y < 100 && Math.abs(circlePosition - 50) < 10)
        if (collision) {
          setGameOver(true)
          onComplete(false)
        }
      }, [obstacles, circlePosition, onComplete])

      const handleSlide = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!gameOver) {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          setCirclePosition((x / rect.width) * 100)
        }
      }

      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Slide the circle to avoid obstacles!</h2>
          <div
            className="w-full h-64 bg-gray-200 relative overflow-hidden cursor-pointer"
            onClick={handleSlide}
          >
            {obstacles.map((y, index) => (
              <motion.div
                key={index}
                className="w-4 h-4 bg-red-500 absolute"
                style={{ left: `${Math.random() * 100}%`, top: `${y}%` }}
              />
            ))}
            <motion.div
              className="w-8 h-8 bg-blue-500 rounded-full absolute bottom-4"
              animate={{ x: `${circlePosition}%` }}
            />
          </div>
          <Progress value={(timeLeft / timeLimit) * 100} className="w-full mt-4" />
        </div>
      )
    }
  }
]

interface MicrogameContainerProps {
  onGameComplete: (success: boolean) => void
  playedGames: number[]
}

export function MicrogameContainer({ onGameComplete, playedGames }: MicrogameContainerProps) {
  const timeLimit = 5; // Set time limit to 5 seconds
  const [currentGame, setCurrentGame] = useState(0)

  useEffect(() => {
    // Find the first unplayed game
    const nextUnplayedGame = microgames.findIndex((_, index) => !playedGames.includes(index))
    setCurrentGame(nextUnplayedGame !== -1 ? nextUnplayedGame : 0)
  }, [playedGames])

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
export { microgames }

