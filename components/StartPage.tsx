import React from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { AdminButton } from './BurgerMenu'

// Add the image URL
const TOMASH_IMAGE = "https://i.ibb.co/rmc10Mt/ovodv-httpss-mj-run9g-LNTGXsh24-Happy-guy-standing-open-month-cd580a6c-5a38-44ca-9c27-3e549b9eee5b-0.png"

interface StartPageProps {
  onStart: () => void
}

export function StartPage({ onStart }: StartPageProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center relative">
      <AdminButton />
      <div className="h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-6xl mx-auto text-center space-y-8">
          <motion.h1 
            className="text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 50
            }}
          >
            Join <span className="text-[#8CD6E8]">Tomash</span> in Creating
            <br />
            A Collaborative Masterpiece
          </motion.h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your perspective through our interactive survey and contribute to our 
            growing pixel art canvas. Every response shapes our understanding, and every 
            pixel adds to our collective artwork.
          </p>

          <div className="relative w-full max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-[#8CD6E8] rounded-full transform translate-y-1/4"></div>
            <img
              src={TOMASH_IMAGE}
              alt="3D character mascot in yellow jacket"
              className="relative z-10 w-full h-auto object-contain"
              style={{ maxHeight: '500px' }}
            />
          </div>

          <div className="relative z-20 mt-12">
            <Button
              onClick={onStart}
              size="lg"
              className="bg-white hover:bg-gray-100 text-black text-lg h-14 px-8 rounded-full transition-all duration-200 hover:scale-105"
            >
              Start Your Contribution <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

