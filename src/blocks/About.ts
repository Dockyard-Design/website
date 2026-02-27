import type { Block } from 'payload'

export const About: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'richText',
      required: true,
      label: 'Section Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      label: 'Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Company Description',
    },
    {
      name: 'teamMembers',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      maxRows: 4,
      labels: {
        singular: 'Team Member',
        plural: 'Team Members',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Full Name',
        },
        {
          name: 'role',
          type: 'text',
          required: true,
          label: 'Role (e.g., Designer, Developer)',
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Team Member Photo',
        },
        {
          name: 'rotation',
          type: 'select',
          required: true,
          defaultValue: '-10',
          options: [
            { label: 'Left Tilt (-10deg)', value: '-10' },
            { label: 'Right Tilt (+10deg)', value: '10' },
          ],
          label: 'Photo Rotation',
        },
        {
          name: 'animationDelay',
          type: 'number',
          defaultValue: 0,
          label: 'Animation Delay (seconds)',
        },
      ],
    },
    {
      name: 'ctaSection',
      type: 'group',
      label: 'CTA Section',
      fields: [
        {
          name: 'headline',
          type: 'richText',
          required: true,
          label: 'CTA Headline',
        },
        {
          name: 'email',
          type: 'text',
          required: true,
          defaultValue: 'hello@dockyard.design',
          label: 'Email Address',
        },
        {
          name: 'buttonText',
          type: 'text',
          required: true,
          defaultValue: 'Get in touch',
          label: 'Button Text',
        },
        {
          name: 'buttonLink',
          type: 'text',
          required: true,
          defaultValue: '/contact',
          label: 'Button Link',
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image (optional)',
    },
  ],
}
