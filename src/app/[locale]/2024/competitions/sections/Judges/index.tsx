'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import FeatureCard from '@/app/[locale]/components/FeatureCard'

const keys = ['yuliasasha'] as const

export default function Judges() {
	const t = useTranslations('MtlBalJam.2024.competitionsPage.judgesSection')

	return (
		<section className={styles.judgesSection}>
			<h2 className={styles.title}>{t('title')}</h2>
			<div className={styles.content}>
				{keys.map(key => (
					<FeatureCard
						key={key}
						name={t(`judges.${key}.name`)}
						image={{
							src: t(`judges.${key}.image.src`),
							alt: t(`judges.${key}.image.alt`),
						}}
					/>
				))}
			</div>
		</section>
	)
}
