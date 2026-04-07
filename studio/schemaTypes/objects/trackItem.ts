import { defineField, defineType } from 'sanity'

export const trackClass = defineType({
  name: 'trackClass',
  title: 'Class',
  type: 'object',
  fields: [
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
      name: 'instructorRef',
      title: 'Instructor',
      type: 'reference',
      to: [{ type: 'instructor' }],
    }),
  ],
  preview: {
    select: { title: 'title.en' },
  },
})

export const trackItem = defineType({
  name: 'trackItem',
  title: 'Track',
  type: 'object',
  fields: [
    defineField({
      name: 'trackName',
      title: 'Track Name',
      type: 'localizedString',
    }),
    defineField({
      name: 'trackDescription',
      title: 'Track Description',
      type: 'localizedSimpleText',
    }),
    defineField({
      name: 'classes',
      title: 'Classes',
      type: 'array',
      of: [{ type: 'trackClass' }],
    }),
  ],
  preview: {
    select: { title: 'trackName.en' },
  },
})
