'use client'
import { useCallback } from 'react'
import { usePathname } from 'next/navigation'
import LogoLink from '../../components/LogoLink'
import styles from './styles.module.scss'
import { getPageNameFromSlug } from '@/util/navigationUtils'
import type { Locales } from '@/i18n'

const HEADER_TITLES: Record<Locales, Record<string, string>> = {
	en: {
		home: 'Home',
		music: 'Music',
		about: 'About',
		venue: 'Venue',
		instructors: 'Instructors',
		extra: 'Extra',
		competitions: 'Competitions',
		'code-of-conduct': 'Code of Conduct',
		registration: 'Registration',
		schedule: 'Schedule',
		visiting: 'Visiting Montréal / Tiohtià:ke',
		travel: 'Travel',
		accommodation: 'Accommodation',
		volunteering: 'Volunteering',
		'coming-soon': 'Coming Soon',
		tracks: 'Workshops',
	},
	fr: {
		home: 'Accueil',
		music: 'Musique',
		about: 'À propos',
		venue: 'Lieux',
		instructors: 'Instructeurs',
		extra: 'Extra',
		competitions: 'Compétitions',
		'code-of-conduct': 'Code de conduite',
		registration: 'Inscriptions',
		schedule: 'Horaire',
		visiting: 'Visiter Montréal / Tiohtià:ke',
		travel: 'Voyagement',
		accommodation: 'Hébergement',
		volunteering: 'Bénévolat',
		'coming-soon': 'À venir',
		tracks: 'Ateliers',
	},
}

type HeaderProps = {
	datesMap: Record<number, string>
	registrationUrl: string
	registerNow: string
	logoAlt: string
	lang: Locales
}

export default function Header({
	datesMap,
	registrationUrl,
	registerNow,
	logoAlt,
	lang,
}: HeaderProps) {
	const pathname = usePathname()

	const renderText = useCallback(() => {
		const pageName = getPageNameFromSlug(pathname)
		const segments = pathname.split('/')
		const yearInPath = segments.find(s => /^\d{4}$/.test(s))
		const year = yearInPath ? parseInt(yearInPath) : new Date().getFullYear()
		const displayDate = datesMap[year] ?? ''

		const isYearHomePage = /^\d{4}$/.test(pageName)
		const h1 = isYearHomePage ? pageName : (HEADER_TITLES[lang][pageName] ?? HEADER_TITLES[lang].home)

		return (
			<>
				<p className={styles.date}>{displayDate}</p>
				<h1>{h1}</h1>
				{registrationUrl && (
					<a
						className={styles.registerNow}
						href={registrationUrl}
						rel="noreferrer noopener"
						target="_blank"
					>
						{registerNow}
					</a>
				)}
			</>
		)
	}, [datesMap, lang, pathname, registerNow, registrationUrl])

	return (
		<header className={styles.headerSection}>
			<LogoLink logoAlt={logoAlt} />
			<div className={styles.text}>
				<p className={styles.eventTitle}>MTL BAL JAM</p>
				{renderText()}
			</div>
		</header>
	)
}
