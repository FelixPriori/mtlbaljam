import { defineType } from 'sanity'

/** Short single-line text in both languages. */
export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (r) => r.required(),
    },
    {
      name: 'fr',
      title: 'French',
      type: 'string',
      validation: (r) => r.required(),
    },
  ],
  preview: {
    select: { title: 'en', subtitle: 'fr' },
  },
})

/** Array of plain paragraph strings in both languages.
 *  Used for biographies, descriptions, etc. that are currently
 *  stored as string[] in the JSON dictionaries.
 */
export const localizedSimpleText = defineType({
  name: 'localizedSimpleText',
  title: 'Localized Paragraphs',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'fr',
      title: 'French',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
})

/** Full Portable Text (rich text) in both languages.
 *  Use for long-form static page content.
 */
export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Rich Text',
  type: 'object',
  fields: [
    {
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'fr',
      title: 'French',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
})
