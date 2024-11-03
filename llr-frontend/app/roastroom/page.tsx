'use client'

import { useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

export default function RoastPage() {
  const [consentGiven, setConsentGiven] = useState(false)
  const [linkedInUrl, setLinkedInUrl] = useState('')
  const [isUrlValid, setIsUrlValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [roastResult, setRoastResult] = useState('')

  const validateLinkedInUrl = (url: string) => {
    const regex = /^https:\/\/(?:www\.)?linkedin\.com\/in\/[\w\-]+\/?$/
    return regex.test(url)
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setLinkedInUrl(url)
    setIsUrlValid(validateLinkedInUrl(url))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setRoastResult('') 

    try {
      const response = await axios.post('http://localhost:8000/roast', { linkedin_url: linkedInUrl })
      setRoastResult(response.data.roast) 
    } catch (error) {
      console.error('Error fetching roast:', error)
      setRoastResult('An error occurred while fetching your roast. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans p-8">
      <AnimatePresence>
        {!consentGiven && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Consent Form</h2>
            <p className="mb-4">
              Welcome to RoastMe! Before we proceed, please understand that this site is meant for entertainment purposes only. The roasts generated are not to be taken seriously or personally. By clicking "I Agree", you acknowledge that:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>The content is purely for fun and humor</li>
              <li>You will not take offense to any roasts generated</li>
              <li>You understand this is not a platform for cyberbullying or harassment</li>
            </ul>
            <button
              onClick={() => setConsentGiven(true)}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              I Agree
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {consentGiven && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Ready to Get Roasted?</h1>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: roastResult ? -50 : 0 }}
            className="mb-8"
          >
            <input
              type="text"
              value={linkedInUrl}
              onChange={handleUrlChange}
              placeholder="Paste your LinkedIn URL here"
              className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:border-black outline-none transition-colors"
            />
            <button
              onClick={handleSubmit}
              disabled={!isUrlValid || isLoading}
              className={`mt-4 w-full bg-black text-white px-6 py-3 rounded-full transition-colors ${
                !isUrlValid || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
              }`}
            >
              {isLoading ? 'Preparing Your Roast...' : 'Get Humble'}
            </button>
          </motion.div>

          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {roastResult && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-100 p-6 rounded-lg shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-4">Your Personalized Roast</h2>
                {roastResult.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
