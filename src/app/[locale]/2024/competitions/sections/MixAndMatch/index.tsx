'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'

export default function MixAndMatch() {
	const t = useTranslations(
		'MtlBalJam.2024.competitionsPage.mixAndMatchSection',
	)
	return (
		<section className={styles.mixAndMatchSection}>
			<div className={styles.competitionNote}>
				<p>{t('competitionNote')}</p>
			</div>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				<p>{t('description')}</p>
			</div>
		</section>
	)
}
