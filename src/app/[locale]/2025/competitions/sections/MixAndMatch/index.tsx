'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'

export default function MixAndMatch() {
	const t = useTranslations(
		'MtlBalJam.2025.competitionsPage.mixAndMatchSection',
	)
	return (
		<section className={styles.mixAndMatchSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				<div className={styles.details}>
					<p>
						<span>{t('information.priceTitle')}</span>
						<span>{t('information.price')}</span>
					</p>
					<h3>{t('information.prelims.title')}</h3>
					<p>
						<span>{t('information.prelims.timeTitle')}</span>
						<span>{t('information.prelims.time')}</span>
					</p>
					<p>
						<span>{t('information.prelims.bpmTitle')}</span>
						<span>{t('information.prelims.bpm')}</span>
					</p>
					<p>{t('information.prelims.description')}</p>
					<h3>{t('information.finals.title')}</h3>
					<p>
						<span>{t('information.finals.timeTitle')}</span>
						<span>{t('information.finals.time')}</span>
					</p>
					<p>
						<span>{t('information.finals.bpmTitle')}</span>
						<span>{t('information.finals.bpm')}</span>
					</p>
					<p>{t('information.finals.description')}</p>
				</div>
			</div>
		</section>
	)
}
