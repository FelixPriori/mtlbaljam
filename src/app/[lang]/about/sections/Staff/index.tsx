import styles from './styles.module.scss'
import FeatureCard from '@/app/[lang]/components/FeatureCard'
import { DictionaryType } from '@/app/[lang]/dictionaries'

type StaffNames = keyof DictionaryType['aboutPage']['staffSection']['staff']

const keys2025: StaffNames[] = [
	'cara',
	'felix',
	'gab',
	'kim',
	'melanie',
	'sara',
	'sihem',
	'tania',
]

const keys2024: StaffNames[] = ['aronne', 'bree', 'katya', 'zack', 'sophie']

export default function StaffSection({
	staffSection,
}: {
	staffSection: DictionaryType['aboutPage']['staffSection']
}) {
	return (
		<section className={styles.staffSection}>
			<h2 className={styles.title}>{staffSection.title}</h2>
			<div className={styles.content}>
				<h3>2026</h3>
				<div className={styles.cards}>
					{keys2025.map(key => (
						<FeatureCard
							key={key}
							name={staffSection.staff[key].name}
							image={{
								src: staffSection.staff[key].image.src,
								alt: staffSection.staff[key].image.alt,
							}}
							isH4
						>
							<p className={styles.pronouns}>
								{staffSection.staff[key].pronouns}
							</p>
						</FeatureCard>
					))}
				</div>
				<h3>2024, 2025</h3>
				<div className={styles.cards}>
					{keys2024.map(key => (
						<FeatureCard
							key={key}
							name={staffSection.staff[key].name}
							image={{
								src: staffSection.staff[key].image.src,
								alt: staffSection.staff[key].image.alt,
							}}
							isH4
						>
							<p className={styles.pronouns}>
								{staffSection.staff[key].pronouns}
							</p>
						</FeatureCard>
					))}
				</div>
			</div>
		</section>
	)
}
