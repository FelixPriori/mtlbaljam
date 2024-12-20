import styles from './styles.module.scss'
import FeatureCard from '@/app/[lang]/components/FeatureCard'
import { DictionaryType } from '@/app/[lang]/dictionaries'

type JudgeNames =
	keyof DictionaryType['mbj2024']['competitionsPage']['judgesSection']['judges']

const keys: JudgeNames[] = ['yuliasasha']

export default function Judges({
	judgesSection,
}: {
	judgesSection: DictionaryType['mbj2024']['competitionsPage']['judgesSection']
}) {
	return (
		<section className={styles.judgesSection}>
			<h2 className={styles.title}>{judgesSection.title}</h2>
			<div className={styles.content}>
				{keys.map(key => (
					<FeatureCard
						key={key}
						name={judgesSection.judges[key].name}
						image={{
							src: judgesSection.judges[key].image.src,
							alt: judgesSection.judges[key].image.alt,
						}}
					/>
				))}
			</div>
		</section>
	)
}
