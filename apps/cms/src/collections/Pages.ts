import { CollectionConfig } from 'payload/types';
import formatSlug from '../utilities/formatSlug';
import { Image } from '../blocks/Image';
import { CallToAction } from '../blocks/CallToAction';
import { Content } from '../blocks/Content';
import { mediaSlug } from './Media';
import { authenticatedAndAdmin, pageIsPublic } from '../access/index';

export const pagesSlug = 'pages';
export const Pages: CollectionConfig = {
    slug: pagesSlug,
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: ({ req }) => {
            if (authenticatedAndAdmin({ req })) return true;
            return pageIsPublic();
        },
        create: authenticatedAndAdmin,
        update: authenticatedAndAdmin,
        delete: authenticatedAndAdmin,
    },
    fields: [
        {
            name: 'title',
            label: 'Page Title',
            type: 'text',
            required: true,
        },
        {
            name: 'inNav',
            label: 'List in navigation',
            type: 'checkbox',
            defaultValue: false,
        },
        {
            name: 'topLvl',
            label: 'Top level link',
            type: 'checkbox',
            defaultValue: true,
            admin: {
                condition: (data, siblingData) => {
                  if (data.inNav) {
                    return true;
                  } else {
                    return false;
                  }
                }
            }
        },
        {
            name: 'isDummy',
            label: 'Dummy placeholder',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                condition: (data, siblingData) => {
                  if (data.inNav&&data.topLvl) {
                    return true;
                  } else {
                    return false;
                  }
                }
            }
        },
        {
            name: 'parentNav',
            label: 'Parent Page',
            type: 'relationship',
            relationTo: 'pages',
            hasMany: true,
            filterOptions: ({ relationTo, siblingData }) => {
                return {
                    'topLvl': {equals: true}
                }
            },
            admin: {
                condition: (data) => {
                  if (data.inNav&&!data.topLvl) {
                    return true;
                  } else {
                    return false;
                  }
                }
            }
        },
        {
            name: 'navOrder',
            label: 'Order',
            type: 'number',
            defaultValue: -1,
            admin: {
                condition: (data, siblingData) => {
                  if (data.inNav) {
                    return true;
                  } else {
                    return false;
                  }
                }
            }
        },
        {
            name: 'image',
            label: 'Featured Image',
            type: 'upload',
            relationTo: mediaSlug,
        },
        {
            name: 'public',
            label: 'Public',
            type: 'checkbox',
            defaultValue: false,
        },
        {
            name: 'layout',
            label: 'Page Layout',
            type: 'blocks',
            minRows: 1,
            blocks: [CallToAction, Content, Image],
        },
        {
            name: 'meta',
            label: 'Page Meta',
            type: 'group',
            fields: [
                {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                },
                {
                    name: 'description',
                    label: 'Description',
                    type: 'textarea',
                },
                {
                    name: 'keywords',
                    label: 'Keywords',
                    type: 'text',
                },
            ],
        },
        {
            name: 'slug',
            label: 'Page Slug',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [formatSlug('title')],
            },
        },
    ],
};

export default Pages;
