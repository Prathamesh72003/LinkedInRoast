'use client'

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function Hero() {

    const router = useRouter()

    const handleGetRoasted = () => {
        router.push('/roastroom')
    }
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1a1b2e] to-[#0d0e1b] overflow-hidden p-10">
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-4 border-[#4ECDC4]"
            style={{
              top: `${20 + i * 25}%`,
              right: `${10 + i * 5}%`,
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              background: i % 2 === 0 ? '#4ECDC4' : 'white',
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-5xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            LinkBurn
            <br />
            Not so friendly AI Roasting Platform
          </motion.h1>
          
          <motion.p 
            className="text-xl text-[#4ECDC4] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get humbled by AI analyzing your LinkedIn profile. 
            Join thousands of professionals embracing brutal honesty with a touch of humor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="bg-[#4ECDC4] hover:bg-[#3DBDB3] text-[#0d0e1b] font-bold px-8 py-3 text-lg rounded-full"
              onClick={() => handleGetRoasted()}
            >
              Get Roasted
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative dots */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 bg-[#4ECDC4] rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}