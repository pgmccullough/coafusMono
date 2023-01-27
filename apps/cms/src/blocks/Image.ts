import type { Block } from 'payload/types';

export const Image: Block = {
    slug: 'image',
    labels: {
        singular: 'Image',
        plural: 'Images',
    },
    fields: [
        {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'caption',
            label: 'Caption',
            type: 'richText',
            admin: {
                elements: ['link'],
            },
        },
    ],
};
