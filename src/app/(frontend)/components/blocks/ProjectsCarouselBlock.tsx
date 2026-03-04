'use client'

import * as React from 'react'
import Image from 'next/image'
import { Button } from '../ui/Button'
import { motion } from 'framer-motion'
import { ProjectCard } from '../homepage/ProjectCard'
import type { ProjectsCarouselBlock as ProjectsCarouselBlockType } from '@/payload-types'

// Hardcoded projects data from Projects.tsx
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

interface ProjectsCarouselBlockProps {
  title?: ProjectsCarouselBlockType['title']
  titleHtml?: string
  subtitle?: string
  showSeeMoreButton?: boolean
  seeMoreButtonText?: string
  seeMoreButtonLink?: string
  showContactButton?: boolean
  contactButtonText?: string
  contactButtonLink?: string
}

export default function ProjectsCarouselBlock({
  title,
  titleHtml,
  subtitle,
  showSeeMoreButton = true,
  seeMoreButtonText = 'SEE MORE →',
  seeMoreButtonLink = '/projects',
  showContactButton = true,
  contactButtonText = 'GET IN TOUCH',
  contactButtonLink = '/contact',
}: ProjectsCarouselBlockProps) {
  const [activeIndex, setActiveIndex] = React.useState(1)
  const [direction, setDirection] = React.useState(0)
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

  return (
    <section className="w-full h-screen pt-10 pb-16 flex flex-col items-center justify-center">
      {/* Heading and subheading */}
      <div className="flex flex-col items-center mb-8 z-20">
        {titleHtml ? (
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight text-center white-text-shadow-hero"
            dangerouslySetInnerHTML={{ __html: titleHtml }}
          />
        ) : (
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center white-text-shadow-hero">
            SIT BACK &amp;{' '}
            <span className="text-[#00CDF4]">
              R<span className="text-[26px] md:text-[40px]">E</span>
              <span className="text-[22px] md:text-[34px]">L</span>
              <span className="text-[18px] md:text-[28px]">A</span>
              <span className="text-[14px] md:text-[22px]">X ...</span>
            </span>{' '}
            WE KNOW WHAT WE&apos;RE DOING
          </h2>
        )}
        <p className="mt-4 text-lg md:text-2xl font-semibold text-center white-text-shadow-hero max-w-2xl px-4">
          {subtitle || 'Take a peek at our past work and get inspired for your own web project'}
        </p>
      </div>

      {/* Carousel with side nav buttons */}
      <div
        className="relative w-full flex justify-center items-center select-none z-10 mt-20"
        style={{ height: '65vh' }}
        aria-roledescription="carousel"
      >
        <div className="absolute left-4 md:left-12">
          <Button
            variant="customOutline"
            size="icon"
            onClick={() => paginate(-1)}
            aria-label="Previous slide"
            className="rounded-full w-12 h-12 md:w-16 md:h-16"
          >
            &lt;
          </Button>
        </div>
        <div className="absolute right-4 md:right-12">
          <Button
            variant="customOutline"
            size="icon"
            onClick={() => paginate(1)}
            aria-label="Next slide"
            className="rounded-full w-12 h-12 md:w-16 md:h-16"
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
          const cardWidth = 420
          const overlap = 60 // 60px overlap = ~14% of 420px
          const x = slot === 'prev' ? -cardWidth + overlap : slot === 'next' ? cardWidth - overlap : 0
          const y = slot === 'center' ? 0 : 0
          const scale = slot === 'center' ? 1 : 0.9
          const z = slot === 'center' ? 20 : 10
          const opacity = slot === 'center' ? 1 : 0.9
          return (
            <motion.div
              key={idx}
              className={`absolute w-[420px] top-0 left-1/2 ${slot === 'center' ? 'z-20' : 'z-10'}`}
              style={{ marginLeft: '-210px', pointerEvents: slot === 'center' ? 'auto' : 'none' }}
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

      <div className="flex justify-center gap-10 mt-8 z-20">
        {showSeeMoreButton !== false && (
          <Button variant="customOutline" size="lg-rounded" className="w-50" asChild>
            <a href={seeMoreButtonLink || '#'}>{seeMoreButtonText || 'SEE MORE'} &rarr;</a>
          </Button>
        )}
        {showContactButton !== false && (
          <Button variant="glower" size="lg-rounded" className="w-50" asChild>
            <a href={contactButtonLink || '/contact'}>{contactButtonText || 'GET IN TOUCH'}</a>
          </Button>
        )}
      </div>
    </section>
  )
}
