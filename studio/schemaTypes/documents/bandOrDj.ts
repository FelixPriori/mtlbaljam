import { defineField, defineType } from 'sanity'

export const bandOrDj = defineType({
  name: 'bandOrDj',
  title: 'Band / DJ',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Band name or DJ stage name.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Live Band', value: 'band' },
          { title: 'DJ', value: 'dj' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'pronouns',
      title: 'Pronouns',
      type: 'string',
      description: 'For solo DJs.',
      hidden: ({ parent }) => parent?.type !== 'dj',
    }),
    defineField({
      name: 'logo',
      title: 'Logo / Photo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'localizedText',
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
    }),
    defineField({
      name: 'schemaDescription',
      title: 'Schema.org Description',
      type: 'string',
      description: 'Short description for JSON-LD structured data (English only).',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
      media: 'logo',
    },
  },
})
