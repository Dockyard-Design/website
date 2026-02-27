import type { Block } from 'payload'

export const ProjectsCarousel: Block = {
  slug: 'projectsCarousel',
  interfaceName: 'ProjectsCarouselBlock',
  labels: {
    singular: 'Projects Carousel',
    plural: 'Projects Carousels',
  },
  fields: [
    {
      name: 'title',
      type: 'richText',
      required: true,
      label: 'Section Title',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      label: 'Subtitle/Description',
    },
    {
      name: 'showSeeMoreButton',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show "See More" Button',
    },
    {
      name: 'seeMoreButtonText',
      type: 'text',
      defaultValue: 'SEE MORE →',
      label: '"See More" Button Text',
    },
    {
      name: 'seeMoreButtonLink',
      type: 'text',
      defaultValue: '/projects',
      label: '"See More" Button Link',
    },
    {
      name: 'showContactButton',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show "Get In Touch" Button',
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
    // Note: Projects data is hardcoded for now as requested
    // In the future, this could be a relationship to the Projects collection
  ],
}
