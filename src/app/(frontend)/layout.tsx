import React from 'react'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { SiteSetting } from '@/payload-types'

const avenirNext = localFont({
  src: [
    {
      path: './fonts/AvenirNext-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/AvenirNext-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/AvenirNext-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/AvenirNext-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/AvenirNext-DemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/AvenirNext-DemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/AvenirNext-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/AvenirNext-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: './fonts/AvenirNext-Heavy.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/AvenirNext-HeavyItalic.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: './fonts/AvenirNext-UltraLight.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/AvenirNext-UltraLightItalic.woff2',
      weight: '100',
      style: 'italic',
    },
  ],
  variable: '--font-sans',
})

export async function generateMetadata() {
  const payload = await getPayload({ config })
  const siteSettings = (await payload.findGlobal({
    slug: 'site-settings',
  })) as SiteSetting

  // Get favicon URL - handle both populated and unpopulated
  const faviconUrl = siteSettings?.favicon
    ? typeof siteSettings.favicon === 'object' &&
      siteSettings.favicon !== null &&
      'url' in siteSettings.favicon
      ? siteSettings.favicon.url || '/favicon.ico'
      : '/favicon.ico'
    : '/favicon.ico'

  return {
    icons: {
      icon: faviconUrl,
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={avenirNext.variable} data-scroll-behavior="smooth">
      <body className="antialiased text-white font-sans min-h-screen flex flex-col bg-primary-gradient">
        <LivePreviewListener />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
