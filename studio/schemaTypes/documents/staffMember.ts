import { defineField, defineType } from 'sanity'

export const staffMember = defineType({
  name: 'staffMember',
  title: 'Staff Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'pronouns',
      title: 'Pronouns',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'localizedString',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'yearsActive',
      title: 'Years Active',
      type: 'array',
      of: [{ type: 'number' }],
      description: 'e.g. [2024, 2025, 2026]',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'pronouns',
      media: 'photo',
    },
  },
})
