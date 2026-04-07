import { defineField, defineType } from 'sanity'

export const registrationPageContent = defineType({
  name: 'registrationPageContent',
  title: 'Registration Page',
  type: 'object',
  fields: [
    defineField({
      name: 'isOpen',
      title: 'Registration Open',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'registerUrl',
      title: 'Registration URL',
      type: 'url',
    }),
    defineField({
      name: 'fullPassDescription',
      title: 'Full Pass Description',
      type: 'localizedString',
    }),
    defineField({
      name: 'partyPassDescription',
      title: 'Party Pass Description',
      type: 'localizedString',
    }),
    defineField({
      name: 'classPassDescription',
      title: 'Class Pass Description',
      type: 'localizedString',
    }),
    defineField({
      name: 'ticketsDetailsTitle',
      title: 'Tickets Include — Section Title',
      type: 'localizedString',
      description: 'e.g. "Tickets include" / "À l\'achat d\'un laissez-passer"',
    }),
    defineField({
      name: 'fullPassIncludes',
      title: 'Tickets Include — Full Pass',
      type: 'localizedSimpleText',
      description: 'Each entry is one bullet point.',
    }),
    defineField({
      name: 'partyPassIncludes',
      title: 'Tickets Include — Party Pass',
      type: 'localizedSimpleText',
    }),
    defineField({
      name: 'classPassIncludes',
      title: 'Tickets Include — Class Pass',
      type: 'localizedSimpleText',
    }),
    defineField({
      name: 'priceTiers',
      title: 'Price Tiers',
      type: 'array',
      of: [{ type: 'priceTier' }],
      description: 'Add one entry per pricing period (Early Bird, Standard, Late, Door).',
    }),
    defineField({
      name: 'subsidyTitle',
      title: 'Financial Assistance — Section Title',
      type: 'localizedString',
      description: 'e.g. "Help someone attend MTL BAL JAM"',
    }),
    defineField({
      name: 'subsidyInfo',
      title: 'Financial Assistance — Description',
      type: 'localizedSimpleText',
      description: 'Use {{email}} as a placeholder for the contact email link.',
    }),
    defineField({
      name: 'subsidyEligibilityTitle',
      title: 'Financial Assistance — Eligibility Section Title',
      type: 'localizedString',
      description: 'e.g. "Eligibility and Guidelines"',
    }),
    defineField({
      name: 'subsidyEligibility',
      title: 'Financial Assistance — Eligibility Criteria',
      type: 'localizedSimpleText',
      description: 'Bullet-point list of eligibility criteria.',
    }),
    defineField({
      name: 'termsUrl',
      title: 'Terms & Conditions URL',
      type: 'url',
    }),
    defineField({
      name: 'termsLinkText',
      title: 'Terms Link Text',
      type: 'localizedString',
    }),
    defineField({
      name: 'termsContent',
      title: 'Terms & Conditions Body',
      type: 'localizedString',
      description: 'Use {{link}} as a placeholder for the terms link.',
    }),
  ],
})
