"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { X, Copy, Check, Flame, ThermometerSun, Zap, Skull } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function RoastRoom() {
  const [consentGiven, setConsentGiven] = useState(false)
  const [linkedInUrl, setLinkedInUrl] = useState('')
  const [isUrlValid, setIsUrlValid] = useState(false)
  const [roastResponse, setRoastResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [brutalityLevel, setBrutalityLevel] = useState(30)

  const { toast } = useToast()

  const validateLinkedInUrl = (url: string) => {
    const regex = /^https:\/\/[a-z]{2,3}\.linkedin\.com\/in\/[\w\-]+\/?$/i
    return regex.test(url)
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setLinkedInUrl(url)
    setIsUrlValid(validateLinkedInUrl(url))
  }

  const handleBrutalityChange = (value: number[]) => {
    const levels = [30, 50, 70, 100]
    const closestLevel = levels.reduce((prev, curr) => 
      Math.abs(curr - value[0]) < Math.abs(prev - value[0]) ? curr : prev
    )
    setBrutalityLevel(closestLevel)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setRoastResponse('')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/roast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          linkedin_url: linkedInUrl,
          brutality_level: brutalityLevel
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Error fetching roast');
      }
      setRoastResponse(data.roast);
    } catch (error) {
      console.error('Error fetching roast:', error);
      setRoastResponse('An error occurred while fetching your roast. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(roastResponse);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Your roast has been copied to the clipboard.",
      })
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        title: "Failed to copy",
        description: "An error occurred while copying the text.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1b2e] to-[#0d0e1b] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Link<span className="text-[#4ECDC4]">Burn</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-center mb-12 text-gray-300"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Roast your LinkedIn profile with AI-powered humor!
        </motion.p>

        <AnimatePresence>
          {!consentGiven && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            >
              <div className="bg-white text-[#0d0e1b] p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Consent Form</h2>
                <p className="mb-4">
                  Welcome to LinkBurn! Before we proceed, please understand that this site is meant for entertainment purposes only. The roasts generated are not to be taken seriously or personally. By clicking &apos;I Agree&apos;, you acknowledge that:
                </p>
                <ul className="list-disc pl-5 mb-6">
                  <li>The content is purely for fun and humor</li>
                  <li>You will not take offense to any roasts generated</li>
                  <li>You understand this is not a platform for cyberbullying or harassment</li>
                </ul>
                <Button
                  onClick={() => setConsentGiven(true)}
                  className="w-full bg-[#4ECDC4] hover:bg-[#3DBDB3] text-[#0d0e1b] font-bold py-3 text-lg rounded-full"
                >
                  I Agree
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {consentGiven && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg"
          >
            <div className="mb-6">
              <label htmlFor="linkedin-url" className="block text-sm font-medium text-gray-300 mb-2">
                LinkedIn Profile URL
              </label>
              <Input
                id="linkedin-url"
                type="text"
                placeholder="https://www.linkedin.com/in/your-profile"
                value={linkedInUrl}
                onChange={handleUrlChange}
                className="w-full p-3 bg-white bg-opacity-20 text-white rounded-lg border-2 border-[#4ECDC4] focus:border-[#3DBDB3] focus:ring-[#3DBDB3] transition-colors"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="brutality-slider" className="block text-sm font-medium text-gray-300 mb-2">
                Brutality Level: {brutalityLevel}
              </label>
              <Slider
                id="brutality-slider"
                min={30}
                max={100}
                step={1}
                value={[brutalityLevel]}
                onValueChange={handleBrutalityChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span className="flex items-center"><ThermometerSun className="mr-1" /> Mild</span>
                <span className="flex items-center"><Flame className="mr-1" /> Medium</span>
                <span className="flex items-center"><Zap className="mr-1" /> Spicy</span>
                <span className="flex items-center"><Skull className="mr-1" /> Nuclear</span>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!isUrlValid || isLoading}
              className="w-full bg-[#4ECDC4] hover:bg-[#3DBDB3] text-[#0d0e1b] font-bold py-3 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Roasting...' : 'Get Roasted'}
            </Button>
          </motion.div>
        )}

        <AnimatePresence>
          {roastResponse && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mt-8 bg-white bg-opacity-20 backdrop-blur-lg text-white p-6 rounded-lg shadow-lg border-2 border-[#4ECDC4]"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-[#4ECDC4]">Enjoy Your Roast</h3>
                <div className="flex space-x-2">
                  <Button
                    onClick={copyToClipboard}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-[#4ECDC4] hover:text-[#0d0e1b] rounded-full transition-colors"
                  >
                    {isCopied ? <Check className="h-6 w-6" /> : <Copy className="h-6 w-6" />}
                  </Button>
                  <Button
                    onClick={() => setRoastResponse('')}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-[#4ECDC4] hover:text-[#0d0e1b] rounded-full transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
                {roastResponse.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}