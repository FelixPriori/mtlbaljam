import { format, parseISO } from 'date-fns'
import { enCA, frCA } from 'date-fns/locale'
import type { Locales } from '@/i18n'
import { localize } from '@/lib/sanity/localize'

export function isEditionListed(edition: { navPages?: unknown[] | null }) {
	return (edition.navPages?.length ?? 0) > 0
}

export function getHomeYear(
	editions: { year: number | null }[],
	currentEditionYear: number | null | undefined,
): number | null {
	if (currentEditionYear != null) return currentEditionYear
	return editions.find(e => e.year != null)?.year ?? null
}

export function registrationOpensText(label: string | null | undefined, date: string, lang: Locales) {
	const template =
		label ?? (lang === 'fr' ? 'Les inscriptions ouvrent le {{date}}.' : 'Registration opens on {{date}}.')
	return template.replace('{{date}}', formatEditionDate(date, lang))
}

export function toBeAnnounced(
	labels: { toBeAnnounced?: { en: string | null; fr: string | null } | null } | null | undefined,
	lang: Locales,
) {
	return localize(labels?.toBeAnnounced, lang) ?? (lang === 'fr' ? 'À venir' : 'To be announced')
}

export function showRegistrationOpensOn(isOpen: boolean | null | undefined, openDate: string | null | undefined) {
	if (isOpen || !openDate) return false
	const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto' }).format(new Date())
	return openDate >= today
}

export function formatEditionDate(date: string, lang: Locales) {
	return lang === 'fr'
		? format(parseISO(date), 'd MMMM yyyy', { locale: frCA })
		: format(parseISO(date), 'MMMM d, yyyy', { locale: enCA })
}
