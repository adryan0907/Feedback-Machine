import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PixelGrid from './pixel-grid'
import ColorPalette from './color-palette'

interface PixelArtProps {
  pixels: string[]
  activeColor: string
  onColorSelect: (color: string) => void
  onPixelClick: (index: number) => void
}

const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF']

export function PixelArt({ pixels, activeColor, onColorSelect, onPixelClick }: PixelArtProps) {
  return (
    <Card className="w-full max-w-md mx-auto mt-4">
      <CardHeader>
        <CardTitle className="text-center">Leave Your Mark!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">Color some pixels to commemorate your journey:</p>
        <ColorPalette colors={COLORS} activeColor={activeColor} onColorSelect={onColorSelect} />
        <div className="mt-4">
          <PixelGrid pixels={pixels} activeColor={activeColor} onPixelClick={onPixelClick} />
        </div>
      </CardContent>
    </Card>
  )
}

