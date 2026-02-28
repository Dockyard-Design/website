'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import type { AboutBlock } from '@/payload-types'

interface TypewriterProps {
  text: string
  speed?: number
  className?: string
}

function Typewriter({ text, speed = 40, className }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')
  const iRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const spanRef = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(spanRef, { once: true, margin: '-10% 0px' })
  useEffect(() => {
    if (!inView) return
    setDisplayed('')
    iRef.current = 0
    function type() {
      if (iRef.current < text.length) {
        setDisplayed(text.slice(0, iRef.current + 1))
        iRef.current++
        timeoutRef.current = setTimeout(type, speed)
      }
    }
    type()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [text, speed, inView])
  return (
    <span ref={spanRef} className={className}>
      {displayed}
    </span>
  )
}

export default function AboutBlock({
  sectionTitle,
  subtitle,
  description,
  teamMembers,
  ctaSection,
  backgroundImage,
}: AboutBlock) {
  // Helper to get image URL
  const getImageUrl = (image: any) => {
    if (typeof image === 'string') return image
    return image?.url || ''
  }

  // Extract text from Lexical
  const extractText = (richText: any) => {
    if (!richText || !richText.root) return ''
    let text = ''
    const extract = (node: any) => {
      if (node.children) {
        node.children.forEach((child: any) => {
          if (child.text) text += child.text
          extract(child)
        })
      }
    }
    extract(richText.root)
    return text
  }

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background effect (optional, can be removed if not needed) */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={getImageUrl(backgroundImage)}
            alt="Dockyard background"
            fill
            className="object-cover opacity-20"
            loading="lazy"
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 tracking-tight white-text-shadow-hero">
          {extractText(sectionTitle)}
        </h1>
        <div className="text-lg md:text-xl font-semibold text-center white-text-shadow-no-bg bg-[#018FCC] mb-6">
          {subtitle}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full mb-6">
          {/* Left Card - Finlay */}
          {teamMembers && teamMembers[0] && (
            <motion.div
              key={0}
              initial={{ opacity: 0, x: -120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 18,
                duration: 0.9,
              }}
              className="relative flex flex-col items-center"
              style={{ width: '240px', height: '320px' }}
            >
              <div
                className="rounded-2xl overflow-hidden w-45 h-60"
                style={{ transform: `rotate(${teamMembers[0].rotation}deg)` }}
              >
                {teamMembers[0].photo && (
                  <Image
                    src={getImageUrl(teamMembers[0].photo)}
                    alt={teamMembers[0].name}
                    width={180}
                    height={240}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="absolute bottom-6 left-6 flex flex-col items-start w-full">
                <motion.span
                  className={`text-xs font-bold tracking-widest text-white pl-10 ${teamMembers[0].rotation === '-10' ? '-rotate-10' : 'rotate-10'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: teamMembers[0].animationDelay || 0 }}
                >
                  <Typewriter text={teamMembers[0].role.toUpperCase()} speed={50} />
                </motion.span>
                <motion.span
                  className={`text-xs font-bold tracking-widest text-gradient-hero pl-11 ${teamMembers[0].rotation === '-10' ? '-rotate-10' : 'rotate-10'}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: (teamMembers[0].animationDelay || 0) + 0.2 }}
                >
                  <Typewriter text={teamMembers[0].name.toUpperCase()} speed={50} />
                </motion.span>
              </div>
            </motion.div>
          )}

          {/* Center Text */}
          <div className="flex-1 flex flex-col items-center justify-center min-w-md px-2">
            <p className="text-base md:text-lg off-white-text-shadow-hero text-center font-medium mb-2">
              {description}
            </p>
          </div>

          {/* Right Card - Frederico */}
          {teamMembers && teamMembers[1] && (
            <motion.div
              key={1}
              initial={{ opacity: 0, x: 120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 18,
                duration: 0.9,
                delay: 0.15,
              }}
              className="relative flex flex-col items-center"
              style={{ width: '240px', height: '320px' }}
            >
              <div
                className="rounded-2xl overflow-hidden w-45 h-60 mb-5"
                style={{ transform: `rotate(${teamMembers[1].rotation}deg)` }}
              >
                {teamMembers[1].photo && (
                  <Image
                    src={getImageUrl(teamMembers[1].photo)}
                    alt={teamMembers[1].name}
                    width={180}
                    height={240}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="absolute bottom-6 left-6 flex flex-col items-start w-full">
                <motion.span
                  className={`text-xs font-bold tracking-widest text-white pb-2 pl-18 ${teamMembers[1].rotation === '-10' ? '-rotate-10' : 'rotate-10'}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: teamMembers[1].animationDelay || 0 }}
                >
                  <Typewriter text={teamMembers[1].role.toUpperCase()} speed={50} />
                </motion.span>
                <motion.span
                  className={`text-xs font-bold tracking-widest text-gradient-hero pl-4 ${teamMembers[1].rotation === '-10' ? '-rotate-10' : 'rotate-10'}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: (teamMembers[1].animationDelay || 0) + 0.2 }}
                >
                  <Typewriter text={teamMembers[1].name.toUpperCase()} speed={50} />
                </motion.span>
              </div>
            </motion.div>
          )}
        </div>

        {ctaSection && (
          <div className="relative flex flex-col items-center mt-10">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 off-white-text-shadow-hero">
              {extractText(ctaSection.headline)}
            </h2>
            <Link
              href={`mailto:${ctaSection.email}`}
              className="text-gradient-hero text-lg md:text-xl font-semibold underline underline-offset-4 mb-6 hover:text-[#E45DFF] transition-colors"
            >
              {ctaSection.email}
            </Link>
            <Button variant="glower" size="lg-rounded" className="w-50 uppercase">
              {ctaSection.buttonText}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
