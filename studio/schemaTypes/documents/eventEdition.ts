import { defineField, defineType } from 'sanity'

export const eventEdition = defineType({
  name: 'eventEdition',
  title: 'Event Edition',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (r) => r.required().integer().min(2024),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'year' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Event Start Date',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Event End Date',
      type: 'date',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'registrationOpenDate',
      title: 'Registration Opens',
      type: 'date',
    }),
    defineField({
      name: 'registrationCloseDate',
      title: 'Registration Closes',
      type: 'date',
    }),
    defineField({
      name: 'venueRef',
      title: 'Venue',
      type: 'reference',
      to: [{ type: 'venue' }],
    }),

    // ── People ────────────────────────────────────────────────────────────────
    defineField({
      name: 'instructors',
      title: 'Instructors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'instructor' }] }],
    }),
    defineField({
      name: 'bands',
      title: 'Live Bands',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'bandOrDj' }] }],
    }),
    defineField({
      name: 'djs',
      title: 'DJs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'bandOrDj' }] }],
    }),

    // ── Sponsors ──────────────────────────────────────────────────────────────
    defineField({
      name: 'sponsors',
      title: 'Sponsors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'sponsorRef',
              title: 'Sponsor',
              type: 'reference',
              to: [{ type: 'sponsor' }],
            },
            {
              name: 'tier',
              title: 'Tier',
              type: 'string',
              options: {
                list: [
                  { title: 'Presenting', value: 'presenting' },
                  { title: 'Gold', value: 'gold' },
                  { title: 'Silver', value: 'silver' },
                  { title: 'Community', value: 'community' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'sponsorRef.name', subtitle: 'tier' },
          },
        },
      ],
    }),

    // ── Schedule ──────────────────────────────────────────────────────────────
    defineField({
      name: 'scheduleEvents',
      title: 'Schedule',
      type: 'array',
      of: [{ type: 'scheduleEvent' }],
    }),

    // ── Competitions ──────────────────────────────────────────────────────────
    defineField({
      name: 'competitionsScheduleNote',
      title: 'Competitions — Schedule Note',
      type: 'localizedString',
      description: 'e.g. "Schedule is subject to change"',
    }),
    defineField({
      name: 'competitionsNote',
      title: 'Competitions — General Note',
      type: 'localizedString',
    }),
    defineField({
      name: 'competitionsMusicTitle',
      title: 'Competitions — Music Section Title',
      type: 'localizedString',
    }),
    defineField({
      name: 'competitionsMusicDescription',
      title: 'Competitions — Music Section Description',
      type: 'localizedString',
    }),
    defineField({
      name: 'competitions',
      title: 'Competitions',
      type: 'array',
      of: [{ type: 'competition' }],
    }),
    defineField({
      name: 'judges',
      title: 'Competition Judges',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'judge' }] }],
      description: 'Judges for this edition (shared across all competitions)',
    }),

    // ── Tracks / Workshops ────────────────────────────────────────────────────
    defineField({
      name: 'tracks',
      title: 'Workshop Tracks',
      type: 'array',
      of: [{ type: 'trackItem' }],
    }),
    defineField({
      name: 'tracksPageDescription',
      title: 'Tracks Page Description',
      type: 'localizedSimpleText',
    }),
    defineField({
      name: 'levelInfo',
      title: 'Level Info',
      type: 'localizedSimpleText',
      description: 'Paragraph text explaining level placement.',
    }),
    defineField({
      name: 'levelInfoConcepts',
      title: 'Level Info — Required Concepts',
      type: 'localizedSimpleText',
      description: 'Each entry is one concept (e.g. "Bal swing"). Rendered as a bullet list.',
    }),

    // ── Registration ──────────────────────────────────────────────────────────
    defineField({
      name: 'registrationPage',
      title: 'Registration',
      type: 'registrationPageContent',
    }),

    // ── Extras ────────────────────────────────────────────────────────────────
    defineField({
      name: 'extras',
      title: 'Extras (merchandise, breakfast, etc.)',
      type: 'array',
      of: [{ type: 'extraItem' }],
    }),

    // ── Home Page ─────────────────────────────────────────────────────────────
    defineField({
      name: 'homePage',
      title: 'Home Page',
      type: 'homePageContent',
    }),
  ],
  preview: {
    select: { title: 'year', subtitle: 'startDate' },
    prepare: ({ title, subtitle }) => ({
      title: `MTL BAL JAM ${title}`,
      subtitle,
    }),
  },
})
