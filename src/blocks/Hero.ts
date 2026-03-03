import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image (Foreground)',
    },
    {
      name: 'subheadline',
      type: 'text',
      required: true,
      label: 'Subheadline Text',
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'Get in touch',
          label: 'Button Text',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          defaultValue: '/contact',
          label: 'Button Link',
        },
      ],
    },
    {
      name: 'secondaryLink',
      type: 'group',
      label: 'Secondary Link',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'or read more below....',
          label: 'Link Text',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '#',
          label: 'Link URL',
        },
      ],
    },
  ],
}
