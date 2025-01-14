import React from 'react';

interface PixelProps {
  color: string;
  onClick: () => void;
}

const Pixel = ({ color, onClick }: PixelProps) => {
  return (
    <div
      onClick={onClick}
      className={`w-6 h-6 border border-gray-200 cursor-pointer transition-colors duration-150 hover:opacity-90`}
      style={{ backgroundColor: color }}
    />
  );
};

export default Pixel;