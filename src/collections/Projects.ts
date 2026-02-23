import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { generatePreviewPath } from '../utilities/generatePreviewPath'

const formatSlug = (val: string): string => {
  return val
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const galleryField = (
  section: string,
  sectionNumber: number,
): CollectionConfig['fields'][number] => ({
  name: `${section}Gallery`,
  type: 'array',
  label: 'Gallery Images',
  minRows: 0,
  maxRows: 4,
  admin: {
    description: 'Optional: Add up to 4 images for this section',
    components: {
      RowLabel: '@/components/GalleryRowLabel#GalleryRowLabel',
    },
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: false,
      admin: {
        description: 'Select an image',
      },
    },
    {
      name: 'alt',
      type: 'text',
      label: false,
      admin: {
        placeholder: 'Alt text for accessibility...',
        description: 'Describe the image for screen readers',
      },
    },
  ],
})

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: (data?.slug as string) || '',
          collection: 'projects',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'projects',
        req,
      }),
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
  access: {
    read: () => true,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    meta: {
      image: true,
      description: true,
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              maxLength: 500,
              admin: {
                description: 'A brief summary of the project (used for SEO and previews)',
              },
            },
            slugField({
              name: 'slug',
              useAsSlug: 'title',
              required: true,
              localized: false,
              slugify: ({ valueToSlugify }) => {
                return formatSlug(String(valueToSlugify || ''))
              },
            }),
          ],
        },
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Hero Section',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Hero Title',
                  admin: {
                    description: 'Leave empty to use the main post title',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Hero Image',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  label: 'Short Description',
                  admin: {
                    description: 'A short description to display below the title',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'The Brief',
          fields: [
            {
              name: 'theBrief',
              type: 'richText',
              editor: lexicalEditor(),
              label: 'Content',
            },
            galleryField('theBrief', 1),
          ],
        },
        {
          label: 'Prototyping',
          fields: [
            {
              name: 'prototyping',
              type: 'richText',
              editor: lexicalEditor(),
              label: 'Content',
            },
            galleryField('prototyping', 2),
          ],
        },
        {
          label: 'Build',
          fields: [
            {
              name: 'build',
              type: 'richText',
              editor: lexicalEditor(),
              label: 'Content',
            },
            galleryField('build', 3),
          ],
        },
        {
          label: 'Feedback',
          fields: [
            {
              name: 'feedback',
              type: 'richText',
              editor: lexicalEditor(),
              label: 'Content',
            },
            galleryField('feedback', 4),
          ],
        },
      ],
    },
  ],
}
