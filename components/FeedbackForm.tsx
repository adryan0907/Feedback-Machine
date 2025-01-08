import React, { useState } from 'react';
import PixelGrid from '../components/PixelGrid';
import ColorPalette from '../components/ColorPalette';
import { Button } from "@/components/ui/button";

const COLORS = [
  '#0EA5E9', // Ocean Blue
  '#D946EF', // Magenta Pink
  '#F97316', // Bright Orange
  '#9b87f5', // Primary Purple
  '#000000', // Pure Black
  '#8B5CF6', // Vivid Purple
  '#ea384c', // Red
  '#FFFFFF', // Pure White
];

const Index = () => {
  const [pixels, setPixels] = useState<string[]>(Array(1024).fill('#FFFFFF'));
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [showFeedback, setShowFeedback] = useState(false);

  const handlePixelClick = (index: number) => {
    const newPixels = [...pixels];
    newPixels[index] = activeColor;
    setPixels(newPixels);
  };

  // const handleFeedbackSubmit = (feedback: string) => {
  //   console.log('Feedback submitted:', feedback);
  //   toast.success('Thank you for your feedback!');
  //   setShowFeedback(false);
  // };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">Pixel Art Creator</h1>
        <div className="flex flex-col items-center gap-8">
          <PixelGrid
            pixels={pixels}
            activeColor={activeColor}
            onPixelClick={handlePixelClick}
          />
          <ColorPalette
            colors={COLORS}
            activeColor={activeColor}
            onColorSelect={setActiveColor}
          />
          <Button
            onClick={() => setShowFeedback(true)}
            className="mt-8"
          >
            Share Your Feedback
          </Button>
        </div>

        {/* {showFeedback && (
          <div className="mt-8">
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Index;