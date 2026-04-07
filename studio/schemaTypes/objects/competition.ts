import { defineField, defineType } from 'sanity'

export const competition = defineType({
  name: 'competition',
  title: 'Competition',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Competition Type',
      type: 'string',
      options: {
        list: [
          { title: 'Mix & Match', value: 'mixAndMatch' },
          { title: 'Pure Bal Strictly', value: 'pureBalStrictly' },
          { title: 'Slow Bal', value: 'slowBal' },
          { title: 'Balboa Strictly', value: 'balboaStrictly' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedSimpleText',
    }),
    defineField({
      name: 'price',
      title: 'Entry Price',
      type: 'string',
      description: 'e.g. "$10 per person"',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'localizedString',
    }),
    defineField({
      name: 'when',
      title: 'When',
      type: 'localizedString',
    }),
  ],
  preview: {
    select: { title: 'type' },
  },
})
