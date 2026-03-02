'use client'

import { useState, useEffect, useMemo } from 'react'
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
      <motion.span
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0 }}
        className="inline-block w-[2px] h-[55px] bg-white ml-1 mb-2 align-middle"
      />
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

  const getMarginClass = (marginLeft: string | null | undefined) => {
    const value = marginLeft || '0'
    if (value === '0') return 'ml-0'
    if (value === '12') return 'ml-12'
    if (value === '47') return 'ml-47'
    return 'ml-0'
  }

  const getMarginStyle = (marginLeft: string | null | undefined) => {
    const value = marginLeft || '0'
    if (value === '0' || value === '12' || value === '47') return undefined
    return { marginLeft: `${value}rem` }
  }

  const getHeroImageStyles = () => {
    const position = heroImagePosition?.position || 'right-center'
    const width = heroImagePosition?.width || '28vw'
    const maxWidth = heroImagePosition?.maxWidth ? `${heroImagePosition.maxWidth}px` : '800px'
    const minWidth = heroImagePosition?.minWidth ? `${heroImagePosition.minWidth}px` : '200px'
    const rotation = heroImagePosition?.rotation ?? 0

    const baseStyles: React.CSSProperties = {
      width,
      maxWidth,
      minWidth,
      height: 'auto',
    }

    const rotationTransform = rotation !== 0 ? `rotate(${rotation}deg)` : ''

    switch (position) {
      case 'right-top':
        return { ...baseStyles, right: '0', top: '0', transform: rotationTransform || 'none' }
      case 'right-bottom':
        return { ...baseStyles, right: '0', bottom: '0', transform: rotationTransform || 'none' }
      case 'right-center':
        return {
          ...baseStyles,
          right: '0',
          top: '61.5%',
          transform: `translateY(-50%)${rotationTransform ? ` ${rotationTransform}` : ''}`,
        }
      case 'left-top':
        return { ...baseStyles, left: '0', top: '0', transform: rotationTransform || 'none' }
      case 'left-bottom':
        return { ...baseStyles, left: '0', bottom: '0', transform: rotationTransform || 'none' }
      case 'left-center':
        return {
          ...baseStyles,
          left: '0',
          top: '50%',
          transform: `translateY(-50%)${rotationTransform ? ` ${rotationTransform}` : ''}`,
        }
      case 'center':
        return {
          ...baseStyles,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%)${rotationTransform ? ` ${rotationTransform}` : ''}`,
        }
      case 'custom':
        return {
          ...baseStyles,
          top: heroImagePosition?.customTop || '50%',
          right: heroImagePosition?.customRight || 'auto',
          left: heroImagePosition?.customLeft || 'auto',
          transform: `translateY(-50%)${rotationTransform ? ` ${rotationTransform}` : ''}`,
        }
      default:
        return {
          ...baseStyles,
          right: '0',
          top: '61.5%',
          transform: `translateY(-50%)${rotationTransform ? ` ${rotationTransform}` : ''}`,
        }
    }
  }

  const heroImageStyles = getHeroImageStyles()

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
          className="absolute z-10 h-auto pointer-events-none select-none object-cover"
          style={heroImageStyles}
          priority
        />
      )}

      <div className="flex flex-col pt-100 z-20 mt-10 leading-tight tracking-[0.1rem] relative pl-80 pr-80">
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
              className="flex flex-col"
            >
              {/* Blank top space */}
              <span className="ml-47 text-[70px] font-semibold uppercase text-[#73809A] muted-text-shadow-hero h-[70px] flex items-center"></span>

              <p className="ml-12 text-[70px] uppercase font-semibold flex items-center h-[70px]">
                <span className="white-text-shadow-hero">WE </span>
                <span className="text-gradient-hero flex items-center">
                  <TypewriterText text="&nbsp;ARE DOCKYARD" isComplete={isFinal} />
                </span>
              </p>

              {/* Blank bottom space */}
              <span className="ml-47 text-[70px] font-semibold uppercase text-[#73809A] muted-text-shadow-hero h-[70px] flex items-center"></span>
            </motion.div>
          ) : (
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
                className="ml-[172px] text-[70px] font-semibold uppercase text-[#73809A] muted-text-shadow-hero h-[70px] flex items-center"
              >
                {displayTopWord}
              </motion.span>

              {/* Middle row with "WE" and slot machine window */}
              <div className="ml-12 text-[70px] uppercase font-semibold flex items-center h-[70px]">
                <span className="white-text-shadow-hero">WE </span>

                {/* Slot Machine Window with mask-based fade */}
                <div
                  className="relative ml-2 overflow-hidden"
                  style={{
                    height: WORD_HEIGHT * 3,
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
                      style={{ paddingTop: WORD_HEIGHT }}
                      animate={{
                        y: [0, -WORD_HEIGHT * (spinWords.length - 1)],
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
                          className="white-text-shadow-hero h-[70px] flex items-center whitespace-nowrap"
                          style={{ height: WORD_HEIGHT }}
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
                      className="text-gradient-hero-animate h-[70px] flex items-center"
                      style={{
                        height: WORD_HEIGHT,
                        marginTop: WORD_HEIGHT,
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
                className="ml-[172px] text-[70px] font-semibold uppercase text-[#73809A] muted-text-shadow-hero h-[70px] flex items-center"
              >
                {displayBottomWord}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="ml-10 w-full flex flex-col space-y-6 min-w-110 max-w-110 justify-center items-center align-center mt-8">
          <span className="ml-10 tracking-widest text-center text-lg max-w-400 font-bold mt-4 text-brand-gradient">
            {subheadline}
          </span>
          {ctaButton && (
            <Button variant="glower" size="xl" className="w-50 uppercase mt-8">
              {ctaButton.text}
            </Button>
          )}
          {secondaryLink && (
            <Link
              href={secondaryLink.url || '#'}
              className="tracking-normal text-center text-lg max-w-400 hover:underline pt-2"
            >
              <span>{secondaryLink.text}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
