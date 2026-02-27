'use client'

import { Button } from '../ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import type { HeroBlock } from '@/payload-types'

export default function HeroBlock({
  backgroundImage,
  heroImage,
  headlines,
  subheadline,
  ctaButton,
  secondaryLink,
}: HeroBlock) {
  // Helper to get image URL from Media
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

  // Calculate cumulative margin for each line
  const marginClasses: Record<string, string> = {
    '0': 'ml-0',
    '12': 'ml-12',
    '47': 'ml-47',
  }

  return (
    <div className="h-screen w-full relative overflow-visible pt-80">
      <div className="absolute top-27 overflow-visible w-full h-full">
        {backgroundUrl && (
          <Image
            src={backgroundUrl}
            alt="Hero Background"
            fill
            className="object-cover object-center pointer-events-none select-none"
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
          className="absolute right-0 top-8/13 -translate-y-1/2 z-10 w-[28vw] max-w-200 min-w-200 h-auto pointer-events-none select-none object-cover"
          priority
        />
      )}

      <div className="flex flex-col pt-20 z-20 mt-10 leading-tight tracking-[0.1rem] relative pl-80 pr-80">
        {headlines?.map((line, index) => {
          const baseClasses = 'text-[70px] font-semibold uppercase'
          const styleClasses = {
            white: 'white-text-shadow-hero',
            muted: 'text-[#73809A] muted-text-shadow-hero',
            gradient: 'text-gradient-hero',
          }
          const marginClass = marginClasses[line.marginLeft || '0'] || 'ml-0'

          return (
            <span
              key={index}
              className={`${marginClass} ${baseClasses} ${styleClasses[line.style || 'white']}`}
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
