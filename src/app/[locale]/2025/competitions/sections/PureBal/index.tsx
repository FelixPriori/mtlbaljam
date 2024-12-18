'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'

export default function PureBal() {
	const t = useTranslations('MtlBalJam.2025.competitionsPage.pureBalSection')
	return (
		<section className={styles.pureBalSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				<div className={styles.details}>
					<p>
						<span>{t('information.priceTitle')}</span>
						<span>{t('information.price')}</span>
					</p>
					<p>
						<span>{t('information.formatTitle')}</span>
						<span>{t('information.format')}</span>
					</p>
					<p>
						<span>{t('information.timeTitle')}</span>
						<span>{t('information.time')}</span>
					</p>
					<p>{t('information.description')}</p>
				</div>
			</div>
		</section>
	)
}
