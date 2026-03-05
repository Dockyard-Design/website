'use client'

import * as React from 'react'
import { Button } from '../ui/Button'
import { motion } from 'framer-motion'
import { ProjectCard } from '../homepage/ProjectCard'
import type { ProjectsCarouselBlock as ProjectsCarouselBlockType } from '@/payload-types'
import type { Project } from '@/payload-types'
import { getProjectsServerAction } from '@/app/(frontend)/server/actions/projects'

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
  // NOTE: For smooth scroll from navbar on homepage, use "#projects" instead of "/projects"
  // The section ID is "projects" (set in RenderBlocks.tsx blockTypeToId mapping)
  showContactButton = true,
  contactButtonText = 'GET IN TOUCH',
  contactButtonLink = '/contact',
}: ProjectsCarouselBlockProps) {
  const [projects, setProjects] = React.useState<
    ReturnType<typeof getProjectsServerAction> extends Promise<infer T> ? T : never
  >([])
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const cardWidth = 420

  React.useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjectsServerAction()
      setProjects(data)
      setIsLoading(false)
    }

    fetchProjects()
  }, [])

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1)
      if (e.key === 'ArrowRight') paginate(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, isAnimating, projects.length])

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

  const overlap = 60 // 60px overlap = ~14% of 420px

  if (isLoading || projects.length === 0) {
    return (
      <section className="w-full h-screen flex flex-col items-center justify-center">
        <div className="text-white text-xl">Loading projects...</div>
      </section>
    )
  }

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center">
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
        {/* Navigation buttons only show when there are multiple projects */}
        {projects.length > 1 && (
          <>
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
          </>
        )}

        {/* Render up to 3 cards based on available projects */}
        {projects.length === 1 ? (
          // Single project - only show center card
          <motion.div
            key={projects[0].id}
            className="absolute w-[420px] top-0 left-1/2 z-20"
            style={{ marginLeft: '-210px', pointerEvents: 'auto' }}
            animate={{ x: 0, y: 0, scale: 1, opacity: 1, zIndex: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 42, mass: 1 }}
          >
            <ProjectCard
              imageSrc={projects[0].heroImage || '/images/anchor.png'}
              label="Website"
              title={projects[0].title}
              link={`/projects/${projects[0].slug}`}
              active={true}
              priority={true}
            />
          </motion.div>
        ) : projects.length === 2 ? (
          // Two projects - show prev and center
          <>
            <motion.div
              key={projects[activeIndex].id}
              className="absolute w-[420px] top-0 left-1/2 z-20"
              style={{ marginLeft: '-210px', pointerEvents: 'auto' }}
              animate={{ x: 0, y: 0, scale: 1, opacity: 1, zIndex: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 42, mass: 1 }}
            >
              <ProjectCard
                imageSrc={projects[activeIndex].heroImage || '/images/anchor.png'}
                label="Website"
                title={projects[activeIndex].title}
                link={`/projects/${projects[activeIndex].slug}`}
                active={true}
                priority={true}
              />
            </motion.div>
            <motion.div
              key={projects[(activeIndex - 1 + projects.length) % projects.length].id}
              className="absolute w-[420px] top-0 left-1/2 z-10"
              style={{ marginLeft: '-210px', pointerEvents: 'none' }}
              animate={{ x: -cardWidth + overlap, y: 0, scale: 0.9, opacity: 0.9, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 320, damping: 42, mass: 1 }}
            >
              <ProjectCard
                imageSrc={
                  projects[(activeIndex - 1 + projects.length) % projects.length].heroImage ||
                  '/images/anchor.png'
                }
                label="Website"
                title={projects[(activeIndex - 1 + projects.length) % projects.length].title}
                link={`/projects/${projects[(activeIndex - 1 + projects.length) % projects.length].slug}`}
                active={false}
                priority={false}
              />
            </motion.div>
          </>
        ) : (
          // Three or more projects - show prev, center, next
          [0, 1, 2].map((offset) => {
            const idx = (activeIndex - 1 + offset + projects.length) % projects.length
            let slot: 'prev' | 'center' | 'next'
            if (offset === 0) slot = 'prev'
            else if (offset === 1) slot = 'center'
            else slot = 'next'
            const x =
              slot === 'prev' ? -cardWidth + overlap : slot === 'next' ? cardWidth - overlap : 0
            const y = slot === 'center' ? 0 : 0
            const scale = slot === 'center' ? 1 : 0.9
            const z = slot === 'center' ? 20 : 10
            const opacity = slot === 'center' ? 1 : 0.9
            return (
              <motion.div
                key={projects[idx].id}
                className={`absolute w-[420px] top-0 left-1/2 ${slot === 'center' ? 'z-20' : 'z-10'}`}
                style={{ marginLeft: '-210px', pointerEvents: slot === 'center' ? 'auto' : 'none' }}
                animate={{ x, y, scale, opacity, zIndex: z }}
                transition={{ type: 'spring', stiffness: 320, damping: 42, mass: 1 }}
                onAnimationComplete={() => slot === 'center' && setIsAnimating(false)}
                tabIndex={slot === 'center' ? 0 : -1}
                aria-label={projects[idx].title}
                aria-hidden={slot !== 'center'}
              >
                <ProjectCard
                  imageSrc={projects[idx].heroImage || '/images/anchor.png'}
                  label="Website"
                  title={projects[idx].title}
                  link={`/projects/${projects[idx].slug}`}
                  active={slot === 'center'}
                  priority={slot === 'center'}
                />
              </motion.div>
            )
          })
        )}
      </div>

      <div className="flex justify-center gap-10 mt-8 z-20">
        {showSeeMoreButton !== false && (
          <Button variant="customOutline" size="xl" className="w-50" asChild>
            <a href={seeMoreButtonLink || '#'}>{seeMoreButtonText || 'SEE MORE'} &rarr;</a>
          </Button>
        )}
        {showContactButton !== false && (
          <Button variant="glower" size="xl" className="w-50" asChild>
            <a href={contactButtonLink || '/contact'}>{contactButtonText || 'GET IN TOUCH'}</a>
          </Button>
        )}
      </div>
    </section>
  )
}
