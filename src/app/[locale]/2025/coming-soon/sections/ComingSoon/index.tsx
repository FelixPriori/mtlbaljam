'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'

export default function ComingSoon() {
	const t = useTranslations('MtlBalJam.2025.comingSoon')

	return (
		<section className={styles.comingSoonSection}>
			<h2 className={styles.title}>{t('title')}</h2>
			<div className={styles.content}>
				<p className={styles.saveTheDate}>{t('saveTheDate')}</p>
			</div>
		</section>
	)
}
