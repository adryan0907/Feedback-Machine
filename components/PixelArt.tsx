'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function PixelArtPage() {
  const router = useRouter()
  const [pixels, setPixels] = useState<string[]>([])
  const [currentSessionPixels, setCurrentSessionPixels] = useState<number[]>([])
  const [activeColor, setActiveColor] = useState('#FF4136')
  const [pixelsLeft, setPixelsLeft] = useState(3)
  const [gridSize, setGridSize] = useState({ rows: 30, cols: 30 })

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
    const totalPixels = gridSize.rows * gridSize.cols
    const savedPixels = localStorage.getItem('pixelGrid')
    if (savedPixels) {
      setPixels(JSON.parse(savedPixels))
    } else {
      setPixels(Array(totalPixels).fill('#FFFFFF'))
    }
  }, [gridSize])

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = Math.min(window.innerWidth * 0.9, 600)
      const pixelSize = containerWidth / 30 // We want 30 pixels per row
      const rows = Math.floor(containerWidth / pixelSize)
      const cols = Math.floor((window.innerHeight * 0.6) / pixelSize) // Adjust this multiplier as needed
      setGridSize({ rows, cols })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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

  const handleReset = () => {
    const newPixels = [...pixels]
    currentSessionPixels.forEach(index => {
      newPixels[index] = '#FFFFFF'
    })
    setPixels(newPixels)
    setCurrentSessionPixels([])
    setPixelsLeft(3)
  }

  const handleSave = () => {
    localStorage.setItem('pixelGrid', JSON.stringify(pixels))
    router.push('/end-screen')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0047AB] mb-2">Paint and Enjoy</h1>
          <p className="text-gray-500">or destroy the image</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex justify-center mb-8 overflow-auto">
            <div 
              className="grid gap-0 bg-white rounded-xl border-2 border-gray-200 p-2"
              style={{
                gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
                width: 'min(90vw, 600px)',
                height: 'auto',
                aspectRatio: `${gridSize.cols} / ${gridSize.rows}`
              }}
            >
              {pixels.map((color, index) => (
                <button
                  key={index}
                  className="w-full h-full border border-gray-100 transition-colors duration-150 hover:opacity-90"
                  style={{ backgroundColor: color, aspectRatio: '1 / 1' }}
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
              <div className="space-x-4">
                <Button 
                  variant="outline" 
                  className="text-[#0047AB] px-8 py-2 text-lg"
                  onClick={handleReset}
                >
                  Reset
                </Button>
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
    </div>
  )
}

