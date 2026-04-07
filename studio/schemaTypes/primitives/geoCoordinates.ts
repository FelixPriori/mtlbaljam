import { defineType } from 'sanity'

/** Latitude / longitude pair for Google Maps integration. */
export const geoCoordinates = defineType({
  name: 'geoCoordinates',
  title: 'Geo Coordinates',
  type: 'object',
  fields: [
    {
      name: 'lat',
      title: 'Latitude',
      type: 'string',
      validation: (r) => r.required(),
    },
    {
      name: 'lng',
      title: 'Longitude',
      type: 'string',
      validation: (r) => r.required(),
    },
  ],
  preview: {
    select: { title: 'lat', subtitle: 'lng' },
  },
})
