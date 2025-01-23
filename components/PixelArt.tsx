'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'

// Define the image URL from StartPage
const TOMASH_IMAGE = "https://i.ibb.co/rmc10Mt/ovodv-httpss-mj-run9g-LNTGXsh24-Happy-guy-standing-open-month-cd580a6c-5a38-44ca-9c27-3e549b9eee5b-0.png"

// Define an inspiring pixel art template - a simple landscape
const TEMPLATE_ART = [
  // Sun (yellow)
  { positions: [2 * 40 + 3, 2 * 40 + 4, 3 * 40 + 3, 3 * 40 + 4], color: '#FFDC0044' },
  // Clouds (light blue)
  { positions: [2 * 40 + 10, 2 * 40 + 11, 2 * 40 + 12, 3 * 40 + 11], color: '#00BCD444' },
  { positions: [3 * 40 + 20, 3 * 40 + 21, 3 * 40 + 22, 2 * 40 + 21], color: '#00BCD444' },
  // Trees (green)
  { positions: [
    20 * 40 + 8, 21 * 40 + 8, 22 * 40 + 8, // trunk
    19 * 40 + 7, 19 * 40 + 8, 19 * 40 + 9, // leaves
    18 * 40 + 8
  ], color: '#2ECC4044' },
  { positions: [
    20 * 40 + 15, 21 * 40 + 15, 22 * 40 + 15, // trunk
    19 * 40 + 14, 19 * 40 + 15, 19 * 40 + 16, // leaves
    18 * 40 + 15
  ], color: '#2ECC4044' },
  // Ground (darker green)
  { positions: Array.from({ length: 40 }, (_, i) => 23 * 40 + i), color: '#2ECC4044' },
  // Mountains (purple)
  { positions: [
    15 * 40 + 5, 16 * 40 + 4, 16 * 40 + 5, 16 * 40 + 6,
    17 * 40 + 3, 17 * 40 + 4, 17 * 40 + 5, 17 * 40 + 6, 17 * 40 + 7
  ], color: '#B10DC944' }
].flat()

const GRID_SIZE = 40

interface PixelArtProps {
  pixelsEarned: number;
}

