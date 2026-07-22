import { defineField, defineType } from 'sanity'

export const album = defineType({
  name: 'album',
  title: 'Photo Album',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'Festival edition this album is from. Used to group albums on the gallery page.',
      validation: (r) => r.required().integer(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Photographer or contributor credit.',
    }),
    defineField({
      name: 'authorUrl',
      title: 'Author Link',
      type: 'url',
      description: 'Link to the photographer/contributor\'s website or portfolio.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'imageWithAlt',
      description: 'Shown as the album thumbnail. Defaults to the first photo if left empty.',
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'imageWithAlt' }],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title.en', year: 'year', author: 'author', media: 'coverImage', photos: 'photos' },
    prepare: ({ title, year, author, media, photos }) => ({
      title: `${title} (${year})`,
      subtitle: [author, `${photos?.length ?? 0} photo${photos?.length === 1 ? '' : 's'}`].filter(Boolean).join(' — '),
      media,
    }),
  },
})
