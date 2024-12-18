'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import FeatureCard from '@/app/[locale]/components/FeatureCard'

const keys = ['stardust'] as const

export default function Sponsors() {
	const t = useTranslations('MtlBalJam.2025.competitionsPage.sponsorsSection')
	return (
		<section className={styles.sponsorsSection}>
			<h2 className={styles.title}>{t('title')}</h2>
			<div className={styles.content}>
				{keys.map(key => (
					<a
						href={t(`sponsors.${key}.link`)}
						key={key}
						className={styles.sponsor}
						target="_blank"
						rel="noopener noreferrer"
					>
						<FeatureCard
							key={key}
							name={t(`sponsors.${key}.name`)}
							image={{
								alt: t(`sponsors.${key}.image.alt`),
								src: t(`sponsors.${key}.image.src`),
							}}
						/>
					</a>
				))}
			</div>
			<div className={styles.notes}>
				<p>
					{t('notes.text')}{' '}
					<a href={t('notes.link.link')}>{t('notes.link.text')}</a>
				</p>
			</div>
		</section>
	)
}
