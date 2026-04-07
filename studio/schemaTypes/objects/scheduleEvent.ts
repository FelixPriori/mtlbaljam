import { defineField, defineType } from 'sanity'

export const scheduleEvent = defineType({
  name: 'scheduleEvent',
  title: 'Schedule Event',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'Unique key within the edition (e.g. "friday-doors", "saturday-band").',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'start',
      title: 'Start',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'end',
      title: 'End',
      type: 'datetime',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Class', value: 'class' },
          { title: 'Social Dance', value: 'social' },
          { title: 'Break', value: 'break' },
          { title: 'Competition', value: 'competition' },
          { title: 'Live Music', value: 'music' },
          { title: 'Venue', value: 'venue' },
          { title: 'Extra', value: 'extra' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'instructorRef',
      title: 'Instructor',
      type: 'reference',
      to: [{ type: 'instructor' }],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'start',
    },
  },
})
