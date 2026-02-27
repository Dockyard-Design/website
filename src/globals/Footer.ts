import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image (Anchor)',
    },
    {
      name: 'leftNavLinks',
      type: 'array',
      label: 'Left Navigation Links',
      minRows: 1,
      maxRows: 6,
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Link Label',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Link URL',
        },
      ],
    },
    {
      name: 'rightNavLinks',
      type: 'array',
      label: 'Right Navigation Links',
      minRows: 1,
      maxRows: 6,
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Link Label',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Link URL',
        },
      ],
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      defaultValue: 'hello@dockyard.design',
      label: 'Contact Email',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Links',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
        },
      ],
    },
  ],
}
