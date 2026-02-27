import type { Media } from '@/payload-types'

/**
 * Gets the appropriate image URL for a media item
 * Uses sized versions when available for better performance
 */
export function getMediaUrl(
  media: Media | number | null | undefined,
  size: 'thumbnail' | 'card' | 'tablet' | 'hero' = 'card',
): string {
  // If media is just an ID or null, return fallback
  if (!media || typeof media === 'number') {
    return '/images/anchor.png'
  }

  // Try to get sized version first
  const sizedUrl = media.sizes?.[size]?.url
  if (sizedUrl) {
    return sizedUrl
  }

  // Fall back to original URL
  return media.url || '/images/anchor.png'
}

/**
 * Gets the URL for a project's meta image
 * Handles both populated media objects and fallback
 */
export function getProjectImageUrl(
  project: {
    meta?: {
      image?: Media | number | null
    } | null
  },
  size: 'thumbnail' | 'card' | 'tablet' | 'hero' = 'card',
): string {
  if (!project.meta?.image) {
    return '/images/anchor.png'
  }

  return getMediaUrl(project.meta.image, size)
}
