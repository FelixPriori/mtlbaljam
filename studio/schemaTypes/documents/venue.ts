import { defineField, defineType } from 'sanity'

export const venue = defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedSimpleText',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'position',
      title: 'Map Position',
      type: 'geoCoordinates',
    }),
    defineField({
      name: 'markerTitle',
      title: 'Map Marker Title',
      type: 'string',
    }),
    defineField({
      name: 'infoWindowText',
      title: 'Map Info Window Text',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address',
      media: 'photo',
    },
  },
})
