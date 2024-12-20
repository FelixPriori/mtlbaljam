export const locales = ['en', 'fr']

export const i18n = {
	defaultLocale: 'en',
	locales,
} as const

export type Locale = (typeof i18n)['locales'][number]

export type Locales = 'en' | 'fr'
