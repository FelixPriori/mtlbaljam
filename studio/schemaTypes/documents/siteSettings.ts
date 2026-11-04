import { defineField, defineType } from 'sanity'

const localizedString = (name: string, title: string, group: string) =>
  defineField({ name, title, type: 'localizedString', group })

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'social', title: 'Social & Contact', default: true },
    { name: 'edition', title: 'Current Edition' },
    { name: 'labels', title: 'Labels' },
  ],
  fields: [
    defineField({
      name: 'currentEdition',
      title: 'Current Edition',
      type: 'reference',
      to: [{ type: 'eventEdition' }],
      group: 'edition',
      description:
        'The edition shown on the home page (content, Google title, header date). If empty, the newest edition is used.',
    }),
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'string', group: 'social' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'string', group: 'social' }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string', group: 'social' }),
    defineField({ name: 'copyright', title: 'Copyright Notice', type: 'localizedString', group: 'social' }),
    defineField({ name: 'registrationUrl', title: 'Registration URL', type: 'string', group: 'social' }),
    defineField({
      name: 'labels',
      title: 'UI Labels',
      type: 'object',
      group: 'labels',
      groups: [
        { name: 'homepage', title: 'Homepage', default: true },
        { name: 'competitions', title: 'Competitions' },
        { name: 'registration', title: 'Registration' },
        { name: 'orderMethods', title: 'Order Methods' },
        { name: 'schedule', title: 'Schedule' },
        { name: 'tracks', title: 'Tracks' },
        { name: 'about', title: 'About & Team' },
        { name: 'other', title: 'Other' },
      ],
      fields: [
        // Homepage
        localizedString('learnMore', 'Learn More (link text)', 'homepage'),
        localizedString('instructors', 'Instructors (section title fallback)', 'homepage'),
        localizedString('music', 'Music (section title fallback)', 'homepage'),
        localizedString('sponsors', 'Sponsors (section title fallback)', 'homepage'),
        localizedString('venue', 'Venue (section title fallback)', 'homepage'),
        localizedString('checkOutOurVenue', 'Check Out Our Venue (link text fallback)', 'homepage'),
        localizedString('gallery', 'Gallery (page/header title)', 'homepage'),
        localizedString('detailsComingSoon', 'Details Coming Soon (placeholder edition page)', 'homepage'),
        localizedString('toBeAnnounced', 'To Be Announced (instructors, venue, music not confirmed yet)', 'homepage'),
        localizedString('sponsorInvite', 'Sponsor Invite (shown when an edition has no sponsors yet; use {{email}} for the contact email)', 'homepage'),
        localizedString('instructorTbaAlt', 'Instructor TBA Image Alt Text', 'homepage'),
        // Competitions
        localizedString('competitions', 'Competitions (section title)', 'competitions'),
        localizedString('judges', 'Judges (section title)', 'competitions'),
        localizedString('price', 'Price (label prefix)', 'competitions'),
        localizedString('format', 'Format (label prefix)', 'competitions'),
        localizedString('when', 'When (label prefix)', 'competitions'),
        // Registration
        localizedString('registration', 'Registration (section title)', 'registration'),
        localizedString('registerNow', 'Register Now (button)', 'registration'),
        localizedString('registrationOpensOn', 'Registration Opens On (use {{date}} for the date)', 'registration'),
        localizedString('fullPass', 'Full Pass (fallback label)', 'registration'),
        localizedString('partyPass', 'Party Pass (fallback label)', 'registration'),
        localizedString('classPass', 'Class Pass (fallback label)', 'registration'),
        localizedString('ticketsInclude', 'Tickets Include (heading)', 'registration'),
        localizedString('helpSomeoneAttend', 'Help Someone Attend (heading)', 'registration'),
        localizedString('eligibilityAndGuidelines', 'Eligibility and Guidelines (heading)', 'registration'),
        localizedString('priceCalendar', 'Price Calendar (heading)', 'registration'),
        localizedString('termsAndConditions', 'Terms & Conditions (heading)', 'registration'),
        // Order Methods (extras)
        localizedString('soldOut', 'Sold Out', 'orderMethods'),
        localizedString('howToOrder', 'How to Order (heading)', 'orderMethods'),
        localizedString('orderWhileRegistering', 'While registering', 'orderMethods'),
        localizedString('orderEditRegistration', 'Edit existing registration', 'orderMethods'),
        localizedString('orderAtTheEvent', 'At the event', 'orderMethods'),
        localizedString('orderContactUs', 'Contact us', 'orderMethods'),
        // Schedule
        localizedString('schedule', 'Schedule (section title)', 'schedule'),
        localizedString('scheduleSoon', 'Schedule coming soon (placeholder)', 'schedule'),
        // Tracks
        localizedString('tracks', 'Tracks (section title)', 'tracks'),
        localizedString('levelRequirement', 'Level Requirement (section title)', 'tracks'),
        // About & Team
        localizedString('ourTeam', 'Our Team (section title)', 'about'),
        localizedString('currentTeam', 'Current Team (sub-heading)', 'about'),
        localizedString('pastTeam', 'Past Team (sub-heading)', 'about'),
        // Other
        localizedString('viewFullMap', 'View Full Map (link text)', 'other'),
        localizedString('toasterIconAlt', 'Toaster Icon Alt Text', 'other'),
        localizedString('archImageAlt', 'Arch Image Alt Text', 'other'),
        localizedString('loafIconAlt', 'Loaf Icon Alt Text', 'other'),
        localizedString('knifeIconAlt', 'Knife Icon Alt Text', 'other'),
        localizedString('mbjLogoAlt', 'MTL BAL JAM Logo Alt Text', 'other'),
        localizedString('archiveNavLabel', 'Archive Nav Label (e.g. "Archives")', 'other'),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
