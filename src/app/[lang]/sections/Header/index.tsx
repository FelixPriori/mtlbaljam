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
					<p className={styles.date}>
						{is2024 ? header.date2024 : header.date}
					</p>
					<h1>{header.pageTitle[pageName]}</h1>
					<div className={styles.registrationOpens}>
						<p>
							{header.registration.text} {header.registration.date}
						</p>
					</div>
					{/* <p>{header.registrationClosed}</p> */}
					{/* <a
						className={styles.registerNow}
						href="https://mtlbaljam2025.dancecamps.org/booking.php"
						rel="noreferrer noopener"
						target="_blank"
					>
						{header.registerNow}
					</a> */}
				</>
			)
		}
		return (
			<>
				<p className={styles.date}>{is2024 ? header.date2024 : header.date}</p>
				<h1>{header.pageTitle.home}</h1>
				<div className={styles.registrationOpens}>
					<p>
						{header.registration.text} {header.registration.date}
					</p>
				</div>
				{/* <p>{header.registrationClosed}</p> */}

				{/* <a
					className={styles.registerNow}
					href="https://mtlbaljam2025.dancecamps.org/booking.php"
					rel="noreferrer noopener"
					target="_blank"
				>
					{header.registerNow}
				</a> */}
			</>
		)
	}, [
		header.date,
		header.date2024,
		header.pageTitle,
		header.registration.date,
		header.registration.text,
		pathname,
	])

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
