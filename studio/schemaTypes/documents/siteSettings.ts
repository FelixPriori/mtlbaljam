import { defineField, defineType } from 'sanity'

const localizedString = (name: string, title: string) =>
  defineField({ name, title, type: 'localizedString' })

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'string' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'string' }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({
      name: 'labels',
      title: 'UI Labels',
      type: 'object',
      fields: [
        // Competitions
        localizedString('competitions', 'Competitions (section title)'),
        localizedString('judges', 'Judges (section title)'),
        localizedString('price', 'Price (label prefix)'),
        localizedString('format', 'Format (label prefix)'),
        localizedString('when', 'When (label prefix)'),
        // Extra items
        localizedString('soldOut', 'Sold Out'),
        localizedString('howToOrder', 'How to Order (heading)'),
        localizedString('orderWhileRegistering', 'Order method: While registering'),
        localizedString('orderEditRegistration', 'Order method: Edit existing registration'),
        localizedString('orderAtTheEvent', 'Order method: At the event'),
        localizedString('orderContactUs', 'Order method: Contact us'),
        // Registration
        localizedString('registration', 'Registration (section title)'),
        localizedString('registerNow', 'Register Now (button)'),
        localizedString('fullPass', 'Full Pass (fallback label)'),
        localizedString('partyPass', 'Party Pass (fallback label)'),
        localizedString('classPass', 'Class Pass (fallback label)'),
        localizedString('ticketsInclude', 'Tickets Include (heading)'),
        localizedString('helpSomeoneAttend', 'Help Someone Attend (heading)'),
        localizedString('eligibilityAndGuidelines', 'Eligibility and Guidelines (heading)'),
        localizedString('priceCalendar', 'Price Calendar (heading)'),
        localizedString('termsAndConditions', 'Terms & Conditions (heading)'),
        // Tracks
        localizedString('tracks', 'Tracks (section title)'),
        localizedString('levelRequirement', 'Level Requirement (section title)'),
        // Homepage sections
        localizedString('learnMore', 'Learn More (link text)'),
        localizedString('instructors', 'Instructors (section title fallback)'),
        localizedString('music', 'Music (section title fallback)'),
        localizedString('sponsors', 'Sponsors (section title fallback)'),
        localizedString('venue', 'Venue (section title fallback)'),
        localizedString('checkOutOurVenue', 'Check Out Our Venue (link text fallback)'),
        // Visiting
        localizedString('viewFullMap', 'View Full Map (link text)'),
        // About
        localizedString('ourTeam', 'Our Team (section title)'),
        localizedString('currentTeam', 'Current Team (sub-heading)'),
        localizedString('pastTeam', 'Past Team (sub-heading)'),
        // Icon alts
        localizedString('toasterIconAlt', 'Toaster Icon Alt Text'),
        localizedString('archImageAlt', 'Arch Image Alt Text'),
        localizedString('loafIconAlt', 'Loaf Icon Alt Text'),
      ],
    }),
  ],
})
