'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import type { FullscreenProjectsBlock } from '@/payload-types'
import type { Project } from '@/payload-types'
import { getProjectsServerAction } from '@/app/(frontend)/server/actions/projects'

export default function FullscreenProjectsBlock({
  autoPlayInterval,
  seeMoreButtonText,
  seeMoreButtonLink,
  contactButtonText,
  contactButtonLink,
  showButtons = true,
  autoPlay = true,
  showDots = true,
}: {
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showTitle?: boolean
  showButtons?: boolean
  showSeeMoreButton?: boolean
  seeMoreButtonText?: string
  seeMoreButtonLink?: string
  showContactButton?: boolean
  contactButtonText?: string
  contactButtonLink?: string
}) {
  const [projects, setProjects] = React.useState<Project[]>([])
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [touchStart, setTouchStart] = React.useState<number | null>(null)

  React.useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjectsServerAction()
      setProjects(data)
      setIsLoading(false)
    }
    fetchProjects()
  }, [])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1)
      if (e.key === 'ArrowRight') paginate(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, isAnimating, projects.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return

    const touchEnd = e.changedTouches[0].clientX
    const deltaX = touchStart - touchEnd
    const threshold = 50

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        paginate(1)
      } else {
        paginate(-1)
      }
    }

    setTouchStart(null)
  }

  React.useEffect(() => {
    if (!autoPlay || projects.length <= 1 || isAnimating) return

    const interval = setInterval(() => {
      paginate(1)
    }, autoPlayInterval || 5000)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, isAnimating, projects.length])

  const paginate = (newDirection: number) => {
    if (isAnimating || projects.length === 0) return
    setIsAnimating(true)

    setActiveIndex((prev) => {
      let next = prev + newDirection
      if (next < 0) next = projects.length - 1
      if (next >= projects.length) next = 0
      return next
    })

    setTimeout(() => setIsAnimating(false), 600)
  }

  const getImageUrl = (image: any): string => {
    if (typeof image === 'string') return image
    if (typeof image === 'number') return ''
    if (image?.url) return image.url
    if (image?.sizes?.['hero']?.url) return image.sizes['hero'].url
    return ''
  }

  if (isLoading || projects.length === 0) {
    return (
      <section className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="text-white text-xl">Loading projects...</div>
      </section>
    )
  }

  const currentProject = projects[activeIndex]

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image - full screen */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            className="absolute w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full h-full mask-x-from-90% mask-x-to-transparent mask-y-from-90% mask-y-to-transparent">
              <Image
                src={getImageUrl(currentProject.hero?.image)}
                alt={currentProject.title}
                fill
                className="object-cover "
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Heading and subheading */}
      <div className="flex flex-col items-center absolute inset-0 z-10 p-10">
        <h2 className="text-3xl font-bold tracking-tight text-center black-text-shadow-hero">
          SIT BACK &{' '}
          <span className="text-[#00CDF4]">
            R<span className="text-[26px]">E</span>
            <span className="text-[22px]">L</span>
            <span className="text-[18px]">A</span>
            <span className="text-[14px]">X ...</span>
          </span>{' '}
          WE KNOW WHAT WE'RE DOING
        </h2>
        <p className="mt-4 text-lg font-semibold text-center black-text-shadow-hero max-w-2xl">
          Take a peek at our past work and get inspired for your own web project
        </p>
      </div>

      {/* Content Overlay - centered with flex */}
      <div className="absolute right-4 md:right-20 top-[10%] flex flex-col items-center justify-center z-50">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-full h-[600px] bg-white/30 backdrop-blur-md border border-white/40 rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-6"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gradient-hero tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {currentProject.hero?.title || currentProject.title}
          </motion.h2>

          <motion.p
            className="text-base text-gray-300 leading-relaxed line-clamp-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {currentProject.hero?.description || currentProject.summary || ''}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button variant="customOutline" size="lg-rounded" asChild>
              <Link href={`/projects/${currentProject.slug}`}>VIEW PROJECT</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Buttons below the box - using flex */}
        {showButtons && (
          <motion.div
            key={`buttons-${activeIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center gap-6 mt-8"
          >
            <Button
              variant="customOutline"
              size="xl"
              className="text-sm py-4 whitespace-nowrap shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
              asChild
            >
              <Link href={seeMoreButtonLink || '/projects'}>
                {seeMoreButtonText || 'VIEW ALL PROJECTS'}
              </Link>
            </Button>
            <Button variant="glower" size="xl" className="whitespace-nowrap" asChild>
              <Link href={contactButtonLink || '/contact'}>
                {contactButtonText || 'GET IN TOUCH'}
              </Link>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Navigation Arrows and Dots */}
      {showButtons && projects.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          <button
            onClick={() => paginate(-1)}
            disabled={isAnimating}
            className="w-8 h-8 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous project"
          >
            <ArrowLeft className="w-8 h-8 text-white hover:text-[#00CDF4]" />
          </button>

          {showDots && (
            <div className="flex items-center gap-2">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => {
                    if (index !== activeIndex && !isAnimating) {
                      setActiveIndex(index)
                    }
                  }}
                  disabled={isAnimating}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-[#00CDF4] shadow-[0_0_10px_#00EAFF]'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => paginate(1)}
            disabled={isAnimating}
            className="w-8 h-8 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next project"
          >
            <ArrowRight className="w-8 h-8 text-white hover:text-[#00CDF4]" />
          </button>
        </div>
      )}
    </section>
  )
}
