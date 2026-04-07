import { defineField, defineType } from 'sanity'

export const priceTier = defineType({
  name: 'priceTier',
  title: 'Price Tier',
  type: 'object',
  fields: [
    defineField({
      name: 'dateLabel',
      title: 'Date Label',
      type: 'localizedString',
      description: 'e.g. "Before Feb 28" / "Avant le 28 fév"',
    }),
    defineField({
      name: 'endDate',
      title: 'Tier End Date',
      type: 'date',
      description: 'Leave blank for the door price tier.',
    }),
    defineField({
      name: 'fullPassPrice',
      title: 'Full Pass Price',
      type: 'string',
    }),
    defineField({
      name: 'partyPassPrice',
      title: 'Party Pass Price',
      type: 'string',
    }),
    defineField({
      name: 'classPassPrice',
      title: 'Class Pass Price',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'dateLabel.en', subtitle: 'fullPassPrice' },
  },
})
