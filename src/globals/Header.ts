import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Navigation Bar',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'navLinks',
      type: 'array',
      label: 'Navigation Links',
      minRows: 1,
      maxRows: 8,
      labels: {
        singular: 'Nav Link',
        plural: 'Nav Links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Link Label',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: 'Link URL',
          admin: {
            description: 'Use /page for internal pages, https://... for external',
          },
        },
        {
          name: 'isExternal',
          type: 'checkbox',
          defaultValue: false,
          label: 'External Link',
        },
      ],
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
          defaultValue: 'GET IN TOUCH',
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
  ],
}
