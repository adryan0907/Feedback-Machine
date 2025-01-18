import React from 'react';

interface ColorPaletteProps {
  colors: string[];
  activeColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPalette = ({ colors, activeColor, onColorSelect }: ColorPaletteProps) => {
  return (
    <div className="flex gap-4 justify-center p-4 bg-white rounded-lg shadow-md">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          className={`w-10 h-10 rounded-full transition-transform duration-200 hover:scale-110 ${
            activeColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorPalette;