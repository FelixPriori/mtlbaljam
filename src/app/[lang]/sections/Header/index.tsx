'use client'
import { useCallback } from 'react'
import { usePathname } from 'next/navigation'
import LogoLink from '../../components/LogoLink'
import styles from './styles.module.scss'
import { getPageNameFromSlug } from '@/util/navigationUtils'
import { DictionaryType } from '../../dictionaries'

type PageName = keyof DictionaryType['header']['pageTitle']

export default function Header({
	header,
	iconAlts,
}: {
	header: DictionaryType['header']
	iconAlts: DictionaryType['iconAlts']
}) {
	const pathname = usePathname()

	const renderText = useCallback(() => {
		const pageName = getPageNameFromSlug(pathname) as PageName
		const is2024 = pathname.includes('2024')

		if (pageName) {
			return (
				<>
					<h1>{header.pageTitle[pageName]}</h1>
					<p className={styles.date}>
						{is2024 ? header.date2024 : header.date}
					</p>
				</>
			)
		}
		return (
			<>
				<h1>{header.pageTitle.home}</h1>
				<p className={styles.date}>{is2024 ? header.date2024 : header.date}</p>
			</>
		)
	}, [header.date, header.date2024, header.pageTitle, pathname])

	return (
		<header className={styles.headerSection}>
			<LogoLink iconAlts={iconAlts} />
			<div className={styles.text}>
				<p className={styles.eventTitle}>{header.title}</p>
				{renderText()}
			</div>
		</header>
	)
}
