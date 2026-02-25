'use client'

import { Button } from '../ui/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="h-screen w-full relative pt-50overflow-visible pt-80">
      <div className="absolute top-27 overflow-visible w-full h-full">
        <Image
          src="/images/hero-background.png"
          alt="Hero Background"
          fill
          className="object-cover object-center pointer-events-none select-none"
          priority
        />
      </div>
      <Image
        src="/images/hero.png"
        alt="Anchor"
        width={1920}
        height={1080}
        className="absolute right-0 top-8/13 -translate-y-1/2 z-10 w-[28vw] max-w-200 min-w-200 h-auto pointer-events-none select-none object-cover"
        priority
      />

      <div className="flex flex-col pt-20 z-20 mt-10 leading-tight tracking-[0.1rem] relative pl-80 pr-80">
        <span className="ml-47 text-[70px] font-semibold text-[#73809A] uppercase muted-text-shadow-hero">
          Prototype
        </span>
        <span className="ml-12 text-[70px] uppercase font-semibold">
          <span className="white-text-shadow-hero">We</span>{' '}
          <span className="text-[70px] uppercase text-gradient-hero font-semibold">Design</span>
        </span>
        <span className="ml-47 text-[70px] font-semibold text-[#73809A] uppercase muted-text-shadow-hero">
          Build
        </span>
        <div className="ml-10 w-full flex flex-col space-y-6 min-w-110 max-w-110 justify-center items-center align-center">
          <span className="ml-10 tracking-normal text-center text-md max-w-400 font-bold mt-4 off-white-text-shadow-hero">
            Custom web applications and bespoke digital products for forward-thinking brands
          </span>
          <Button variant="glower" size="lg-rounded" className="w-50 uppercase">
            Get in touch
          </Button>
          <Link
            href="#"
            className="tracking-normal text-center text-sm max-w-400 hover:underline pt-2"
          >
            <span className="">or read more below....</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
