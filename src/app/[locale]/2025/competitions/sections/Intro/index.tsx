'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'

export default function Intro() {
	const t = useTranslations('MtlBalJam.2025.competitionsPage')
	return (
		<section className={styles.introSection}>
			<h2>{t('title')}</h2>
			<div className={styles.competitionNote}>
				<p>{t('competitionNote')}</p>
			</div>
			<h3>{t('musicSection.title')}</h3>
			<div className={styles.content}>
				<p>{t('musicSection.description')}</p>
			</div>
		</section>
	)
}
