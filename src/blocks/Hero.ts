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
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image (Foreground)',
    },
    {
      name: 'headlines',
      type: 'array',
      label: 'Headline Lines',
      minRows: 1,
      maxRows: 5,
      labels: {
        singular: 'Line',
        plural: 'Lines',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Line Text',
        },
        {
          name: 'style',
          type: 'select',
          required: true,
          defaultValue: 'white',
          options: [
            { label: 'White (white-text-shadow-hero)', value: 'white' },
            { label: 'Muted Blue (muted-text-shadow-hero)', value: 'muted' },
            { label: 'Gradient (text-gradient-hero)', value: 'gradient' },
          ],
          label: 'Text Style',
        },
        {
          name: 'marginLeft',
          type: 'text',
          defaultValue: '0',
          label: 'Left Margin (e.g., 47, 12)',
        },
      ],
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
