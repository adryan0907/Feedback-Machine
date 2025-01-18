'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

<<<<<<< HEAD
interface PixelArtProps {
  pixels: string[]
  activeColor: string
  onColorSelect: (color: string) => void
  onPixelClick: (index: number) => void
  pixelsLeft: number
  onReset: () => void
}
=======
// Define the image URL from StartPage
const TOMASH_IMAGE = "https://i.ibb.co/rmc10Mt/ovodv-httpss-mj-run9g-LNTGXsh24-Happy-guy-standing-open-month-cd580a6c-5a38-44ca-9c27-3e549b9eee5b-0.png"
>>>>>>> master

// Define an inspiring pixel art template - a simple landscape
const TEMPLATE_ART = [
  // Sun (yellow)
  { positions: [2 * 30 + 3, 2 * 30 + 4, 3 * 30 + 3, 3 * 30 + 4], color: '#FFDC0044' },
  // Clouds (light blue)
  { positions: [2 * 30 + 10, 2 * 30 + 11, 2 * 30 + 12, 3 * 30 + 11], color: '#00BCD444' },
  { positions: [3 * 30 + 20, 3 * 30 + 21, 3 * 30 + 22, 2 * 30 + 21], color: '#00BCD444' },
  // Trees (green)
  { positions: [
    20 * 30 + 8, 21 * 30 + 8, 22 * 30 + 8, // trunk
    19 * 30 + 7, 19 * 30 + 8, 19 * 30 + 9, // leaves
    18 * 30 + 8
  ], color: '#2ECC4044' },
  { positions: [
    20 * 30 + 15, 21 * 30 + 15, 22 * 30 + 15, // trunk
    19 * 30 + 14, 19 * 30 + 15, 19 * 30 + 16, // leaves
    18 * 30 + 15
  ], color: '#2ECC4044' },
  // Ground (darker green)
  { positions: Array.from({ length: 30 }, (_, i) => 23 * 30 + i), color: '#2ECC4044' },
  // Mountains (purple)
  { positions: [
    15 * 30 + 5, 16 * 30 + 4, 16 * 30 + 5, 16 * 30 + 6,
    17 * 30 + 3, 17 * 30 + 4, 17 * 30 + 5, 17 * 30 + 6, 17 * 30 + 7
  ], color: '#B10DC944' }
].flat()

<<<<<<< HEAD
export function PixelArt({ pixels, activeColor, onColorSelect, onPixelClick, pixelsLeft, onReset }: PixelArtProps) {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-[#0047AB] text-3xl">Paint and Enjoy</CardTitle>
        <p className="text-center text-gray-500">You have {pixelsLeft} pixels to place</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="grid grid-cols-30 gap-0 bg-white rounded-xl border-2 border-gray-200 p-2 w-full aspect-square">
          {pixels.map((color, index) => (
            <button
              key={index}
              className="w-full h-full border border-gray-100 transition-colors duration-150 hover:opacity-90"
              style={{ backgroundColor: color, aspectRatio: '1 / 1' }}
              onClick={() => onPixelClick(index)}
              disabled={pixelsLeft === 0 && color === '#FFFFFF'}
=======
const GRID_SIZE = 30 // Fixed 30x30 grid

export default function PixelArtPage() {
  const router = useRouter()
  const [pixels, setPixels] = useState<string[]>([])
  const [currentSessionPixels, setCurrentSessionPixels] = useState<number[]>([])
  const [activeColor, setActiveColor] = useState('#FF4136')
  const [pixelsLeft, setPixelsLeft] = useState(5)
  const [showEndImage, setShowEndImage] = useState(false)
  const [countdown, setCountdown] = useState(3)

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
    const totalPixels = GRID_SIZE * GRID_SIZE
    const initialPixels = Array(totalPixels).fill('#FFFFFF')
    
    // Add the template art with 30% opacity
    TEMPLATE_ART.forEach(item => {
      item.positions.forEach(position => {
        if (position < totalPixels) {
          initialPixels[position] = item.color
        }
      })
    })
    setPixels(initialPixels)
  }, [])

  const handlePixelClick = (index: number) => {
    if (pixelsLeft > 0 && !currentSessionPixels.includes(index)) {
      const newPixels = [...pixels]
      newPixels[index] = activeColor
      setPixels(newPixels)
      setCurrentSessionPixels([...currentSessionPixels, index])
      setPixelsLeft(prev => prev - 1)
    }
  }

  const handleSave = () => {
    setShowEndImage(true)
    
    // Start countdown with smooth transition
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setTimeout(() => {
            // Reset everything and redirect to start
            window.location.href = '/'
          }, 500)
          return 3
        }
        return prev - 1
      })
    }, 1000)
  }

  if (showEndImage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className={`text-center max-w-4xl mx-auto px-4 transition-opacity duration-500 ${showEndImage ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Thank you for your <span className="text-[#8CD6E8]">art</span>!
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Returning to start in {countdown} seconds...
          </p>
          <div className="relative w-full max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-[#8CD6E8] rounded-full transform translate-y-1/4"></div>
            <img
              src={TOMASH_IMAGE}
              alt="3D character mascot in yellow jacket"
              className="relative z-10 w-full h-auto"
>>>>>>> master
            />
          </div>
        </div>
      </div>
    )
  }

<<<<<<< HEAD
        <div className="flex items-center justify-between w-full mt-4">
          <p className="text-sm text-gray-500">Pixels Left: {pixelsLeft}</p>
          <div className="space-x-2">
            <Button variant="outline" className="text-[#0047AB]" onClick={onReset}>
              Reset
            </Button>
            <Button variant="outline" className="text-[#0047AB]">
              Save
            </Button>
          </div>
=======
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className={`max-w-6xl mx-auto transition-opacity duration-500 ${showEndImage ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-center mb-8">
          <p className="text-xl text-gray-600 mb-6">Thank you for your participation!</p>
          <h1 className="text-4xl font-bold text-[#0047AB] mb-2">Paint and Enjoy</h1>
          <p className="text-gray-500">or destroy the image</p>
>>>>>>> master
        </div>
        
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex justify-center mb-8 overflow-auto">
            <div 
              className="grid gap-0 bg-white rounded-xl border-2 border-gray-200 p-2"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                width: 'min(90vw, 600px)',
                height: 'auto',
                aspectRatio: '1 / 1'
              }}
            >
              {pixels.map((color, index) => (
                <button
                  key={index}
                  className="w-full h-full transition-all duration-150 hover:brightness-90 rounded-sm"
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

          <div className="flex flex-col items-center gap-8">
            <div className="flex gap-4 justify-center flex-wrap">
              {COLORS.map((color) => (
                <button
                  key={color}
                  className={`w-12 h-12 rounded-full transition-transform hover:scale-110 ${
                    activeColor === color ? 'ring-4 ring-offset-2 ring-blue-500 scale-110' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setActiveColor(color)}
                />
              ))}
            </div>

            <div className="flex items-center gap-8 flex-wrap justify-center">
              <p className="text-xl font-medium">
                Pixels Left: <span className="text-[#0047AB] font-bold">{pixelsLeft}</span>
              </p>
              <Button 
                className="bg-[#0047AB] hover:bg-[#003380] text-white px-8 py-2 text-lg"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

