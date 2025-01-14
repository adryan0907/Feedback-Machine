import React from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from 'lucide-react'

interface StartPageProps {
  onStart: () => void
}

export function StartPage({ onStart }: StartPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="relative w-full max-w-4xl mx-auto text-center">
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
            src="https://i.ibb.co/rmc10Mt/ovodv-httpss-mj-run9g-LNTGXsh24-Happy-guy-standing-open-month-cd580a6c-5a38-44ca-9c27-3e549b9eee5b-0.png"
            alt="3D character mascot in yellow jacket"
            className="relative z-10 w-full h-auto"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 relative z-20">
          <Button
            onClick={onStart}
            size="lg"
            className="bg-[#8CD6E8] hover:bg-[#7BC5D7] text-black text-lg h-14 px-8 rounded-full transition-all duration-200 hover:scale-105"
          >
            Begin <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

