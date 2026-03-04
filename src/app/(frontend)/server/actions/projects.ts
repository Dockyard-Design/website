'use server'

import type { Project } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'

interface ProjectWithHeroImage extends Project {
  heroImage: string
}

export async function getProjectsServerAction(): Promise<ProjectWithHeroImage[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
      limit: 10,
      depth: 1,
      draft: false,
    })

    return result.docs.map((doc) => ({
      ...doc,
      heroImage: getMediaUrl(doc.hero?.image),
    }))
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

function getMediaUrl(image: any, size: string = 'hero'): string {
  if (!image) return ''
  if (typeof image === 'string') return image
  if (typeof image === 'number') return ''
  if (image.url) return image.url
  if (image.sizes?.[size]?.url) return image.sizes[size].url
  return ''
}
