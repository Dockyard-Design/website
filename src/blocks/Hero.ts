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
      name: 'animationType',
      type: 'select',
      defaultValue: 'static',
      options: [
        { label: 'Static (Default)', value: 'static' },
        { label: 'Slot Machine', value: 'slotMachine' },
      ],
      label: 'Hero Animation Type',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'backgroundImageOpacity',
      type: 'number',
      defaultValue: 100,
      min: 0,
      max: 100,
      label: 'Background Image Opacity (%)',
    },
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
      name: 'headlines',
      type: 'array',
      label: 'Headline Lines',
      minRows: 1,
      maxRows: 5,
      labels: {
        singular: 'Line',
        plural: 'Lines',
      },
      admin: {
        condition: (data, siblingData) => siblingData?.animationType !== 'slotMachine',
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
            { label: 'Custom (use || syntax)', value: 'custom' },
          ],
          label: 'Text Style',
        },
        {
          name: 'marginLeft',
          type: 'text',
          defaultValue: '0',
          label: 'Left Margin in rem (e.g., 47, 12, 10.5)',
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
