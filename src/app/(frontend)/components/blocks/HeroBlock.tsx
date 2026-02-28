'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'
import { Button } from '../ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import type { HeroBlock } from '@/payload-types'

const SLOT_WORDS = ['PROTOTYPE', 'DESIGN', 'BUILD', 'SHIP']
const SPIN_DURATION = 600
const SETTLE_TIME = 1000

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
    }, 80) // Typing speed

    return () => clearInterval(typeInterval)
  }, [isComplete, text])

  // Cursor blink effect
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
        className="inline-block w-[4px] h-[55px] bg-white ml-1 align-middle"
      />
    </>
  )
}

export default function HeroBlock({
  backgroundImage,
  backgroundImageOpacity,
  heroImage,
  heroImagePosition,
  headlines,
  subheadline,
  ctaButton,
  secondaryLink,
  animationType = 'static',
}: HeroBlock & {
  animationType?: 'static' | 'slotMachine'
  backgroundImageOpacity?: number
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

  const backgroundUrl = getImageUrl(backgroundImage)
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

  // Get hero image position, sizing, and rotation styles
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
  const [scrambleWords, setScrambleWords] = useState<[string, string, string]>(['', '', ''])

  // Get the three words to display based on current index (with wrap-around)
  const getDisplayWords = (index: number): [string, string, string] => {
    const prevIndex = index === 0 ? SLOT_WORDS.length - 1 : index - 1
    const nextIndex = index === SLOT_WORDS.length - 1 ? 0 : index + 1
    return [SLOT_WORDS[prevIndex], SLOT_WORDS[index], SLOT_WORDS[nextIndex]]
  }

  // Track if animation has completed
  const [hasCompleted, setHasCompleted] = useState(false)

  // Spin and cycle - only plays once
  useEffect(() => {
    if (animationType !== 'slotMachine') return
    if (isFinal) {
      setHasCompleted(true)
      return // Animation complete, stay on final message
    }
    if (hasCompleted) return // Prevent restart

    const runSequence = async () => {
      // Start spinning
      setIsSpinning(true)

      // Scramble for spin duration
      const scrambleInterval = setInterval(() => {
        setScrambleWords([
          SLOT_WORDS[Math.floor(Math.random() * SLOT_WORDS.length)],
          SLOT_WORDS[Math.floor(Math.random() * SLOT_WORDS.length)],
          SLOT_WORDS[Math.floor(Math.random() * SLOT_WORDS.length)],
        ])
      }, 50) // Faster scramble

      // Stop after spin duration
      await new Promise((resolve) => setTimeout(resolve, SPIN_DURATION))
      clearInterval(scrambleInterval)
      setIsSpinning(false)

      // Wait settled time then move to next
      const timer = setTimeout(() => {
        if (currentIndex < SLOT_WORDS.length - 1) {
          setCurrentIndex((prev) => prev + 1)
        } else {
          setIsFinal(true)
        }
      }, SETTLE_TIME)

      return () => clearTimeout(timer)
    }

    runSequence()
  }, [currentIndex, isFinal, animationType, hasCompleted])

  const [topWord, middleWord, bottomWord] = isSpinning
    ? scrambleWords
    : getDisplayWords(currentIndex)

  // Render slot machine animation
  if (animationType === 'slotMachine') {
    return (
      <div className="h-screen w-full relative overflow-hidden pt-80">
        <div className="absolute top-27 overflow-hidden w-full h-full">
          {backgroundUrl && (
            <Image
              src={backgroundUrl}
              alt="Hero Background"
              fill
              className="object-cover object-center pointer-events-none select-none"
              style={{ opacity: (backgroundImageOpacity ?? 100) / 100 }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          )}
        </div>
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

        <div className="flex flex-col pt-20 z-20 mt-10 leading-tight tracking-[0.1rem] relative pl-80 pr-80">
          <AnimatePresence mode="wait">
            {isFinal ? (
              <motion.div
                key="final"
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
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
              <motion.div key="slot-machine" className="flex flex-col">
                {/* Top word - ml-47 muted (blank space when no word) */}
                <motion.span
                  className="ml-47 text-[70px] font-semibold uppercase text-[#73809A] muted-text-shadow-hero h-[70px] flex items-center"
                  animate={{
                    filter: isSpinning ? 'blur(4px)' : 'blur(0px)',
                    scale: isSpinning ? 0.95 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                >
                  {topWord}
                </motion.span>

                {/* Middle word - ml-12 WE + gradient - NO BLUR ON WE */}
                <span className="ml-12 text-[70px] uppercase font-semibold flex items-center h-[70px]">
                  <span className="white-text-shadow-hero">WE </span>
                  <motion.span
                    className="text-gradient-hero ml-2"
                    animate={{
                      filter: isSpinning ? 'blur(4px)' : 'blur(0px)',
                      scale: isSpinning ? 0.95 : 1,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeOut',
                    }}
                  >
                    {middleWord}
                  </motion.span>
                </span>

                {/* Bottom word - ml-47 muted (blank space when no word) */}
                <motion.span
                  className="ml-47 text-[70px] font-semibold uppercase text-[#73809A] muted-text-shadow-hero h-[70px] flex items-center"
                  animate={{
                    filter: isSpinning ? 'blur(4px)' : 'blur(0px)',
                    scale: isSpinning ? 0.95 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                >
                  {bottomWord}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="ml-10 w-full flex flex-col space-y-6 min-w-110 max-w-110 justify-center items-center align-center mt-8">
            <span className="ml-10 tracking-normal text-center text-md max-w-400 font-bold mt-4 off-white-text-shadow-hero">
              {subheadline}
            </span>
            {ctaButton && (
              <Button variant="glower" size="lg-rounded" className="w-50 uppercase">
                {ctaButton.text}
              </Button>
            )}
            {secondaryLink && (
              <Link
                href={secondaryLink.url || '#'}
                className="tracking-normal text-center text-sm max-w-400 hover:underline pt-2"
              >
                <span>{secondaryLink.text}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Render static hero
  return (
    <div className="h-screen w-full relative overflow-hidden pt-80">
      <div className="absolute top-27 overflow-hidden w-full h-full">
        {backgroundUrl && (
          <Image
            src={backgroundUrl}
            alt="Hero Background"
            fill
            className="object-cover object-center pointer-events-none select-none"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        )}
      </div>
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

      <div className="flex flex-col pt-20 z-20 mt-10 leading-tight tracking-[0.1rem] relative pl-80 pr-80">
        {headlines?.map((line, index) => {
          const baseClasses = 'text-[70px] font-semibold uppercase'
          const marginClass = getMarginClass(line.marginLeft)
          const marginStyle = getMarginStyle(line.marginLeft)

          if (line.text?.includes('||')) {
            const parts = line.text.split('||')
            return (
              <span key={index} className={`${marginClass} ${baseClasses}`} style={marginStyle}>
                {parts.map((part, pIndex) => {
                  const trimmedPart = part.trim()
                  const colonIndex = trimmedPart.indexOf(':')
                  if (colonIndex === -1) {
                    return (
                      <span key={pIndex}>
                        {trimmedPart}
                        {pIndex < parts.length - 1 && ' '}
                      </span>
                    )
                  }
                  const style = trimmedPart.slice(0, colonIndex).trim()
                  const text = trimmedPart.slice(colonIndex + 1).trim()
                  const isLast = pIndex === parts.length - 1
                  if (style === 'white') {
                    return (
                      <span key={pIndex} className="white-text-shadow-hero">
                        {text}
                        {!isLast && ' '}
                      </span>
                    )
                  } else if (style === 'gradient') {
                    return (
                      <span key={pIndex} className="text-gradient-hero">
                        {text}
                        {!isLast && ' '}
                      </span>
                    )
                  } else if (style === 'muted') {
                    return (
                      <span key={pIndex} className="text-[#73809A] muted-text-shadow-hero">
                        {text}
                        {!isLast && ' '}
                      </span>
                    )
                  }
                  return (
                    <span key={pIndex}>
                      {text}
                      {!isLast && ' '}
                    </span>
                  )
                })}
              </span>
            )
          }

          if (line.style === 'custom' && line.text?.includes(':')) {
            const parts = line.text.split('||')
            return (
              <span key={index} className={`${marginClass} ${baseClasses}`} style={marginStyle}>
                {parts.map((part, pIndex) => {
                  const trimmedPart = part.trim()
                  const colonIndex = trimmedPart.indexOf(':')
                  if (colonIndex === -1) {
                    return (
                      <span key={pIndex}>
                        {trimmedPart}
                        {pIndex < parts.length - 1 && ' '}
                      </span>
                    )
                  }
                  const style = trimmedPart.slice(0, colonIndex).trim()
                  const text = trimmedPart.slice(colonIndex + 1).trim()
                  const isLast = pIndex === parts.length - 1
                  if (style === 'white') {
                    return (
                      <span key={pIndex} className="white-text-shadow-hero">
                        {text}
                        {!isLast && ' '}
                      </span>
                    )
                  } else if (style === 'gradient') {
                    return (
                      <span key={pIndex} className="text-gradient-hero">
                        {text}
                        {!isLast && ' '}
                      </span>
                    )
                  } else if (style === 'muted') {
                    return (
                      <span key={pIndex} className="text-[#73809A] muted-text-shadow-hero">
                        {text}
                        {!isLast && ' '}
                      </span>
                    )
                  }
                  return (
                    <span key={pIndex}>
                      {text}
                      {!isLast && ' '}
                    </span>
                  )
                })}
              </span>
            )
          }

          const styleClasses: Record<string, string> = {
            white: 'white-text-shadow-hero',
            muted: 'text-[#73809A] muted-text-shadow-hero',
            gradient: 'text-gradient-hero',
            custom: '',
          }

          return (
            <span
              key={index}
              className={`${marginClass} ${baseClasses} ${styleClasses[line.style || 'white']}`}
              style={marginStyle}
            >
              {line.text}
            </span>
          )
        })}
        <div className="ml-10 w-full flex flex-col space-y-6 min-w-110 max-w-110 justify-center items-center align-center">
          <span className="ml-10 tracking-normal text-center text-md max-w-400 font-bold mt-4 off-white-text-shadow-hero">
            {subheadline}
          </span>
          {ctaButton && (
            <Button variant="glower" size="lg-rounded" className="w-50 uppercase">
              {ctaButton.text}
            </Button>
          )}
          {secondaryLink && (
            <Link
              href={secondaryLink.url || '#'}
              className="tracking-normal text-center text-sm max-w-400 hover:underline pt-2"
            >
              <span>{secondaryLink.text}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
