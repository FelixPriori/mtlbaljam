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
      title: 'Price',
      type: 'string',
    }),
    defineField({
      name: 'soldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'when',
      title: 'When Available',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedSimpleText',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'imageWithAlt' }],
    }),
    defineField({
      name: 'orderInstructions',
      title: 'Order Instructions',
      type: 'localizedSimpleText',
    }),
  ],
  preview: {
    select: { title: 'key', subtitle: 'price' },
  },
})
