import { defineField, defineType } from 'sanity'

export const instructorGroup = defineType({
  name: 'instructorGroup',
  title: 'Instructor Group',
  type: 'object',
  fields: [
    defineField({
      name: 'groupImage',
      title: 'Group Photo',
      type: 'imageWithAlt',
      description: 'Combined photo of the instructor pair (e.g. irina-natalia.png)',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'groupName',
      title: 'Group Name',
      type: 'string',
      description: 'e.g. "Irina & Natalia"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'localizedSimpleText',
      description: '2 short bio paragraphs shown on the homepage.',
    }),
  ],
  preview: {
    select: { title: 'groupName' },
  },
})
