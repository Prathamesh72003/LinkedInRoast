'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Users, Zap } from 'lucide-react'

export default function LandingScreen() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-white text-black font-sans">

      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-bold mb-6 leading-tight">Get Roasted, Get Humble</h1>
          <p className="text-xl mb-10 text-gray-600 max-w-2xl mx-auto">The ultimate platform to chill out, relax, and embrace the burn. Prepare for savage takedowns and epic comebacks!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => window.location.href = '/roastroom'}
            className="px-10 py-4 rounded-full bg-black text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <motion.span
              animate={{ x: isHovered ? -10 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Get Roasted Now
            </motion.span>
            <motion.span
              className="inline-block ml-2"
              animate={{ x: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {[
            { icon: Flame, title: 'Savage Roasts', description: 'Experience AI-powered burns that will leave you questioning your life choices' },
            { icon: Users, title: 'Community Burns', description: 'Join roast battles and witness the most epic takedowns in the digital realm' },
            { icon: Zap, title: 'Quick Comebacks', description: 'Level up your wit with our comeback training mode and never be left speechless again' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 rounded-2xl bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-6">
                <feature.icon className="w-16 h-16 text-black" />
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center">{feature.title}</h2>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 text-center text-sm text-gray-500">
        © 2023 RoastMe. All rights reserved. Prepare to get burned.
      </footer>
    </div>
  )
}