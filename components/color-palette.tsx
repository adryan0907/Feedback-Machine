import React from 'react';

interface ColorPaletteProps {
  colors: string[];
  activeColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPalette = ({ colors, activeColor, onColorSelect }: ColorPaletteProps) => {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-lg">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-10 h-10 rounded-full transition-transform ${
            activeColor === color ? 'scale-110 ring-2 ring-offset-2 ring-blue-500' : ''
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
        />
      ))}
    </div>
  );
};

export default ColorPalette;

