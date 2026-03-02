import type { GlobalConfig } from 'payload'

export const CTA: GlobalConfig = {
  slug: 'cta',
  label: 'CTA Section',
  admin: {
    group: 'Settings',
    description: 'Global CTA section configuration used across the site',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'ARE YOU READY FOR YOUR NEW WEBSITE?',
      label: 'CTA Headline',
      admin: {
        description: 'Main headline text for the CTA section',
      },
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      defaultValue: 'hello@dockyard.design',
      label: 'Email Address',
      admin: {
        description: 'Email address displayed in the CTA',
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      defaultValue: 'GET IN TOUCH',
      label: 'Button Text',
      admin: {
        description: 'Text displayed on the CTA button',
      },
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
      defaultValue: '/contact',
      label: 'Button Link',
      admin: {
        description: 'URL the button links to',
      },
    },
  ],
}
