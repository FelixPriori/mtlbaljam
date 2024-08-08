'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import FeatureCard from '@/app/[locale]/components/FeatureCard'

const keys = ['felix', 'gab', 'david'] as const

export default function DJs() {
	const t = useTranslations('MtlBalJam.2024.musicPage.djMusic')

	return (
		<section className={styles.djSection}>
			<h2 className={styles.title}>{t('title')}</h2>
			<div className={styles.content}>
				{keys.map(key => (
					<FeatureCard
						key={key}
						name={t(`djs.${key}.name`)}
						image={{
							src: t(`djs.${key}.image.src`),
							alt: t(`djs.${key}.image.alt`),
						}}
					>
						<p className={styles.djName}>{t(`djs.${key}.djName`)}</p>
						<p className={styles.pronouns}>{t(`djs.${key}.pronouns`)}</p>
						<p className={styles.biography}>{t(`djs.${key}.biography`)}</p>
					</FeatureCard>
				))}
			</div>
		</section>
	)
}
