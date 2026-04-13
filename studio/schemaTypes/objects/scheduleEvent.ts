import { defineField, defineType } from 'sanity'
import { RoomInput } from '../../components/RoomInput'

export const scheduleEvent = defineType({
  name: 'scheduleEvent',
  title: 'Schedule Event',
  type: 'object',
  fields: [
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
          { title: 'Venue opens/closes', value: 'venue' },
          { title: 'Extra', value: 'extra' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Venue',
      type: 'reference',
      to: [{ type: 'venue' }],
      description: 'Leave empty if this event is at the main edition venue.',
    }),
    defineField({
      name: 'musicRef',
      title: 'Band / DJ',
      type: 'reference',
      to: [{ type: 'bandOrDj' }],
      description: 'The band or DJ performing at this social dance.',
      hidden: ({ parent }) => parent?.type !== 'social',
    }),
    defineField({
      name: 'track',
      title: 'Room',
      type: 'string',
      description: 'For parallel class slots only. Leave empty for events that span all rooms (socials, breaks, music, etc.).',
      components: { input: RoomInput },
    }),
    defineField({
      name: 'instructorRef',
      title: 'Instructor',
      type: 'reference',
      to: [{ type: 'instructor' }],
      hidden: ({ parent }) => parent?.type !== 'class',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'start',
    },
  },
})
