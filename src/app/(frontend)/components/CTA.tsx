'use client'

import Link from 'next/link'
import { Button } from './ui/Button'

interface CTAProps {
  headline: string
  buttonText: string
  buttonLink?: string
}

interface CTAProps {
  headline: string
  buttonText: string
  buttonLink?: string
}

export default function CTA({ headline, buttonText, buttonLink = '/contact' }: CTAProps) {
  return (
    <>
      <div className="flex items-center justify-center align-middle">
        <div className="max-w-md text-4xl p-8">
          <p className="mb-10">{headline}</p>
          <Link href={buttonLink}>
            <Button variant="glower" size="xl" className="w-full sm:w-auto uppercase">
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
