'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import type { HeroBlock } from '@/payload-types'

// The 4 main words we land on (in order)
const MAIN_WORDS = ['PROTOTYPE', 'DESIGN', 'BUILD', 'SHIP']
// Filler words that appear during spin (never landed on)
const FILLER_WORDS = [
  'DEPLOY',
  'SCALE',
  'GROW',
  'LAUNCH',
  'CREATE',
  'INNOVATE',
  'DEVELOP',
  'SHIP',
  'BUILD',
  'DESIGN',
]

const WORD_HEIGHT = 60
const SPIN_DURATION = 1350 // Fast spin
const SETTLE_DURATION = 1250 // Time to settle

// Typewriter component for "WE ARE DOCKYARD"
function TypewriterText({ text, isComplete }: { text: string; isComplete: boolean }) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!isComplete) {
      setDisplayedText('')
      return
    }

    let index = 0
    setDisplayedText('')

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(typeInterval)
      }
    }, 80)

    return () => clearInterval(typeInterval)
  }, [isComplete, text])

  useEffect(() => {
    if (!isComplete) return
    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(blinkInterval)
  }, [isComplete])

  return (
    <>
      {displayedText}
      {/*      <motion.span
  animate={{ opacity: showCursor ? 1 : 0 }}
  transition={{ duration: 0 }}
  className="inline-block w-[4px] h-[40px] sm:h-[65px] lg:h-[65px] bg-white ml-1 mb-1 sm:mb-2 align-middle"
/> */}
    </>
  )
}

