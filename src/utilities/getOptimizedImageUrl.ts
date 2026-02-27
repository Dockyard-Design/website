/**
 * Transforms media URLs to use Next.js Image Optimization
 * - Converts Payload API URLs to absolute URLs for Next.js optimization
 * - Uses direct Vercel Blob URLs when available for faster loading
 */
export function getOptimizedImageUrl(url: string | null | undefined): string {
  if (!url) return '/images/anchor.png'

  // If it's already a full URL (Vercel Blob), use it directly
  if (url.startsWith('http')) {
    return url
  }

  // If it's a Payload API URL, convert to absolute URL
  if (url.startsWith('/api/media/file/')) {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    return `${baseUrl}${url}`
  }

  // If it's already a local path, return as-is
  if (url.startsWith('/')) {
    return url
  }

  return url
}

/**
 * Gets the appropriate image size URL for responsive images
 * Falls back to original URL if sized versions aren't available
 */
export function getSizedImageUrl(
  media:
    | { url?: string | null; sizes?: Record<string, { url?: string | null }> }
    | null
    | undefined,
  size: 'thumbnail' | 'card' | 'tablet' = 'card',
): string {
  if (!media) return '/images/anchor.png'

  // Try to get sized version first
  if (media.sizes?.[size]?.url) {
    return getOptimizedImageUrl(media.sizes[size].url)
  }

  // Fall back to original URL
  return getOptimizedImageUrl(media.url)
}
