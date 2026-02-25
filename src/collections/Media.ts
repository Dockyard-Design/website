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
  upload: true,
}
