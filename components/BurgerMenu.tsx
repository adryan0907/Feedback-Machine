import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { UserCog } from 'lucide-react'

export function AdminButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      >
        <UserCog className="w-6 h-6 text-gray-800 group-hover:text-[#8CD6E8]" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-14 right-0 bg-white rounded-xl shadow-xl p-2"
          >
            <Link 
              href="/admin" 
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors hover:text-[#8CD6E8]"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg whitespace-nowrap">Admin Dashboard</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 