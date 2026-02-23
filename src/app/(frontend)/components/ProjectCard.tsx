'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'

interface ProjectCardProps {
  image: string
  title: string
  subtitle: string
  description: string
  index: number
  slug?: string
}

export default function ProjectCard({
  image,
  title,
  subtitle,
  description,
  index,
  slug,
}: ProjectCardProps) {
  const isReversed = index % 2 !== 0
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const cardContent = (
    <>
      {/* Image Side */}
      <div
        className={cn('w-full lg:w-[55%] relative', isReversed ? 'lg:order-2' : 'lg:order-1')}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? 'translateX(0)'
            : isReversed
              ? 'translateX(40px)'
              : 'translateX(-40px)',
          transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
        }}
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          {/* Dark overlay that appears on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
        </div>
      </div>

      {/* Text Side */}
      <div
        className={cn(
          'w-full lg:w-[45%] flex flex-col justify-center',
          isReversed ? 'lg:order-1 lg:pr-8 lg:text-right' : 'lg:order-2 lg:pl-8',
        )}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? 'translateX(0)'
            : isReversed
              ? 'translateX(-40px)'
              : 'translateX(40px)',
          transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15 + 0.1}s`,
        }}
      >
        <div className="space-y-4">
          {/* Label - Hero Title */}
          <p
            className="text-xs font-medium tracking-[0.2em] text-gray-500 uppercase"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15 + 0.2}s`,
            }}
          >
            {subtitle}
          </p>

          {/* Title - Project Title with gradient hover */}
          <div
            className="relative inline-block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15 + 0.3}s`,
            }}
          >
            <h3 className="text-2xl lg:text-3xl font-semibold text-white group-hover:opacity-0 transition-opacity duration-300">
              {title}
            </h3>

            <h3
              className="absolute inset-0 text-2xl lg:text-3xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'var(--color-gradient-hero)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {title}
            </h3>
          </div>

          {/* Description - Hero Description */}
          <p
            className="text-gray-400 leading-relaxed text-base"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15 + 0.4}s`,
            }}
          >
            {description}
          </p>

          {/* Read more link */}
          <div
            className={cn(
              'pt-4 flex items-center gap-2 text-sm font-medium',
              isReversed ? 'lg:justify-end' : '',
            )}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15 + 0.5}s`,
            }}
          >
            <span className="text-white transition-colors duration-300 group-hover:text-cyan-400">
              Read more
            </span>
            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </div>
        </div>
      </div>
    </>
  )

  const wrapperClassName = cn(
    'group flex flex-col lg:flex-row gap-8 lg:gap-16 items-center',
    'cursor-pointer',
  )

  if (slug) {
    return (
      <div ref={cardRef}>
        <Link href={`/projects/${slug}`} className={wrapperClassName}>
          {cardContent}
        </Link>
      </div>
    )
  }

  return (
    <div className={wrapperClassName} ref={cardRef}>
      {cardContent}
    </div>
  )
}
