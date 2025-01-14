import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PixelArtProps {
  pixels: string[]
  activeColor: string
  onColorSelect: (color: string) => void
  onPixelClick: (index: number) => void
  pixelsLeft: number
  onReset: () => void
}

const COLORS = [
  '#FF0000', // Red
  '#FFA500', // Orange
  '#FFFF00', // Yellow
  '#00FF00', // Green
  '#00BFFF', // Light Blue
  '#0000FF', // Blue
  '#800080', // Purple
  '#FF69B4', // Pink
  '#000000', // Black
]

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
            />
          ))}
        </div>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="flex gap-2 flex-wrap justify-center">
            {COLORS.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                  activeColor === color ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => onColorSelect(color)}
              />
            ))}
          </div>
        </div>

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
        </div>
      </CardContent>
    </Card>
  )
}

