import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import Hero from './components/homepage/Hero'
import Projects from './components/homepage/Projects'
import Services from './components/homepage/Services'
import About from './components/homepage/About'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <main className="min-h-screen bg-primary-gradient">
      <Hero />
      <Projects />
      <Services />
      <About />
    </main>
  )
}
