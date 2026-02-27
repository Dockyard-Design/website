import type { CollectionConfig } from 'payload'
import { adminOrHasCollectionAccess } from '@/access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Gallery',
    plural: 'Gallery',
  },
  admin: {
    group: 'Content',
  },
  access: {
    create: adminOrHasCollectionAccess('media'),
    read: () => true,
    update: adminOrHasCollectionAccess('media'),
    delete: adminOrHasCollectionAccess('media'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Convert all uploads to WebP for better compression
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
      },
    },
    // Generate responsive image sizes - all in WebP format
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 80 },
        },
      },
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 85 },
        },
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 85 },
        },
      },
      {
        name: 'hero',
        width: 1920,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 90 },
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/avif'],
    // Disable local storage since we're using Vercel Blob
    disableLocalStorage: true,
  },
}
