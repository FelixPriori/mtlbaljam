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
      type: 'localizedString',
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
      name: 'isCurrent',
      title: 'Current Staff Member',
      type: 'boolean',
      description: 'Check if this person is on the current team. Uncheck to move them to the alumni section.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'pronouns.en',
      media: 'photo.asset',
    },
  },
})
