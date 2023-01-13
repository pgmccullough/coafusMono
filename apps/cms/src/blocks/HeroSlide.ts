import type { Block } from 'payload/types';

type Data = Record<string, unknown>;

export const HeroSlide: Block = {
  slug: 'heroslide',
  labels: {
      singular: 'Hero Slide',
      plural: 'Hero Slides',
  },
  fields: [
    {
      name: 'heroSlides',
      type: 'array',
      label: 'Hero Slides',
      minRows: 1,
      labels: {
          singular: 'Hero Slide',
          plural: 'Hero Slides',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'backgroundImage',
              label: 'Background Image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'featuredImage',
              label: 'featured Image',
              type: 'upload',
              relationTo: 'media'
            },
            {
              name: 'title',
              label: 'Title',
              type: 'text'
            },
            {
              name: 'description',
              label: 'Description',
              type: 'richText'
            },
            {
              name: 'page',
              label: 'Page to link to',
              type: 'relationship',
              relationTo: 'pages',
            }
          ]
        }
      ]
    }
  ]
};