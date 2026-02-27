import type { Block } from 'payload'

export const Services: Block = {
  slug: 'services',
  interfaceName: 'ServicesBlock',
  labels: {
    singular: 'Services Section',
    plural: 'Services Sections',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'richText',
      required: true,
      label: 'Section Title',
    },
    {
      name: 'featuredService',
      type: 'group',
      label: 'Featured Service Card',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Card Title',
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          label: 'Card Description',
        },
      ],
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Subtitle ("Additional Services" heading)',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description text below subtitle',
    },
    {
      name: 'services',
      type: 'array',
      label: 'Service Cards',
      minRows: 1,
      maxRows: 6,
      labels: {
        singular: 'Service',
        plural: 'Services',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Service Icon',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Service Title',
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          label: 'Service Description',
        },
        {
          name: 'cardColor',
          type: 'text',
          required: true,
          defaultValue: '#FF312E',
          label: 'Card Border/Glow Color (hex)',
        },
        {
          name: 'iconGradientStart',
          type: 'text',
          required: true,
          defaultValue: '#FF1616',
          label: 'Icon Gradient Start (hex)',
        },
        {
          name: 'iconGradientEnd',
          type: 'text',
          required: true,
          defaultValue: '#FF5656',
          label: 'Icon Gradient End (hex)',
        },
      ],
    },
  ],
}
