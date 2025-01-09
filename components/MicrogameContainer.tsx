'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MicrogameProps {
  onComplete: (success: boolean) => void
  timeLimit: number
}

const microgames = [
  {
    name: 'Shape Picker',
    component: ({ onComplete, timeLimit }: MicrogameProps) => {
      const [timeLeft, setTimeLeft] = useState(timeLimit)
      const [round, setRound] = useState(0)
      const shapes = [
        { type: 'triangle', color: '#FFD700', icon: '▲' },
        { type: 'square', color: '#FF0000', icon: '■' },
        { type: 'circle', color: '#800080', icon: '●' }
      ]
      const [targetShape, setTargetShape] = useState(shapes[Math.floor(Math.random() * shapes.length)])

      useEffect(() => {
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
      }, [onComplete])

      const handleShapeClick = (shape: typeof shapes[0]) => {
        if (shape.type === targetShape.type) {
          if (round < 2) {
            setRound(round + 1)
            setTargetShape(shapes[Math.floor(Math.random() * shapes.length)])
            setTimeLeft(timeLimit)
          } else {
            onComplete(true)
          }
        } else {
          onComplete(false)
        }
      }

      return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
          <h1 className="text-[#0047AB] text-5xl font-bold mb-2">MINIGAME</h1>
          <p className="text-[#0047AB] text-xl mb-6">GO FAST</p>
          <h2 className="text-[#0047AB] text-4xl font-bold mb-8">PICK A {targetShape.type.toUpperCase()}</h2>
          
          <div className="bg-[#8CD6E8] w-full rounded-3xl p-12 relative">
            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full border-2 border-black">
              {Math.ceil(timeLeft)}s
            </div>
            <div className="grid grid-cols-3 gap-8">
              {shapes.map((shape, index) => (
                <motion.button
                  key={index}
                  className="w-full aspect-square flex items-center justify-center text-6xl"
                  onClick={() => handleShapeClick(shape)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ backgroundColor: shape.color, border: '2px solid black', borderRadius: '12px' }}
                >
                  {shape.icon}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Fast Clicker',
    component: ({ onComplete, timeLimit }: MicrogameProps) => {
      const [clicks, setClicks] = useState(0)
      const [timeLeft, setTimeLeft] = useState(timeLimit)
      const target = 15

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
      }, [clicks, onComplete])

      return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
          <h1 className="text-[#0047AB] text-5xl font-bold mb-2">MINIGAME</h1>
          <p className="text-[#0047AB] text-xl mb-6">GO FAST</p>
          <h2 className="text-[#0047AB] text-4xl font-bold mb-8">CLICK FAST</h2>
          
          <div className="relative">
            <div className="absolute -top-4 right-0 bg-white px-4 py-2 rounded-full border-2 border-black">
              {Math.ceil(timeLeft)}s
            </div>
            <motion.button
              className="w-64 h-64 rounded-full bg-[#8CD6E8] border-2 border-black flex items-center justify-center text-white text-2xl font-bold mb-8"
              onClick={() => setClicks(c => c + 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CLICK
            </motion.button>
          </div>
          
          <div className="text-[#0047AB] text-4xl font-bold">
            {clicks} / {target}
          </div>
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
      const [row, setRow] = useState(1) // Track current row

      useEffect(() => {
        const jumpTimer = setInterval(() => {
          if (isJumping) {
            setIsJumping(false)
          }
        }, 500)

        const obstacleTimer = setInterval(() => {
          if (!gameOver) {
            setObstaclePosition((prev) => {
              if (prev <= -20) {
                setRow(current => current === 1 ? 2 : 1) // Switch rows
                return 100
              }
              return prev - 2
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
      }, [isJumping, onComplete, gameOver])

      useEffect(() => {
        if (obstaclePosition < 20 && obstaclePosition > 0 && !isJumping && !gameOver && row === 1) {
          setGameOver(true)
          onComplete(false)
        }
      }, [obstaclePosition, isJumping, onComplete, gameOver, row])

      return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
          <h1 className="text-[#0047AB] text-5xl font-bold mb-2">MINIGAME</h1>
          <p className="text-[#0047AB] text-xl mb-6">GO FAST</p>
          <h2 className="text-[#0047AB] text-4xl font-bold mb-8">JUMP TO SURVIVE</h2>
          
          <div className="bg-[#8CD6E8] w-full rounded-3xl p-8 relative">
            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full border-2 border-black">
              {Math.ceil(timeLeft)}s
            </div>
            <div className="w-full h-64 bg-white rounded-xl relative overflow-hidden">
              {/* First Row */}
              <div className="absolute bottom-32 w-full h-1 bg-black" />
              <motion.div
                className="absolute bottom-[129px] left-16"
                animate={{ y: isJumping && row === 2 ? -60 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="w-10 h-12 bg-yellow-400 rounded-lg relative">
                  <div className="absolute top-1 w-6 h-6 bg-yellow-200 rounded-full left-2" />
                  <div className="absolute bottom-0 w-4 h-4 bg-blue-500 rounded-sm left-0" />
                  <div className="absolute bottom-0 w-4 h-4 bg-blue-500 rounded-sm right-0" />
                </div>
              </motion.div>

              {/* Second Row */}
              <div className="absolute bottom-0 w-full h-1 bg-black" />
              <motion.div
                className="absolute bottom-1 left-16"
                animate={{ y: isJumping && row === 1 ? -60 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="w-10 h-12 bg-yellow-400 rounded-lg relative">
                  <div className="absolute top-1 w-6 h-6 bg-yellow-200 rounded-full left-2" />
                  <div className="absolute bottom-0 w-4 h-4 bg-blue-500 rounded-sm left-0" />
                  <div className="absolute bottom-0 w-4 h-4 bg-blue-500 rounded-sm right-0" />
                </div>
              </motion.div>

              {/* Obstacles */}
              <motion.div
                className="absolute"
                style={{ 
                  left: `${obstaclePosition}%`,
                  bottom: row === 1 ? '1px' : '129px'
                }}
              >
                <div className="w-10 h-12 bg-red-500 rounded-sm relative">
                  <div className="absolute top-0 w-full h-2 bg-red-700" />
                  <div className="absolute bottom-0 w-full h-2 bg-red-700" />
                </div>
              </motion.div>

              {/* Desk with computer - both rows */}
              <div className="absolute bottom-1 right-8">
                <div className="w-20 h-12 bg-gray-800 rounded-sm relative">
                  <div className="absolute top-0 w-12 h-8 bg-blue-400 rounded-sm left-4" />
                  <div className="absolute bottom-0 w-full h-2 bg-gray-900" />
                </div>
              </div>
              <div className="absolute bottom-[129px] right-8">
                <div className="w-20 h-12 bg-gray-800 rounded-sm relative">
                  <div className="absolute top-0 w-12 h-8 bg-blue-400 rounded-sm left-4" />
                  <div className="absolute bottom-0 w-full h-2 bg-gray-900" />
                </div>
              </div>
            </div>
            
            <button
              onClick={() => !isJumping && setIsJumping(true)}
              className="w-full mt-8 bg-white hover:bg-gray-50 text-black text-2xl font-bold px-6 py-4 rounded-xl border-2 border-black transition-all duration-200 hover:scale-105"
              disabled={gameOver}
            >
              CLICK TO JUMP
            </button>
          </div>
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
  const timeLimit = 5
  const [currentGame, setCurrentGame] = useState(0)

  useEffect(() => {
    const nextUnplayedGame = microgames.findIndex((_, index) => !playedGames.includes(index))
    setCurrentGame(nextUnplayedGame !== -1 ? nextUnplayedGame : Math.floor(Math.random() * microgames.length))
  }, [playedGames])

  const CurrentGame = microgames[currentGame].component
  return <CurrentGame onComplete={onGameComplete} timeLimit={timeLimit} />
}

export { microgames }