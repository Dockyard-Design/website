'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '../ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectCard } from './ProjectCard'

const projects = [
  {
    imageSrc: '/images/anchor.png',
    label: 'Example Website',
    title: 'Dockyard Dashboard',
    link: '#',
  },
  {
    imageSrc: '/images/anchor.png',
    label: 'Example Website',
    title: 'Dockyard Construction',
    link: '#',
  },
  {
    imageSrc: '/images/anchor.png',
    label: 'Example Website',
    title: 'Higgs Portfolio',
    link: '#',
  },
]

export default function Projects() {
  const [activeIndex, setActiveIndex] = React.useState(1)
  const [direction, setDirection] = React.useState(0) // -1 for left, 1 for right
  const [isAnimating, setIsAnimating] = React.useState(false)
  const cardWidth = 340

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1)
      if (e.key === 'ArrowRight') paginate(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  const paginate = (newDirection: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(newDirection)
    setActiveIndex((prev) => {
      let next = prev + newDirection
      if (next < 0) next = projects.length - 1
      if (next >= projects.length) next = 0
      return next
    })
  }

  const prevIndex = (activeIndex - 1 + projects.length) % projects.length
  const nextIndex = (activeIndex + 1) % projects.length

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-start content-center ">
      {/* Heading and subheading */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-center white-text-shadow-hero">
          SIT BACK &{' '}
          <span className="text-[#00CDF4]">
            R<span className="text-[26px]">E</span>
            <span className="text-[22px]">L</span>
            <span className="text-[18px]">A</span>
            <span className="text-[14px]">X ...</span>
          </span>{' '}
          WE KNOW WHAT WE'RE DOING
        </h2>
        <p className="mt-4 text-lg font-semibold text-center white-text-shadow-hero max-w-2xl">
          Take a peek at our past work and get inspired for your own web project
        </p>
      </div>

      {/* Carousel with side nav buttons */}
      <div
        className="relative w-full flex justify-center items-center select-none"
        style={{ height: 440 }}
        aria-roledescription="carousel"
      >
        <div className="absolute left-20">
          <Button
            variant="customOutline"
            size="icon"
            onClick={() => paginate(-1)}
            aria-label="Previous slide"
            className="rounded-full w-12 h-12"
          >
            &lt;
          </Button>
        </div>
        <div className="absolute right-20">
          <Button
            variant="customOutline"
            size="icon"
            onClick={() => paginate(1)}
            aria-label="Next slide"
            className="rounded-full w-12 h-12"
          >
            &gt;
          </Button>
        </div>
        {/* Animated cards */}
        {[0, 1, 2].map((offset) => {
          const idx = (activeIndex - 1 + offset + projects.length) % projects.length
          let slot: 'prev' | 'center' | 'next'
          if (offset === 0) slot = 'prev'
          else if (offset === 1) slot = 'center'
          else slot = 'next'
          const x = slot === 'prev' ? -cardWidth * 0.7 : slot === 'next' ? cardWidth * 0.7 : 0
          const y = slot === 'center' ? 0 : 0
          const scale = slot === 'center' ? 0.8 : 0.75
          const z = slot === 'center' ? 20 : 10
          const opacity = slot === 'center' ? 1 : 0.8
          return (
            <motion.div
              key={idx}
              className={`absolute w-85 top-0 left-1/2 ${slot === 'center' ? 'z-20' : 'z-10'}`}
              style={{ marginLeft: '-170px', pointerEvents: slot === 'center' ? 'auto' : 'none' }}
              animate={{ x, y, scale, opacity, zIndex: z }}
              transition={{ type: 'spring', stiffness: 320, damping: 42, mass: 1 }}
              onAnimationComplete={() => slot === 'center' && setIsAnimating(false)}
              tabIndex={slot === 'center' ? 0 : -1}
              aria-label={projects[idx].title}
              aria-hidden={slot !== 'center'}
            >
              <ProjectCard {...projects[idx]} active={slot === 'center'} />
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-center gap-10">
        <Button variant="customOutline" size="lg-rounded" className="w-50">
          SEE MORE &rarr;
        </Button>
        <Button variant="glower" size="lg-rounded" className="w-50">
          GET IN TOUCH
        </Button>
      </div>

      <div className="bg-steps-gradient w-full mt-32 py-16 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-center white-text-shadow-hero">
          <span className="text-[#00CDF4]">FOUR</span> SIMPLE STEPS TO YOUR{' '}
          <span className="text-[#E45DFF]">GREAT</span> WEBSITE
        </h1>

        <div className="mt-12 grid grid-cols-1 grid-rows-2 gap-y-8 gap-x-6 md:grid-cols-4 md:grid-rows-2 md:gap-x-12 md:gap-y-8 w-full max-w-6xl mx-auto">
          {/* Top row: images with animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.4 }}
            className="flex items-center justify-center"
          >
            <Image
              src="/images/icons/Brief.png"
              alt="Brief icon"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            viewport={{ once: true, amount: 0.4 }}
            className="flex items-center justify-center"
          >
            <Image
              src="/images/icons/Prototyping.png"
              alt="Prototype icon"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: true, amount: 0.4 }}
            className="flex items-center justify-center"
          >
            <Image
              src="/images/icons/Build.png"
              alt="Build icon"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 }}
            viewport={{ once: true, amount: 0.4 }}
            className="flex items-center justify-center"
          >
            <Image
              src="/images/icons/Feedback.png"
              alt="Feedback icon"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
          </motion.div>
          {/* Bottom row: text with animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center max-w-3/4 w-full mx-auto"
          >
            <h2 className="text-2xl font-extrabold  mb-2 tracking-wide white-text-shadow-no-bg bg-[#35A1FF]">
              BRIEF
            </h2>
            <p className="text-md off-white-text-shadow-steps font-semibold leading-snug">
              We'll discuss your needs with you
              <br />
              and layout a plan
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center max-w-3/4 w-full mx-auto"
          >
            <h2 className="text-2xl font-extrabold bf-[#FFBD3A] mb-2 tracking-wide white-text-shadow-no-bg bg-[#FFBD3A]">
              PROTOTYPE
            </h2>
            <p className="text-md off-white-text-shadow-steps font-semibold leading-snug">
              Your website will start with an initial
              <br />
              wireframe and design
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center max-w-3/4 w-full mx-auto"
          >
            <h2 className="text-2xl font-extrabold white-text-shadow-no-bg bg-[#87E416] mb-2 tracking-wide">
              BUILD
            </h2>
            <p className="text-md off-white-text-shadow-steps font-semibold leading-snug">
              If you're happy, we will build the
              <br />
              final product
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center max-w-3/4 w-full mx-auto"
          >
            <h2 className="text-2xl font-extrabold white-text-shadow-no-bg bg-[#EC1ACC] mb-2 tracking-wide">
              FEEDBACK
            </h2>
            <p className="text-md off-white-text-shadow-steps font-semibold leading-snug">
              You can provide feedback at any time to
              <br />
              influence our work
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