export default function HeroBlock({
  heroImage,
  heroImagePosition,
  subheadline,
  ctaButton,
  secondaryLink,
}: HeroBlock & {
  heroImagePosition?: {
    position?: string
    customTop?: string
    customRight?: string
    customLeft?: string
    width?: string
    maxWidth?: string
    minWidth?: string
    rotation?: number
  }
}) {
  const getImageUrl = (image: any) => {
    if (typeof image === 'string') return image
    return image?.url || ''
  }

  const getImageDimensions = (image: any) => {
    if (typeof image === 'object' && image?.width && image?.height) {
      return { width: image.width, height: image.height }
    }
    return { width: 1920, height: 1080 }
  }

  const heroUrl = getImageUrl(heroImage)
  const heroDimensions = getImageDimensions(heroImage)

  const getHeroImagePositionStyles = () => {
    const position = heroImagePosition?.position || 'right-center'
    const rotation = -19

    const rotationTransform = `rotate(${rotation}deg)`

    switch (position) {
      case 'right-top':
        return { right: '0', top: '0', transform: rotationTransform }
      case 'right-bottom':
        return { right: '0', bottom: '0', transform: rotationTransform }
      case 'right-center':
        return {
          right: '0',
          top: '61.5%',
          transform: `translateY(-50%) ${rotationTransform}`,
        }
      case 'left-top':
        return { left: '0', top: '0', transform: rotationTransform }
      case 'left-bottom':
        return { left: '0', bottom: '0', transform: rotationTransform }
      case 'left-center':
        return {
          left: '0',
          top: '50%',
          transform: `translateY(-50%) ${rotationTransform}`,
        }
      case 'center':
        return {
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) ${rotationTransform}`,
        }
      case 'custom':
        return {
          top: heroImagePosition?.customTop || '50%',
          right: heroImagePosition?.customRight || 'auto',
          left: heroImagePosition?.customLeft || 'auto',
          transform: `translateY(-50%) ${rotationTransform}`,
        }
      default:
        return {
          right: '0',
          top: '61.5%',
          transform: `translateY(-50%) ${rotationTransform}`,
        }
    }
  }

  const heroImagePositionStyles = getHeroImagePositionStyles()

  // Slot Machine State
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFinal, setIsFinal] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinWords, setSpinWords] = useState<string[]>([])
  const [hasCompleted, setHasCompleted] = useState(false)
  const [displayTopWord, setDisplayTopWord] = useState<string>('')
  const [displayBottomWord, setDisplayBottomWord] = useState<string>('')

  // Get random word that's different from excluded words
  const getRandomWord = (excludedWords: string[]): string => {
    const available = FILLER_WORDS.filter((w) => !excludedWords.includes(w))
    if (available.length === 0) return FILLER_WORDS[0]
    return available[Math.floor(Math.random() * available.length)]
  }

  // Generate random spin sequence ending with target word
  const generateSpinSequence = (targetWord: string): string[] => {
    const sequence: string[] = []
    // Add 15-25 random filler words
    const spinCount = 15 + Math.floor(Math.random() * 10)
    for (let i = 0; i < spinCount; i++) {
      sequence.push(FILLER_WORDS[Math.floor(Math.random() * FILLER_WORDS.length)])
    }
    // End with the target word
    sequence.push(targetWord)
    return sequence
  }

  // Spin animation
  useEffect(() => {
    if (isFinal) {
      setHasCompleted(true)
      return
    }
    if (hasCompleted) return

    const runSequence = async () => {
      const targetWord = MAIN_WORDS[currentIndex]
      const sequence = generateSpinSequence(targetWord)
      setSpinWords(sequence)

      setIsSpinning(true)

      // Fast spin duration
      await new Promise((resolve) => setTimeout(resolve, SPIN_DURATION))
      setIsSpinning(false)

      // Settle time before next
      await new Promise((resolve) => setTimeout(resolve, SETTLE_DURATION))

      if (currentIndex < MAIN_WORDS.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        setIsFinal(true)
      }
    }

    runSequence()
  }, [currentIndex, isFinal, hasCompleted])

  // Get display words (previous, current, next)
  const getDisplayWords = (): [string, string, string] => {
    const prevIndex = currentIndex === 0 ? MAIN_WORDS.length - 1 : currentIndex - 1
    const nextIndex = currentIndex === MAIN_WORDS.length - 1 ? 0 : currentIndex + 1
    return [MAIN_WORDS[prevIndex], MAIN_WORDS[currentIndex], MAIN_WORDS[nextIndex]]
  }

  const [, middleWord] = getDisplayWords()

  // Set top and bottom words to previous and next main words
  useEffect(() => {
    if (isSpinning) return

    const prevIndex = currentIndex === 0 ? MAIN_WORDS.length - 1 : currentIndex - 1
    const nextIndex = currentIndex === MAIN_WORDS.length - 1 ? 0 : currentIndex + 1

    setDisplayTopWord(MAIN_WORDS[prevIndex])
    setDisplayBottomWord(MAIN_WORDS[nextIndex])
  }, [currentIndex, middleWord, isSpinning])

  return (
    <div className="h-screen w-full relative">
      {/* Hero background layer - positioned below navbar */}
      <div className="absolute inset-0 bg-primary-gradient" />

      {/* Hero background with gradient fade to transparent */}
      <div
        className="absolute top-48 left-0 right-0 bottom-0"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            rgba(14, 32, 58, 0.7) 15%,
            rgba(14, 32, 58, 0.7) 85%,
            transparent 100%
          )`,
        }}
      />
      {heroUrl && (
        <Image
          src={heroUrl}
          alt="Hero"
          width={heroDimensions.width}
          height={heroDimensions.height}
          className="absolute opacity-50 z-10 h-auto pointer-events-none select-none object-cover
            !w-[60vw] !max-w-[350px] !min-w-[150px]
            sm:!w-auto sm:!max-w-none sm:!min-w-0"
          style={heroImagePositionStyles}
          priority
        />
      )}

      {/* Desktop Layout - Animation Top Left, Content Centered */}
      <div className="hidden sm:block h-full z-20 relative">
        {/* Slot Machine Animation at Top Left */}
        <AnimatePresence>
          {!isFinal && (
            <motion.div
              key="slot-machine-container"
              className="absolute top-60 left-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                key="slot-machine"
                className="flex flex-col items-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Top muted word - hidden during spin, animates in when landing */}
                <motion.span
                  key={`top-${currentIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isSpinning ? 0 : 0.5,
                    x: isSpinning ? -20 : 0,
                  }}
                  transition={{
                    duration: isSpinning ? 0.2 : 0.6,
                    ease: 'easeOut',
                    delay: isSpinning ? 0 : 0.2,
                  }}
                  className="ml-24 lg:ml-58 text-[90px] lg:text-[110px] font-semibold uppercase text-[#73809A] muted-text-shadow-hero h-[90px] lg:h-[110px] flex items-center"
                >
                  {displayTopWord}
                </motion.span>

                {/* Middle row with "WE" and slot machine window */}
                <div className="ml-8 lg:ml-12 text-[90px] lg:text-[110px] uppercase font-semibold flex items-center h-[90px] lg:h-[110px]">
                  <span className="white-text-shadow-hero">WE </span>

                  {/* Slot Machine Window with mask-based fade */}
                  <div
                    className="relative ml-2 overflow-hidden"
                    style={{
                      height: 330,
                      maskImage: isSpinning
                        ? 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
                        : 'none',
                      WebkitMaskImage: isSpinning
                        ? 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
                        : 'none',
                    }}
                  >
                    {isSpinning ? (
                      <motion.div
                        className="flex flex-col"
                        style={{ paddingTop: 110 }}
                        animate={{
                          y: [0, -110 * (spinWords.length - 1)],
                        }}
                        transition={{
                          y: {
                            duration: SPIN_DURATION / 1000,
                            ease: [0.2, 0.8, 0.2, 1],
                          },
                        }}
                      >
                        {spinWords.map((word, idx) => (
                          <span
                            key={`${word}-${idx}`}
                            className="white-text-shadow-hero h-[90px] lg:h-[110px] flex items-center whitespace-nowrap text-[90px] lg:text-[110px]"
                          >
                            {word}
                          </span>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0.5, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: 'tween',
                        }}
                        className="text-gradient-hero-animate flex items-center text-[90px] lg:text-[110px] h-[90px] lg:h-[110px]"
                        style={{
                          marginTop: 110,
                        }}
                      >
                        {middleWord}
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Bottom muted word - hidden during spin, animates in when landing */}
                <motion.span
                  key={`bottom-${currentIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isSpinning ? 0 : 0.5,
                    x: isSpinning ? -20 : 0,
                  }}
                  transition={{
                    duration: isSpinning ? 0.2 : 0.6,
                    ease: 'easeOut',
                    delay: isSpinning ? 0 : 0.3,
                  }}
                  className="ml-24 lg:ml-58 text-[90px] lg:text-[110px] font-semibold uppercase text-[#73809A] muted-text-shadow-hero h-[90px] lg:h-[110px] flex items-center"
                >
                  {displayBottomWord}
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final State - Centered on screen */}
        <AnimatePresence>
          {isFinal && (
            <motion.div
              key="final-container"
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                key="final"
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  type: 'tween',
                }}
                className="flex flex-col pointer-events-auto"
              >
                {/* Blank top space */}
                <span className="text-center text-[90px] lg:text-[110px] font-semibold uppercase text-[#73809A] muted-text-shadow-hero h-[90px] lg:h-[110px] flex items-center justify-center"></span>

                <p className="text-[90px] lg:text-[110px] uppercase font-semibold flex items-center justify-center h-[90px] lg:h-[110px]">
                  <span className="white-text-shadow-hero">WE </span>
                  <span className="text-gradient-hero flex items-center">
                    <TypewriterText text="&nbsp;ARE DOCKYARD" isComplete={isFinal} />
                  </span>
                </p>

                {/* Blank bottom space */}
                <span className="text-center text-[90px] lg:text-[110px] font-semibold uppercase text-[#73809A] muted-text-shadow-hero h-[90px] lg:h-[110px] flex items-center justify-center"></span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content - Animated, shows after animation completes, positioned lower */}
        <AnimatePresence>
          {isFinal && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.5, // Wait for typewriter to finish
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="pointer-events-auto flex flex-col items-center translate-y-[180px]">
                <span className="tracking-widest text-center text-xl lg:text-2xl font-bold text-brand-gradient max-w-lg mb-6">
                  {subheadline}
                </span>
                {ctaButton && (
                  <Button variant="glower" size="xl" className="w-56 uppercase text-lg">
                    {ctaButton.text}
                  </Button>
                )}
                {secondaryLink && (
                  <Link
                    href={secondaryLink.url || '#'}
                    className="tracking-normal text-center text-xl hover:underline pt-4"
                  >
                    <span>{secondaryLink.text}</span>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Layout - Animation top, content bottom */}
      <div className="flex sm:hidden flex-col h-full z-20 relative px-4">
        {/* Animation at top */}
        <div className="flex-1 flex flex-col justify-center items-center pt-16">
          <AnimatePresence mode="wait">
            {isFinal ? (
              <motion.div
                key="final"
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  type: 'tween',
                }}
                className="flex flex-col items-center"
              >
                <p className="text-[32px] uppercase font-semibold flex items-center h-[40px]">
                  <span className="white-text-shadow-hero">WE </span>
                  <span className="text-gradient-hero flex items-center">
                    <TypewriterText text="&nbsp;ARE DOCKYARD" isComplete={isFinal} />
                  </span>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="slot-machine"
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Middle row with "WE" and slot machine window */}
                <div className="text-[32px] uppercase font-semibold flex items-center h-[40px]">
                  <span className="white-text-shadow-hero">WE </span>

                  {/* Slot Machine Window with mask-based fade */}
                  <div
                    className="relative ml-1 overflow-hidden"
                    style={{
                      height: 120,
                      maskImage: isSpinning
                        ? 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
                        : 'none',
                      WebkitMaskImage: isSpinning
                        ? 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
                        : 'none',
                    }}
                  >
                    {isSpinning ? (
                      <motion.div
                        className="flex flex-col"
                        style={{ paddingTop: 40 }}
                        animate={{
                          y: [0, -40 * (spinWords.length - 1)],
                        }}
                        transition={{
                          y: {
                            duration: SPIN_DURATION / 1000,
                            ease: [0.2, 0.8, 0.2, 1],
                          },
                        }}
                      >
                        {spinWords.map((word, idx) => (
                          <span
                            key={`${word}-${idx}`}
                            className="white-text-shadow-hero h-[40px] flex items-center whitespace-nowrap text-[32px]"
                          >
                            {word}
                          </span>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0.5, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: 'tween',
                        }}
                        className="text-gradient-hero-animate flex items-center text-[32px] h-[40px]"
                        style={{
                          marginTop: 40,
                        }}
                      >
                        {middleWord}
                      </motion.span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content at bottom */}
          <div className="flex flex-col">
            <span className="tracking-widest text-center text-base font-bold text-brand-gradient">
              {subheadline}
            </span>
            {ctaButton && (
              <Button variant="glower" size="xl" className="w-48 uppercase">
                {ctaButton.text}
              </Button>
            )}
            {secondaryLink && (
              <Link
                href={secondaryLink.url || '#'}
                className="tracking-normal text-center text-base hover:underline pt-4"
              >
                <span>{secondaryLink.text}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
