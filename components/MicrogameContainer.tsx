'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MicrogameContainerProps {
  onGameComplete: (success: boolean) => void
  playedGames: number[]
}

// Define available minigames
export const microgames = [
  {
    name: "Click the Target",
    component: ClickTarget,
  },
  {
    name: "Jump to Survive",
    component: JumpGame,
  },
  {
    name: "Pick an Elipse",
    component: ShapeSelector,
  }
]

export function MicrogameContainer({ onGameComplete, playedGames }: MicrogameContainerProps) {
  const [currentGame, setCurrentGame] = useState<number>(0)

      useEffect(() => {
    // Get the last played game (if any)
    const lastPlayedGame = playedGames[playedGames.length - 1]
    
    // Create array of available games excluding the last played game
    let availableGames = Array.from({ length: microgames.length }, (_, i) => i)
      .filter(i => i !== lastPlayedGame)
    
    // If we've played all games, reset but still avoid the last played game
    if (availableGames.length === 0) {
      availableGames = Array.from({ length: microgames.length }, (_, i) => i)
        .filter(i => i !== lastPlayedGame)
    }
    
    // Select a random game from available games
    const randomIndex = Math.floor(Math.random() * availableGames.length)
    setCurrentGame(availableGames[randomIndex])
  }, [playedGames])

  const GameComponent = microgames[currentGame].component

      return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-4xl mx-auto px-4">
              <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-lg p-8"
        >
          <h1 className="text-4xl font-bold text-center text-[#0047AB] mb-2">
            MINIGAME
          </h1>
          <p className="text-center text-[#0047AB] font-bold mb-8">GO FAST</p>
          <h2 className="text-4xl font-bold text-center text-[#0047AB] mb-8">
            {microgames[currentGame].name.toUpperCase()}
          </h2>
          <GameComponent onComplete={onGameComplete} />
          {currentGame === 0 && (
            <div className="text-center mt-8">
              <span className="text-4xl font-bold text-[#0047AB]">{playedGames.length}</span>
            </div>
          )}
        </motion.div>
          </div>
        </div>
      )
    }

// Example minigame components
function ClickTarget({ onComplete }: { onComplete: (success: boolean) => void }) {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(3)
  const [showWarning, setShowWarning] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

      useEffect(() => {
        const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
              clearInterval(timer)
          setShowWarning(true)
          setTimeout(() => {
            onComplete(score > 0)
          }, 1500)
              return 0
            }
        return prev - 1
          })
    }, 1000)

        return () => clearInterval(timer)
  }, [score, onComplete])

      const handleClick = () => {
    setIsClicked(true)
    setScore(prev => prev + 1)
    
    // Calculate circle size and safe boundaries
    const circleSize = 192 // w-48 = 192px
    const containerPadding = 32 // p-8 = 32px
    const safeWidth = 500 - circleSize - containerPadding * 2
    const safeHeight = 500 - circleSize - containerPadding * 2
    
    // Move circle to new random position within safe boundaries
    const newX = (containerPadding + circleSize/2) + Math.random() * safeWidth
    const newY = (containerPadding + circleSize/2) + Math.random() * safeHeight
    
    // Convert to percentage
    const xPercent = (newX / 500) * 100
    const yPercent = (newY / 500) * 100
    
    setPosition({ x: xPercent, y: yPercent })
    setTimeout(() => setIsClicked(false), 150)
  }

  return (
    <div className="relative h-[500px] bg-white rounded-xl overflow-hidden">
      {showWarning ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
          <p className="text-2xl font-bold text-[#0047AB]">Get ready for the next question!</p>
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4 flex items-center gap-8">
            <span className="text-4xl font-bold text-[#0047AB]">{timeLeft}s</span>
            <span className="text-4xl font-bold text-[#0047AB]">Score: {score}</span>
          </div>
          <motion.button
            className="absolute w-48 h-48 bg-[#8CD6E8] rounded-full flex items-center justify-center cursor-pointer border-2 border-black"
            style={{ 
              left: `${position.x}%`, 
              top: `${position.y}%`, 
              transform: `translate(-50%, -50%)` 
            }}
            animate={{ 
              scale: isClicked ? 1.2 : 1
            }}
            transition={{ duration: 0.15 }}
            onClick={handleClick}
          >
            <span className="text-white font-bold text-2xl">CLICK</span>
          </motion.button>
        </>
      )}
    </div>
  )
}

