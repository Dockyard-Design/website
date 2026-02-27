import type { Block } from 'payload'

export const Steps: Block = {
  slug: 'steps',
  interfaceName: 'StepsBlock',
  labels: {
    singular: 'Steps Section',
    plural: 'Steps Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'richText',
      required: true,
      label: 'Section Title',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Process Steps',
      minRows: 4,
      maxRows: 4,
      labels: {
        singular: 'Step',
        plural: 'Steps',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Step Icon',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Step Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Step Description',
        },
        {
          name: 'color',
          type: 'text',
          required: true,
          label: 'Title Background Color (hex)',
        },
        {
          name: 'animationDelay',
          type: 'number',
          defaultValue: 0,
          label: 'Animation Delay (seconds)',
        },
      ],
    },
  ],
}