export default function PixelArtPage({ pixelsEarned }: PixelArtProps) {
  const router = useRouter()
  const [pixels, setPixels] = useState<string[]>([])
  const [currentSessionPixels, setCurrentSessionPixels] = useState<number[]>([])
  const [activeColor, setActiveColor] = useState('#FF4136')
  const [pixelsLeft, setPixelsLeft] = useState(pixelsEarned)
  const [showEndImage, setShowEndImage] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const COLORS = [
    '#FF4136', // Red
    '#FF851B', // Orange
    '#FFDC00', // Yellow
    '#2ECC40', // Green
    '#00BCD4', // Light Blue
    '#0074D9', // Dark Blue
    '#B10DC9', // Purple
    '#FF69B4', // Pink
    '#111111', // Black
  ]

  useEffect(() => {
    const fetchSavedPixels = async () => {
      try {
        // First create base white grid
        const totalPixels = GRID_SIZE * GRID_SIZE
        const initialPixels = Array(totalPixels).fill('#FFFFFF')
        
        // Add template art with opacity
        TEMPLATE_ART.forEach(item => {
          item.positions.forEach(position => {
            if (position < totalPixels) {
              initialPixels[position] = item.color
            }
          })
        })

        // Fetch and add saved pixels from previous users
        const response = await fetch("/api/pixels")
        if (!response.ok) throw new Error("Failed to fetch pixels")
        const data = await response.json()
        
        if (data.pixels && Array.isArray(data.pixels)) {
          data.pixels.forEach((savedPixel: {index: number, color: string}) => {
            // Override any template or white pixels with saved pixels
            initialPixels[savedPixel.index] = savedPixel.color
          })
        }
        
        setPixels(initialPixels)
      } catch (err) {
        console.error("Error loading pixels:", err)
      }
    }

    fetchSavedPixels()
  }, [])

  const handlePixelClick = (index: number) => {
    if (pixelsLeft > 0 && !currentSessionPixels.includes(index)) {
      const newPixels = [...pixels]
      newPixels[index] = activeColor
      setPixels(newPixels)
      setCurrentSessionPixels([...currentSessionPixels, index])
      setPixelsLeft(prev => {
        const newPixelsLeft = prev - 1
        // If this was the last pixel, automatically save
        if (newPixelsLeft === 0) {
          handleSave()
        }
        return newPixelsLeft
      })
    }
  }

  const handleSave = async () => {
    try {
      console.log('Saving pixels...', currentSessionPixels.length)
      
      // Only save if there are pixels to save
      if (currentSessionPixels.length === 0) {
        setShowEndImage(true)
        return
      }

      // Save only the new pixels from this session
      const pixelsToSave = currentSessionPixels.map(index => ({
        index,
        color: pixels[index]
      }))
      
      const response = await fetch("/api/pixels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pixels: pixelsToSave }),
      })

      if (!response.ok) throw new Error("Failed to save pixels")
      
      setShowEndImage(true)
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            setTimeout(() => {
              window.location.href = '/'
            }, 500)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      console.error("Error saving pixels:", err)
      // Still show end image even if save fails
      setShowEndImage(true)
    }
  }

  useEffect(() => {
    // Auto-save when pixels are depleted
    if (pixelsLeft === 0 && currentSessionPixels.length > 0 && !showEndImage) {
      handleSave()
    }
  }, [pixelsLeft, currentSessionPixels.length, showEndImage])

  if (showEndImage) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className={`text-center transition-opacity duration-500 ${showEndImage ? 'opacity-100' : 'opacity-0'}`}>
          <motion.h1 
            className="text-5xl lg:text-6xl font-bold leading-tight mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Thank you for your <span className="text-[#8CD6E8]">contribution</span>!
          </motion.h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Returning to start in <span className="font-bold">{countdown}</span> seconds...
          </p>

          <img
            src={TOMASH_IMAGE}
            alt="3D character mascot in yellow jacket"
            className="w-auto h-auto object-contain mx-auto"
            style={{ maxHeight: '60vh' }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col py-4 px-8">
      <div className={`h-full flex flex-col transition-opacity duration-500 ${showEndImage ? 'opacity-0' : 'opacity-100'}`}>
        <motion.div 
          className="text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-bold text-[#0047AB] mb-2">Leave Your Creative Mark</h1>
          <p className="text-lg text-gray-600">Add your pixels to our growing collaborative artwork</p>
        </motion.div>

        <div className="flex-1 bg-white rounded-3xl shadow-xl p-6 flex flex-col">
          <div className="flex-1 flex justify-center items-center">
            <div 
              className="grid gap-0 bg-white rounded-xl border border-gray-200 shadow-inner"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                height: 'min(75vh, 1000px)',
                aspectRatio: '1 / 1',
              }}
            >
              {pixels.map((color, index) => (
                <button
                  key={index}
                  className="w-full h-full transition-all duration-150 hover:brightness-90"
                  style={{ 
                    backgroundColor: color,
                    aspectRatio: '1 / 1',
                    padding: 0,
                    margin: 0,
                    border: 'none',
                    outline: 'none'
                  }}
                  onClick={() => handlePixelClick(index)}
                  disabled={pixelsLeft === 0 && !currentSessionPixels.includes(index)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="flex gap-3 justify-center">
              {COLORS.map((color) => (
                <motion.button
                  key={color}
                  className={`w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                    activeColor === color ? 'ring-4 ring-offset-2 ring-[#8CD6E8] scale-110' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setActiveColor(color)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>

            <div className="flex items-center gap-6">
              <p className="text-lg font-medium">
                Pixels Left: <span className="text-[#0047AB] font-bold">{pixelsLeft}</span>
              </p>
              <Button 
                className="bg-[#0047AB] hover:bg-[#003380] text-white px-8 py-2 text-lg shadow-md hover:shadow-lg transition-all"
                onClick={handleSave}
              >
                Save Artwork
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


