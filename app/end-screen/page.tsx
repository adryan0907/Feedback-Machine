'use client'

import { motion } from 'framer-motion'
import { RefreshCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function EndScreen() {
  const router = useRouter()

  const handleRestart = () => {
    router.push('/')
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto min-h-screen py-12 px-4">
      <div className="inline-block px-6 py-2 mb-6 rounded-full border-2 border-black">
        <span className="text-xl font-medium">Complete!</span>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        Thank you for your
        <br />
        <span className="text-[#8CD6E8]">participation!</span>
      </h2>
      
      <div className="w-full bg-[#8CD6E8] rounded-3xl p-8 mb-8 relative">
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <p className="text-xl">Thank you for completing the survey and creating your pixel art!</p>
          <p className="text-xl">Your responses have been recorded.</p>
        </div>
        <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iPad%20Pro%2012.9_%20-%204-ReAwxHLjqcDCjVbuqWWOuguKBAvQup.png"
            alt="Tomash mascot"
            className="w-48 h-48 object-contain"
          />
        </div>
      </div>
      
      <motion.button
        onClick={handleRestart}
        className="mt-8 bg-[#8CD6E8] hover:bg-[#7BC5D7] text-black text-lg px-8 py-6 rounded-full flex items-center transition-all duration-200 hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start New Quest <RefreshCcw className="ml-2 h-5 w-5" />
      </motion.button>
    </div>
  )
}

