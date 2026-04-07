import { defineField, defineType } from 'sanity'

const PAGE_KEYS = [
  { title: 'About', value: 'about' },
  { title: 'Code of Conduct', value: 'code-of-conduct' },
  { title: 'Travel Guide', value: 'travel' },
  { title: 'Visiting Guide', value: 'visiting' },
  { title: 'Volunteering', value: 'volunteering' },
]

export const staticPage = defineType({
  name: 'staticPage',
  title: 'Static Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageKey',
      title: 'Page',
      type: 'string',
      options: { list: PAGE_KEYS, layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localizedText',
      description: 'Full page body in both languages (Portable Text / rich text).',
    }),
    // ── Visiting page extras ──────────────────────────────────────────────
    defineField({
      name: 'foodSectionImage',
      title: 'Food & Drinks Image (Visiting page)',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'sightseeingSectionImage',
      title: 'Sightseeing Image (Visiting page)',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Map URL (Visiting page)',
      type: 'string',
    }),
    defineField({
      name: 'mapLabel',
      title: 'Map Link Label (Visiting page)',
      type: 'localizedString',
    }),
  ],
  preview: {
    select: { title: 'pageKey' },
    prepare: ({ title }) => ({
      title: PAGE_KEYS.find((k) => k.value === title)?.title ?? title,
    }),
  },
})
