import React from 'react';
import Pixel from './Pixel';

interface PixelGridProps {
  pixels: string[];
  activeColor: string;
  onPixelClick: (index: number) => void;
}

const PixelGrid = ({ pixels, activeColor, onPixelClick }: PixelGridProps) => {
  return (
    <div className="grid grid-cols-32 gap-0 bg-white p-4 rounded-lg shadow-md">
      {pixels.map((color, index) => (
        <Pixel
          key={index}
          color={color}
          onClick={() => onPixelClick(index)}
        />
      ))}
    </div>
  );
};

export default PixelGrid;