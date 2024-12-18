'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'

export default function SaveTheDate() {
	const t = useTranslations('MtlBalJam.2025.registrationPage')
	return (
		<section className={styles.saveTheDateSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				<div className={styles.annoucementBox}>
					<p>{t('registrationSave.subtitle')}</p>
					<h3>{t('registrationSave.date')}</h3>
					<p>{t('registrationSave.text')}</p>
				</div>
			</div>
		</section>
	)
}
