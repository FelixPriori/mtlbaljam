'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'

export default function Music() {
	const t = useTranslations('MtlBalJam.2024.competitionsPage.musicSection')
	return (
		<section className={styles.musicSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				<p>{t('description')}</p>
			</div>
		</section>
	)
}
