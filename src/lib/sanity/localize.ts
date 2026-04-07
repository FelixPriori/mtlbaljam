import type { Locales } from '@/i18n'

/**
 * Resolve a localized field object to the value for the current locale,
 * falling back to English if the French value is missing.
 *
 * Usage:
 *   localize(instructor.biography, lang)  // returns string[] for current lang
 *   localize(venue.name, lang)            // returns string for current lang
 */
export function localize<T>(
  field: { en: T; fr: T } | null | undefined,
  lang: Locales,
): T | null {
  if (!field) return null
  return field[lang] ?? field.en
}
