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
      name: 'heroImagePosition',
      type: 'group',
      label: 'Hero Image Position & Size',
      fields: [
        {
          name: 'position',
          type: 'select',
          defaultValue: 'right-center',
          options: [
            { label: 'Right Center', value: 'right-center' },
            { label: 'Right Top', value: 'right-top' },
            { label: 'Right Bottom', value: 'right-bottom' },
            { label: 'Left Center', value: 'left-center' },
            { label: 'Left Top', value: 'left-top' },
            { label: 'Left Bottom', value: 'left-bottom' },
            { label: 'Center', value: 'center' },
            { label: 'Custom', value: 'custom' },
          ],
          label: 'Position Preset',
        },
        {
          name: 'customTop',
          type: 'text',
          defaultValue: '50%',
          label: 'Custom Top Position (e.g., 50%, 100px)',
          admin: {
            condition: (data) => data?.heroImagePosition?.position === 'custom',
          },
        },
        {
          name: 'customRight',
          type: 'text',
          defaultValue: '0',
          label: 'Custom Right Position (e.g., 0, 20px)',
          admin: {
            condition: (data) => data?.heroImagePosition?.position === 'custom',
          },
        },
        {
          name: 'customLeft',
          type: 'text',
          label: 'Custom Left Position (e.g., 0, 20px)',
          admin: {
            condition: (data) => data?.heroImagePosition?.position === 'custom',
          },
        },
        {
          name: 'width',
          type: 'text',
          defaultValue: '28vw',
          label: 'Width (e.g., 28vw, 400px, 50%)',
        },
        {
          name: 'maxWidth',
          type: 'text',
          defaultValue: '800',
          label: 'Max Width in px (e.g., 800)',
        },
        {
          name: 'minWidth',
          type: 'text',
          defaultValue: '200',
          label: 'Min Width in px (e.g., 200)',
        },
        {
          name: 'rotation',
          type: 'number',
          defaultValue: 0,
          min: -360,
          max: 360,
          label: 'Rotation (degrees)',
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
