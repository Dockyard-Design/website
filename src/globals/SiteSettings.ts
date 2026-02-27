import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Logo',
      admin: {
        description: 'Upload the main logo used in header and footer',
      },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Favicon',
      admin: {
        description: 'Upload a favicon (preferably .ico or .png, 32x32 or 64x64)',
      },
    },
  ],
}
