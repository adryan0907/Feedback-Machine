import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCcw } from 'lucide-react'
import { PixelArt } from './PixelArt'

interface EndScreenProps {
  gamesCompleted: number
  successfulGames: number
  answersCount: number
  onRestart: () => void
}

export function EndScreen({ gamesCompleted, successfulGames, answersCount, onRestart }: EndScreenProps) {
  const [pixels, setPixels] = useState<string[]>(Array(144).fill('#FFFFFF')) // 12x12 grid
  const [activeColor, setActiveColor] = useState('#FF0000')
  const [pixelsLeft, setPixelsLeft] = useState(50)

  const handlePixelClick = (index: number) => {
    if (pixelsLeft > 0 && pixels[index] === '#FFFFFF') {
      const newPixels = [...pixels]
      newPixels[index] = activeColor
      setPixels(newPixels)
      setPixelsLeft(prev => prev - 1)
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <div className="inline-block px-6 py-2 mb-6 rounded-full border-2 border-black">
        <span className="text-xl font-medium">Complete!</span>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        Thank you for your
        <br />
        <span className="text-[#8CD6E8]">participation!</span>
      </h2>
      
      <div className="w-full bg-[#8CD6E8] rounded-3xl p-8 mb-8">
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <p className="text-xl">Games Completed: {gamesCompleted}</p>
          <p className="text-xl">Successful Games: {successfulGames}</p>
          <p className="text-xl">Questions Answered: {answersCount}</p>
        </div>
      </div>

      <PixelArt
        pixels={pixels}
        activeColor={activeColor}
        onColorSelect={setActiveColor}
        onPixelClick={handlePixelClick}
      />
      
      <motion.button
        onClick={onRestart}
        className="mt-8 bg-[#8CD6E8] hover:bg-[#7BC5D7] text-black text-lg px-8 py-6 rounded-full flex items-center transition-all duration-200 hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start New Quest <RefreshCcw className="ml-2 h-5 w-5" />
      </motion.button>
    </div>
  )
}

