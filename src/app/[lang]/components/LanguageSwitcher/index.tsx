'use client'
import { usePathname } from 'next/navigation'
import PillRadio from '../PillRadio'
import { Locales } from '@/i18n'

const getSwitchLocaleHref = (lang: Locales, pathname?: string) => {
	if (!pathname) return '/'
	const segments = pathname.split('/')
	segments[1] = lang
	return segments.join('/')
}

export default function LanguageSwitcher({ lang }: { lang: Locales }) {
	const pathname = usePathname()

	return (
		<PillRadio
			options={[
				{
					href: getSwitchLocaleHref('en', pathname),
					name: 'EN',
					active: lang === 'en',
				},
				{
					href: getSwitchLocaleHref('fr', pathname),
					name: 'FR',
					active: lang === 'fr',
				},
			]}
		/>
	)
}
