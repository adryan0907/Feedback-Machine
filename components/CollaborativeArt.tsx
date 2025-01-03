'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CollaborativeArtProps {
  onComplete: () => void
}

export function CollaborativeArt({ onComplete }: CollaborativeArtProps) {
  const [canvas, setCanvas] = useState<string[][]>(Array(5).fill(null).map(() => Array(5).fill(null)))
  const [userColor, setUserColor] = useState('')

  useEffect(() => {
    setUserColor(generateRandomColor())
  }, [])

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16)
  }

  const handleAddColor = () => {
    const row = Math.floor(Math.random() * 5)
    const col = Math.floor(Math.random() * 5)
    
    const newCanvas = [...canvas]
    newCanvas[row][col] = userColor
    setCanvas(newCanvas)
    onComplete()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Collaborative Campus Art</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {canvas.map((row, rowIndex) => (
            row.map((color, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-12 h-12 rounded-md"
                style={{ backgroundColor: color || '#f0f0f0' }}
              />
            ))
          ))}
        </div>
        <p className="text-center mb-4">Add your color to the collaborative artwork!</p>
        <div className="flex items-center justify-center mb-4">
          <div
            className="w-8 h-8 rounded-full mr-2"
            style={{ backgroundColor: userColor }}
          />
          <span>Your color</span>
        </div>
        <Button
          onClick={handleAddColor}
          className="w-full"
        >
          Add Your Color
        </Button>
      </CardContent>
    </Card>
  )
}

