import React from 'react'
import { motion } from 'framer-motion'

interface TimerProps {
  timeLeft: number
  maxTime: number
}

export function Timer({ timeLeft, maxTime }: TimerProps) {
  const progress = (timeLeft / maxTime) * 100
  const isLowTime = timeLeft <= maxTime * 0.3

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 transform -rotate-90">
          <circle
            className="text-gray-200"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="20"
            cx="24"
            cy="24"
          />
          <motion.circle
            className={isLowTime ? "text-red-500" : "text-[#8CD6E8]"}
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="20"
            cx="24"
            cy="24"
            style={{
              strokeDasharray: "126",
              strokeDashoffset: 126 - (126 * progress) / 100
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className={`text-lg font-bold ${isLowTime ? "text-red-500" : "text-[#0047AB]"}`}
            animate={{ scale: isLowTime ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5, repeat: isLowTime ? Infinity : 0 }}
          >
            {Math.ceil(timeLeft)}
          </motion.span>
        </div>
      </div>
      <div className="bg-white px-4 py-2 rounded-full border-2 border-black">
        <span className={`font-bold ${isLowTime ? "text-red-500" : "text-[#0047AB]"}`}>
          {isLowTime ? "Hurry!" : "Time"}
        </span>
      </div>
    </div>
  )
}

