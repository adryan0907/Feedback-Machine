import React from 'react'

interface QuestionCardProps {
  question: string
  options: string[]
  onAnswer: (answer: string) => void
}

export function QuestionCard({ question, options, onAnswer }: QuestionCardProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <div className="inline-block px-6 py-2 mb-6 rounded-full border-2 border-black">
        <span className="text-xl font-medium">Question</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{question}</h2>
      
      <div className="w-full bg-[#8CD6E8] rounded-3xl p-8">
        <div className="flex flex-col space-y-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              className="w-full bg-white hover:bg-gray-50 text-black text-lg px-6 py-4 rounded-full border-2 border-black transition-all duration-200 hover:scale-105"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

