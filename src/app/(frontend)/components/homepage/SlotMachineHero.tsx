'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ['PROTOTYPE', 'DESIGN', 'BUILD', 'SHIP']
const DURATION_PER_WORD = 1500 // Time to show each word
const TRANSITION_DURATION = 600 // Time to transition between words
const FINAL_DISPLAY_DURATION = 3000 // Time to show final message

export default function SlotMachineHero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [direction, setDirection] = useState(1) // 1 for down, -1 for up

  const nextWord = useCallback(() => {
    if (currentIndex < words.length - 1) {
      setDirection(1)
      setCurrentIndex((prev) => prev + 1)
    } else {
      // All words shown, show final message
      setIsComplete(true)
    }
  }, [currentIndex])

  useEffect(() => {
    if (isComplete) {
      // After showing final message, restart the cycle
      const finalTimer = setTimeout(() => {
        setIsComplete(false)
        setCurrentIndex(0)
      }, FINAL_DISPLAY_DURATION)
      return () => clearTimeout(finalTimer)
    }

    // Cycle through words
    const timer = setTimeout(() => {
      nextWord()
    }, DURATION_PER_WORD)

    return () => clearTimeout(timer)
  }, [currentIndex, isComplete, nextWord])

  return (
    <div className="h-screen w-full relative overflow-visible pt-80">
      {/* Background */}
      <div className="absolute top-27 overflow-visible w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1f35] to-[#0a1628]" />
      </div>

      <div className="flex flex-col pt-20 z-20 mt-10 leading-tight tracking-[0.1rem] relative pl-80 pr-80">
        {/* Static "WE" */}
        <div className="flex items-center ml-12">
          <span className="text-[70px] font-semibold uppercase white-text-shadow-hero">WE </span>

          {/* Slot Machine Container */}
          <div className="relative h-[70px] overflow-hidden ml-4" style={{ width: '400px' }}>
            <AnimatePresence mode="popLayout" custom={direction}>
              {!isComplete ? (
                <motion.span
                  key={currentIndex}
                  custom={direction}
                  initial={{
                    y: direction * 100,
                    opacity: 0,
                    filter: 'blur(10px)',
                    scale: 0.8,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    scale: 1,
                  }}
                  exit={{
                    y: direction * -100,
                    opacity: 0,
                    filter: 'blur(10px)',
                    scale: 0.8,
                  }}
                  transition={{
                    y: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                      duration: TRANSITION_DURATION / 1000,
                    },
                    opacity: { duration: 0.3 },
                    filter: { duration: 0.4 },
                    scale: { duration: 0.3 },
                  }}
                  className="absolute text-[70px] font-semibold uppercase text-gradient-hero"
                >
                  {words[currentIndex]}
                </motion.span>
              ) : (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                    duration: 0.6,
                  }}
                  className="flex"
                >
                  <span className="text-[70px] font-semibold uppercase white-text-shadow-hero">
                    WE ARE{' '}
                  </span>
                  <span className="text-[70px] font-semibold uppercase text-gradient-hero">
                    DOCKYARD
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Subheadline */}
        <div className="ml-10 w-full flex flex-col space-y-6 min-w-110 max-w-110 justify-center items-center align-center mt-8">
          <span className="ml-10 tracking-normal text-center text-md max-w-400 font-bold mt-4 off-white-text-shadow-hero">
            Custom web applications and bespoke digital products for forward-thinking brands
          </span>
          <button className="w-50 uppercase px-6 py-3 bg-gradient-to-r from-[#E45DFF] to-[#00CDF4] rounded-full font-semibold text-white hover:opacity-90 transition-opacity">
            Get in touch
          </button>
          <a
            href="#"
            className="tracking-normal text-center text-sm max-w-400 hover:underline pt-2 text-white/80"
          >
            or read more below....
          </a>
        </div>
      </div>
    </div>
  )
}
