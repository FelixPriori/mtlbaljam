'use client'
import { useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import LogoLink from '../../components/LogoLink'
import styles from './styles.module.scss'
import { getPageNameFromSlug } from '@/util/navigationUtils'

export default function Header() {
	const t = useTranslations('MtlBalJam.header')
	const pathname = usePathname()

	const renderText = useCallback(() => {
		const pageName = getPageNameFromSlug(pathname)
		const is2024 = pathname.includes('2024')

		if (pageName) {
			return (
				<>
					<h1>{t(`pageTitle.${pageName}`)}</h1>
					<p className={styles.date}>{is2024 ? t('date2024') : t('date')}</p>
				</>
			)
		}
		return (
			<>
				<h1>{t(`pageTitle.home`)}</h1>
				<p className={styles.date}>{is2024 ? t('date2024') : t('date')}</p>
			</>
		)
	}, [pathname, t])

	return (
		<header className={styles.headerSection}>
			<LogoLink />
			<div className={styles.text}>
				<p className={styles.eventTitle}>{t('title')}</p>
				{renderText()}
				{/* <RegisterNow /> */}
			</div>
		</header>
	)
}