function JumpGame({ onComplete }: { onComplete: (success: boolean) => void }) {
  const [isJumping, setIsJumping] = useState(false)
  const [position, setPosition] = useState(0)
  const [obstaclePosition, setObstaclePosition] = useState(100)
  const [gameOver, setGameOver] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(5)
  const [boxesJumped, setBoxesJumped] = useState(0)

  useEffect(() => {
    const gameTimer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(gameTimer)
          setShowWarning(true)
          setTimeout(() => {
            onComplete(!gameOver)
          }, 1500)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const obstacleTimer = setInterval(() => {
      setObstaclePosition(prev => {
        if (prev <= -10) {
          setBoxesJumped(prev => prev + 1)
          return 100
        }
        return prev - 2
      })
    }, 50)

    return () => {
      clearInterval(gameTimer)
      clearInterval(obstacleTimer)
    }
  }, [onComplete, gameOver])

  useEffect(() => {
    if (isJumping) {
      const jumpTimer = setInterval(() => {
        setPosition(prev => {
          if (prev >= 40) {
            setIsJumping(false)
            return 40
          }
          return prev + 5
        })
      }, 50)

      return () => clearInterval(jumpTimer)
    } else if (position > 0) {
      const fallTimer = setInterval(() => {
        setPosition(prev => Math.max(0, prev - 5))
      }, 50)

      return () => clearInterval(fallTimer)
    }
  }, [isJumping, position])

  useEffect(() => {
    // Collision detection
    if (obstaclePosition < 20 && obstaclePosition > 0 && position < 20) {
      setGameOver(true)
    }
  }, [obstaclePosition, position])

  const handleJump = () => {
    if (!isJumping && position === 0) {
      setIsJumping(true)
        }
      }

      return (
    <div 
      className="relative h-[200px] bg-[#8CD6E8] rounded-xl overflow-hidden cursor-pointer"
      onClick={handleJump}
    >
      {showWarning ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
          <p className="text-2xl font-bold text-[#0047AB]">Get ready for the next question!</p>
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4 flex items-center gap-8">
            <span className="text-xl font-bold text-white">Time: {timeLeft}s</span>
            <span className="text-xl font-bold text-white">Boxes Jumped: {boxesJumped}</span>
          </div>
          <div className="absolute bottom-0 w-full h-[2px] bg-white" />
          
          {/* Character */}
          <motion.div
            className="absolute bottom-0 left-[10%] w-12 h-12"
            style={{ bottom: `${position}%` }}
          >
            <img 
              src="https://i.ibb.co/VqGPk4B/character.png" 
              alt="Character"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Obstacle (Bookshelf) */}
          <motion.div
            className="absolute bottom-0 w-12 h-16"
            style={{ left: `${obstaclePosition}%` }}
          >
            <img 
              src="https://i.ibb.co/0QKwVxp/bookshelf.png" 
              alt="Bookshelf"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Desk (Goal) */}
          <div className="absolute bottom-0 right-[5%] w-16 h-16">
            <img 
              src="https://i.ibb.co/xGR6Znq/desk.png" 
              alt="Desk"
              className="w-full h-full object-contain"
            />
            </div>

          <div className="absolute top-4 right-4">
            <p className="text-xl font-bold text-white">CLICK TO JUMP</p>
          </div>
        </>
          )}
        </div>
      )
    }

function ShapeSelector({ onComplete }: { onComplete: (success: boolean) => void }) {
  const [showWarning, setShowWarning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(3)

      useEffect(() => {
        const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
              clearInterval(timer)
          setShowWarning(true)
          setTimeout(() => onComplete(false), 1500)
              return 0
            }
        return prev - 1
          })
    }, 1000)

        return () => clearInterval(timer)
      }, [onComplete])

  const handleShapeClick = (shape: string) => {
    if (shape === 'circle') {
      setShowWarning(true)
      setTimeout(() => onComplete(true), 1500)
        } else {
      setShowWarning(true)
      setTimeout(() => onComplete(false), 1500)
        }
      }

      return (
    <div className="relative h-[500px] bg-[#8CD6E8] rounded-xl overflow-hidden">
      {showWarning ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
          <p className="text-2xl font-bold text-[#0047AB]">Get ready for the next question!</p>
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4">
            <span className="text-4xl font-bold text-white">{timeLeft}s</span>
          </div>
          <div className="absolute top-16 left-0 right-0 text-center">
            <p className="text-2xl font-bold text-white mb-2">Find and click the circle shape!</p>
            <p className="text-xl text-white">Choose the correct shape to proceed</p>
          </div>
          <div className="flex items-center justify-around h-full px-20">
            {/* Triangle */}
            <button
              onClick={() => handleShapeClick('triangle')}
              className="w-40 h-40 relative cursor-pointer transform hover:scale-105 transition-transform"
            >
              <div className="absolute inset-0 border-2 border-black"
                style={{
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  backgroundColor: '#FFD700'
                }}
              />
            </button>

            {/* Square */}
            <button
              onClick={() => handleShapeClick('square')}
              className="w-40 h-40 bg-red-500 border-2 border-black cursor-pointer transform hover:scale-105 transition-transform"
            />

            {/* Circle */}
            <button
              onClick={() => handleShapeClick('circle')}
              className="w-40 h-40 rounded-full bg-purple-600 border-2 border-black cursor-pointer transform hover:scale-105 transition-transform"
            />
          </div>
        </>
      )}
        </div>
      )
    }

