import type { Block } from 'payload'

export const FullscreenProjects: Block = {
  slug: 'fullscreenProjects',
  interfaceName: 'FullscreenProjectsBlock',
  labels: {
    singular: 'Fullscreen Projects',
    plural: 'Fullscreen Projects',
  },
  fields: [
    {
      name: 'showButtons',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Navigation Buttons',
    },
    {
      name: 'autoPlay',
      type: 'checkbox',
      defaultValue: true,
      label: 'Auto-play',
    },
    {
      name: 'autoPlayInterval',
      type: 'number',
      defaultValue: 10000,
      label: 'Auto-play Interval (ms)',
      admin: {
        condition: (data) => data?.autoPlay === true,
        description: 'Time between automatic slide transitions',
      },
    },
    {
      name: 'showDots',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Pagination Dots',
    },
    {
      name: 'seeMoreButtonText',
      type: 'text',
      defaultValue: 'VIEW ALL PROJECTS',
      label: '"See More" Button Text',
    },
    {
      name: 'seeMoreButtonLink',
      type: 'text',
      defaultValue: '/projects',
      label: '"See More" Button Link',
    },
    {
      name: 'contactButtonText',
      type: 'text',
      defaultValue: 'GET IN TOUCH',
      label: '"Get In Touch" Button Text',
    },
    {
      name: 'contactButtonLink',
      type: 'text',
      defaultValue: '/contact',
      label: '"Get In Touch" Button Link',
    },
  ],
}
