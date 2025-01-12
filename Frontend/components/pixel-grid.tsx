import React from 'react';

interface PixelGridProps {
  pixels: string[];
  activeColor: string;
  onPixelClick: (index: number) => void;
}

const PixelGrid = ({ pixels, onPixelClick }: PixelGridProps) => {
  return (
    <div className="grid grid-cols-32 gap-0 bg-white rounded-lg shadow-lg p-2" style={{ width: '320px', height: '320px' }}>
      {pixels.map((color, index) => (
        <div
          key={index}
          className="w-2.5 h-2.5 cursor-pointer transition-colors duration-150 hover:opacity-90"
          style={{ backgroundColor: color }}
          onClick={() => onPixelClick(index)}
        />
      ))}
    </div>
  );
};

export default PixelGrid;

