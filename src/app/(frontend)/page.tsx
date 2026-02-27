import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import config from '@/payload.config'
import { RenderBlocks } from './components/RenderBlocks'
import type { Page } from '@/payload-types'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })

  const pages = await payload.find({
    collection: 'pages',
    where: {
      isHome: {
        equals: true,
      },
    },
    draft: false,
  })

  const homePage = pages.docs[0] as Page | undefined

  if (!homePage) {
    return {
      title: 'Dockyard Design',
    }
  }

  const seoTitle = homePage.meta?.title || homePage.title
  const seoDescription = homePage.meta?.description
  const ogImage = homePage.meta?.image
    ? typeof homePage.meta.image === 'object' &&
      homePage.meta.image !== null &&
      'url' in homePage.meta.image
      ? homePage.meta.image.url
      : undefined
    : undefined

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: ogImage
      ? {
          images: [
            {
              url: ogImage,
            },
          ],
        }
      : undefined,
  }
}

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  const { isEnabled: isDraftMode } = await draftMode()

  // Fetch the homepage - include drafts if in draft mode (live preview)
  const pages = await payload.find({
    collection: 'pages',
    where: {
      isHome: {
        equals: true,
      },
    },
    depth: 2,
    draft: isDraftMode,
  })

  const homePage = pages.docs[0]

  if (!homePage) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-primary-gradient">
      <RenderBlocks blocks={homePage.blocks} />
    </main>
  )
}
