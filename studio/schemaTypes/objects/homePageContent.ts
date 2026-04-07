import { defineField, defineType } from 'sanity'

export const homePageContent = defineType({
  name: 'homePageContent',
  title: 'Home Page',
  type: 'object',
  fields: [
    // ── Instructor section ────────────────────────────────────────────────────
    defineField({
      name: 'instructorSectionTitle',
      title: 'Instructor Section Title',
      type: 'localizedString',
      description: 'e.g. "Instructors"',
    }),
    defineField({
      name: 'instructorLinkText',
      title: 'Instructor Link Text',
      type: 'localizedString',
      description: 'e.g. "Learn more..."',
    }),
    defineField({
      name: 'featuredInstructorGroups',
      title: 'Featured Instructor Groups',
      type: 'array',
      of: [{ type: 'instructorGroup' }],
      description: 'Each entry is one instructor pair card on the homepage.',
    }),

    // ── Music section ─────────────────────────────────────────────────────────
    defineField({
      name: 'musicSectionTitle',
      title: 'Music Section Title',
      type: 'localizedString',
      description: 'e.g. "Music"',
    }),
    defineField({
      name: 'musicLearnMoreText',
      title: 'Music — Learn More Link Text',
      type: 'localizedString',
      description: 'e.g. "Learn more..."',
    }),

    // ── Venue section ─────────────────────────────────────────────────────────
    defineField({
      name: 'venueSectionTitle',
      title: 'Venue Section Title',
      type: 'localizedString',
      description: 'e.g. "Venue"',
    }),
    defineField({
      name: 'venueLearnMoreText',
      title: 'Venue — Learn More Link Text',
      type: 'localizedString',
      description: 'e.g. "Check out our venue..."',
    }),

    // ── Sponsors section ──────────────────────────────────────────────────────
    defineField({
      name: 'sponsorSectionTitle',
      title: 'Sponsor Section Title',
      type: 'localizedString',
      description: 'e.g. "Sponsors"',
    }),
    defineField({
      name: 'featuredSponsors',
      title: 'Featured Sponsors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sponsor' }] }],
      description: 'Which sponsor logos appear in the homepage grid.',
    }),
    defineField({
      name: 'sponsorNoteText',
      title: 'Sponsor Note Text',
      type: 'localizedString',
      description: 'e.g. "You want to sponsor MTL BAL JAM? Reach out to us at mtlbaljam@campusbalboa.org"',
    }),
  ],
})
