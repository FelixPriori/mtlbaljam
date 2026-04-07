import { defineType } from 'sanity'

/** A Sanity image asset with a localized alt text field. */
export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image with Alt Text',
  type: 'image',
  options: { hotspot: true },
  fields: [
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'localizedString',
      validation: (r) => r.required(),
    },
  ],
  preview: {
    select: {
      media: 'asset',
      title: 'alt.en',
    },
  },
})
