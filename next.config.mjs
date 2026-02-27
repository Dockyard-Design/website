import { withPayload } from '@payloadcms/next/withPayload'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const url = new URL(serverUrl)

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // Local development
      {
        protocol: url.protocol.replace(':', ''),
        hostname: url.hostname,
        port: url.port || undefined,
      },
      // Vercel Blob Storage
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      // Fallback for any blob storage
      {
        protocol: 'https',
        hostname: '*.blob.vercel-storage.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [256, 384, 640],
    minimumCacheTTL: 60,
  },
}

export default withPayload(nextConfig)
