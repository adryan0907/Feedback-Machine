'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MicrogameProps {
  onComplete: (success: boolean) => void
  timeLimit: number
}

const microgames = [
  {
    name: 'Shape Sorter',
    component: ({ onComplete, timeLimit }: MicrogameProps) => {
      const shapes = ['circle', 'square', 'triangle', 'star']
      const [currentShape, setCurrentShape] = useState('')
      const [timeLeft, setTimeLeft] = useState(timeLimit)

      useEffect(() => {
        setCurrentShape(shapes[Math.floor(Math.random() * shapes.length)])
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

      const handleShapeClick = (shape: string) => {
        onComplete(shape === currentShape)
      }

      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">Click the {currentShape}!</h2>
          <div className="grid grid-cols-2 gap-4">
            {shapes.map((shape) => (
              <motion.button
                key={shape}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShapeClick(shape)}
                className="w-24 h-24 bg-blue-400 rounded-md flex items-center justify-center text-white text-4xl"
              >
                {shape === 'circle' && '●'}
                {shape === 'square' && '■'}
                {shape === 'triangle' && '▲'}
                {shape === 'star' && '★'}
              </motion.button>
            ))}
          </div>
          <Progress value={(timeLeft / timeLimit) * 100} className="w-full mt-4" />
        </div>
      )
    }
  },
  {
    name: 'Simon Says',
    component: ({ onComplete, timeLimit }: MicrogameProps) => {
      const actions = ['Jump', 'Clap', 'Spin', 'Wave']
      const [currentAction, setCurrentAction] = useState('')
      const [isSaid, setIsSaid] = useState(false)
      const [timeLeft, setTimeLeft] = useState(timeLimit)

      useEffect(() => {
        setCurrentAction(actions[Math.floor(Math.random() * actions.length)])
        setIsSaid(Math.random() < 0.5)
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

      const handleAction = (doAction: boolean) => {
        onComplete((isSaid && doAction) || (!isSaid && !doAction))
      }

      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold mb-4">
            {isSaid ? 'Simon says:' : ''} {currentAction}!
          </h2>
          <div className="flex gap-4">
            <Button onClick={() => handleAction(true)} className="w-32">
              Do it!
            </Button>
            <Button onClick={() => handleAction(false)} className="w-32">
              Don't do it!
            </Button>
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
      const target = 3 // Reduced from 5 to 3

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
          if (!gameOver) {
            setObstaclePosition((prev) => {
              if (prev <= 0) {
                return 100
              }
              return prev - 5
            })
          }
        }, 50)

        const gameTimer = setInterval(() => {
          if (!gameOver) {
            setTimeLeft((prev) => {
              if (prev <= 0) {
                clearInterval(gameTimer)
                setGameOver(true)
                onComplete(true)
                return 0
              }
              return prev - 0.1
            })
          }
        }, 100)

        return () => {
          clearInterval(jumpTimer)
          clearInterval(obstacleTimer)
          clearInterval(gameTimer)
        }
      }, [isJumping, onComplete, timeLimit, gameOver])

      useEffect(() => {
        if (obstaclePosition < 20 && obstaclePosition > 0 && !isJumping && !gameOver) {
          setGameOver(true)
          onComplete(false)
        }
      }, [obstaclePosition, isJumping, onComplete, gameOver])

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
              style={{ left: `${obstaclePosition}%` }}
            />
          </div>
          <Button onClick={handleJump} className="mt-4 w-full max-w-xs" disabled={gameOver}>
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
  const timeLimit = 8; // Adjusted time limit to 8 seconds

  const [currentGame, setCurrentGame] = useState(0)

  useEffect(() => {
    // Find the first unplayed game
    const nextUnplayedGame = microgames.findIndex((_, index) => !playedGames.includes(index))
    setCurrentGame(nextUnplayedGame !== -1 ? nextUnplayedGame : Math.floor(Math.random() * microgames.length))
  }, [playedGames])

  const handleGameComplete = useCallback((success: boolean) => {
    onGameComplete(success)
  }, [onGameComplete])

  const CurrentGameMemo = useMemo(() => {
    const CurrentGame = microgames[currentGame].component
    return <CurrentGame onComplete={handleGameComplete} timeLimit={timeLimit} />
  }, [currentGame, handleGameComplete, timeLimit])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">{microgames[currentGame].name}</CardTitle>
      </CardHeader>
      <CardContent>
        {CurrentGameMemo}
      </CardContent>
    </Card>
  )
}

export { microgames }

