import type { Locales } from '@/i18n'

const localeMap: Record<Locales, string> = {
	en: 'en-CA',
	fr: 'fr-CA',
}

export function formatCurrency(amount: number, lang: Locales): string {
	return new Intl.NumberFormat(localeMap[lang], {
		style: 'currency',
		currency: 'CAD',
	}).format(amount)
}
