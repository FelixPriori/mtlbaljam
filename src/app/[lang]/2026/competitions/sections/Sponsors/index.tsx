import styles from './styles.module.scss'
import FeatureCard from '@/app/[lang]/components/FeatureCard'
import { DictionaryType } from '@/app/[lang]/dictionaries'

type SponsorsNames =
	keyof DictionaryType['mbj2025']['competitionsPage']['sponsorsSection']['sponsors']

const keys: SponsorsNames[] = [
	'stardust',
	'balMoment',
	'greatLakes',
	'slowDance',
	'toronto',
]

export default function Sponsors({
	sponsorsSection,
}: {
	sponsorsSection: DictionaryType['mbj2025']['competitionsPage']['sponsorsSection']
}) {
	return (
		<section className={styles.sponsorsSection}>
			<h2 className={styles.title}>{sponsorsSection.title}</h2>
			<div className={styles.content}>
				{keys.map(key => (
					<a
						href={sponsorsSection.sponsors[key].link}
						key={key}
						className={styles.sponsor}
						target="_blank"
						rel="noopener noreferrer"
					>
						<FeatureCard
							key={key}
							name={sponsorsSection.sponsors[key].name}
							image={{
								alt: sponsorsSection.sponsors[key].image.alt,
								src: sponsorsSection.sponsors[key].image.src,
							}}
						/>
					</a>
				))}
			</div>
			<div className={styles.notes}>
				<p>
					{sponsorsSection.notes.text}{' '}
					<a href={sponsorsSection.notes.link.link}>
						{sponsorsSection.notes.link.text}
					</a>
				</p>
			</div>
		</section>
	)
}
