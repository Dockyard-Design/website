'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

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

export default function About() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background effect (optional, can be removed if not needed) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/images/anchor.png"
          alt="Dockyard background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 tracking-tight white-text-shadow-hero ">
          WE ARE <span className="text-gradient-hero">DOCKYARD</span>
        </h1>
        <div className="text-lg md:text-xl font-semibold text-center white-text-shadow-no-bg bg-[#018FCC] mb-6">
          Two specialists - One seamless vision
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full mb-6">
          {/* Left Card */}
          {/* Finlay Card (Animated) */}
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 0.9 }}
            className="relative flex flex-col items-center w-48"
            style={{ width: '240px', height: '320px' }}
          >
            <div className="rounded-2xl overflow-hidden -rotate-10 w-45 h-60">
              <Image
                src="/images/finlay.png"
                alt="Finlay Rohrbasser"
                width={180}
                height={240}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute bottom-6 left-6 flex flex-col items-start w-full">
              <motion.span
                className="text-xs font-bold tracking-widest text-white -rotate-10 pl-10"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typewriter text="DESIGNER" speed={50} />
              </motion.span>
              <motion.span
                className="text-xs font-bold tracking-widest text-gradient-hero -rotate-10 pl-11"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Typewriter text="FINLAY ROHRBASSER" speed={50} />
              </motion.span>
            </div>
          </motion.div>
          {/* Center Text */}
          <div className="flex-1 flex flex-col items-center justify-center min-w-md px-2">
            <p className="text-base md:text-lg off-white-text-shadow-hero text-center font-medium mb-2">
              We are a collaborative duo of freelance experts in design and development. By pairing
              our individual strengths in UI/UX, Graphic Design, Animation, and Web Development,
              we've created a streamlined workflow that puts your project first. When you work with
              us, you aren't just another ticket in a system— you're partnering directly with the
              two specialists responsible for your brand's digital success.
            </p>
          </div>
          {/* Right Card */}
          {/* Frederico Card (Animated) */}
          <motion.div
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, duration: 0.9, delay: 0.15 }}
            className="relative flex flex-col items-center w-48"
            style={{ width: '240px', height: '320px' }}
          >
            <div className="rounded-2xl overflow-hidden -rotate-[-10deg] w-45 h-60 mb-5">
              <Image
                src="/images/frederico.png"
                alt="Frederico Garcia"
                width={180}
                height={240}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute bottom-6 left-6 flex flex-col items-start w-full">
              <motion.span
                className="text-xs font-bold tracking-widest text-white -rotate-[-10deg] pb-2 pl-18 "
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typewriter text="DEVELOPER" speed={50} />
              </motion.span>
              <motion.span
                className="text-xs font-bold tracking-widest text-gradient-hero -rotate-[-10deg] pl-4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Typewriter text="FREDERICO GARCIA" speed={50} />
              </motion.span>
            </div>
          </motion.div>
        </div>
        <div className="relative flex flex-col items-center mt-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 off-white-text-shadow-hero">
            ARE YOU READY FOR YOUR <span className="text-gradient-hero">GREAT</span> WEBSITE?
          </h2>
          <Link
            href="mailto:hello@dockyard.design"
            className="text-gradient-hero text-lg md:text-xl font-semibold underline underline-offset-4 mb-6 hover:text-[#E45DFF] transition-colors"
          >
            hello@dockyard.design
          </Link>
          <Button variant="glower" size="lg-rounded" className="w-50 uppercase">
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  )
}
