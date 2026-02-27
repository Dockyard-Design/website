import { slugField } from 'payload'
import type { CollectionConfig, Field } from 'payload'
import { Hero, Services, About, Steps, ProjectsCarousel } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data, req }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        const slug = data?.slug === 'home' ? '' : data?.slug
        const path = slug ? `/${slug}` : '/'
        // Include required params for the preview endpoint
        return `${baseUrl}/next/preview?path=${encodeURIComponent(path)}&collection=pages&slug=${data?.slug}&previewSecret=${process.env.PREVIEW_SECRET || ''}`
      },
    },
    preview: (data, { req }) => {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
      const slug = data?.slug === 'home' ? '' : data?.slug
      const path = slug ? `/${slug}` : '/'
      return `${baseUrl}/next/preview?path=${encodeURIComponent(path)}&collection=pages&slug=${data?.slug}&previewSecret=${process.env.PREVIEW_SECRET || ''}`
    },
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 50,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Page Title',
            },
            slugField(),
            {
              name: 'isHome',
              type: 'checkbox',
              defaultValue: false,
              label: 'Is Homepage',
              admin: {
                description: 'Check if this is the homepage (slug should be "home")',
              },
            },
            {
              name: 'blocks',
              type: 'blocks',
              label: 'Page Sections',
              blocks: [Hero, Services, About, ProjectsCarousel, Steps],
              admin: {
                initCollapsed: false,
              },
            },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'SEO Title',
              admin: {
                description: 'If left empty, the page title will be used',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Meta Description',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'OG Image',
              admin: {
                description: 'Image for social sharing (Open Graph)',
              },
            },
          ] as Field[],
        },
      ],
    },
  ],
}
