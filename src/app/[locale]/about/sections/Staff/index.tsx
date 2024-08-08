'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import FeatureCard from '@/app/[locale]/components/FeatureCard'

const keys2025 = [
	'bree',
	'cara',
	'felix',
	'gab',
	'kim',
	'melanie',
	'sara',
	'sihem',
	'sophie',
	'tania',
]

const keys2024 = ['aronne', 'katya', 'zack']

export default function StaffSection() {
	const t = useTranslations('MtlBalJam.aboutPage.staffSection')

	return (
		<section className={styles.staffSection}>
			<h2 className={styles.title}>{t('title')}</h2>
			<div className={styles.content}>
				<h3>2025 & 2024</h3>
				<div className={styles.cards}>
					{keys2025.map(key => (
						<FeatureCard
							key={key}
							name={t(`staff.${key}.name`)}
							image={{
								src: t(`staff.${key}.image.src`),
								alt: t(`staff.${key}.image.alt`),
							}}
							isH4
						>
							<p className={styles.pronouns}>{t(`staff.${key}.pronouns`)}</p>
						</FeatureCard>
					))}
				</div>
				<h3>2024</h3>
				<div className={styles.cards}>
					{keys2024.map(key => (
						<FeatureCard
							key={key}
							name={t(`staff.${key}.name`)}
							image={{
								src: t(`staff.${key}.image.src`),
								alt: t(`staff.${key}.image.alt`),
							}}
							isH4
						>
							<p className={styles.pronouns}>{t(`staff.${key}.pronouns`)}</p>
						</FeatureCard>
					))}
				</div>
			</div>
		</section>
	)
}
