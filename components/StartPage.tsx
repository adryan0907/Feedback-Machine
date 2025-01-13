import React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

interface StartPageProps {
  onStart: () => void
}

export function StartPage({ onStart }: StartPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="relative w-full max-w-4xl mx-auto text-center">
        <div className="inline-block px-6 py-2 mb-6 rounded-full border-2 border-black">
          <span className="text-xl font-medium">Hello!</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
          I'm <span className="text-[#8CD6E8]">Tomash</span>,
          <br />
          Help me with your
          <br />
          answer
        </h1>

        <div className="relative w-full max-w-2xl mx-auto mb-8">
          <div className="absolute inset-0 bg-[#8CD6E8] rounded-full transform translate-y-1/4"></div>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mascott.jpg-DT5IHpbvWghEIBKVFcX9n9fwjHF03j.jpeg"
            alt="3D character mascot in yellow jacket"
            className="relative z-10 w-full h-auto"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 relative z-20">
          <button
            onClick={onStart}
            className="bg-[#8CD6E8] hover:bg-[#7BC5D7] text-black text-lg px-8 py-6 rounded-full flex items-center transition-all duration-200 hover:scale-105"
          >
            Start <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button
            className="bg-white hover:bg-gray-50 text-black text-lg px-8 py-6 rounded-full border-2 border-black transition-all duration-200 hover:scale-105"
          >
            More info
          </button>
        </div>
      </div>
    </div>
  )
}

