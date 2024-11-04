'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from 'lucide-react'

export default function RoastRoom() {
  const [consentGiven, setConsentGiven] = useState(false)
  const [linkedInUrl, setLinkedInUrl] = useState('')
  const [isUrlValid, setIsUrlValid] = useState(false)
  const [roastResponse, setRoastResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateLinkedInUrl = (url: string) => {
    const regex = /^https:\/\/[a-z]{2,3}\.linkedin\.com\/in\/[\w\-]+\/?$/i
    return regex.test(url)
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setLinkedInUrl(url)
    setIsUrlValid(validateLinkedInUrl(url))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setRoastResponse('')

    try {
      const response = await fetch('https://linkedinroast-production.up.railway.app:8000/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ linkedin_url: linkedInUrl }),
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1b2e] to-[#0d0e1b] text-white p-8">
      <h1 className="text-5xl font-bold text-center mb-12">LinkBurn</h1>

      <AnimatePresence>
        {!consentGiven && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white text-[#0d0e1b] p-8 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Consent Form</h2>
              <p className="mb-4">
                Welcome to LinkBurn!! Before we proceed, please understand that this site is meant for entertainment purposes only. The roasts generated are not to be taken seriously or personally. By clicking &apos;I Agree&apos;, you acknowledge that:
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
          className="max-w-md mx-auto"
        >
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Enter LinkedIn Profile URL"
              value={linkedInUrl}
              onChange={handleUrlChange}
              className="w-full p-3 bg-white text-[#0d0e1b] rounded-lg"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!isUrlValid}
            className="w-full bg-[#4ECDC4] hover:bg-[#3DBDB3] text-[#0d0e1b] font-bold py-3 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Get Roasted'}
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {roastResponse && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="mt-8 bg-white bg-opacity-20 backdrop-blur-lg text-[#0d0e1b] p-6 rounded-lg shadow-lg border border-[#4ECDC4] max-w-2xl mx-auto"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-center text-blue-300">Enjoy Your Roast</h3>
              <Button
                onClick={() => setRoastResponse('')}
                variant="ghost"
                size="icon"
                className="text-[#0d0e1b] hover:bg-[#4ECDC4] hover:text-white rounded-full"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="max-h-[300px] overflow-y-auto scrollbar-hide text-white">
              {roastResponse.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-lg leading-relaxed text-white">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}