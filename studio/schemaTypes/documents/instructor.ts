import { defineField, defineType } from 'sanity'

export const instructor = defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name as displayed on the site (same in both languages).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'pronouns',
      title: 'Pronouns',
      type: 'string',
    }),
    defineField({
      name: 'cutoutImage',
      title: 'Cutout Image',
      type: 'imageWithAlt',
      description: 'Transparent-background cutout used on the instructors page.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'Full YouTube watch URL for the instructor showcase video.',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Personal website, Instagram, or other profile link.',
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'localizedText',
      description: 'Rich text biography shown on the instructors page.',
    }),
    defineField({
      name: 'schemaDescription',
      title: 'Schema.org Description',
      type: 'string',
      description: 'Short description used in JSON-LD structured data (English only).',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'cutoutImage',
    },
  },
})
