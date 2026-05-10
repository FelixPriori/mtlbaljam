import { defineField, defineType } from 'sanity'

export const extraItem = defineType({
  name: 'extraItem',
  title: 'Extra Item',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Identifier used in code (e.g. "shirt", "towel", "breakfast").',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'price',
      title: 'Price (CAD)',
      type: 'number',
      description: 'Amount in CAD. Leave empty for free items.',
    }),
    defineField({
      name: 'soldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'imageWithAlt' }],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      description: 'Description, deadlines, credits, and any other details.',
      type: 'localizedText',
    }),
    defineField({
      name: 'orderMethods',
      title: 'How to Order',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'While registering', value: 'whileRegistering' },
          { title: 'Edit existing registration', value: 'editRegistration' },
          { title: 'At the event', value: 'atTheEvent' },
          { title: 'Contact us', value: 'contactUs' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'key', subtitle: 'price' },
  },
})
