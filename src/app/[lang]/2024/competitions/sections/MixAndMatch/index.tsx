import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function MixAndMatch({
	mixAndMatchSection,
}: {
	mixAndMatchSection: DictionaryType['mbj2024']['competitionsPage']['mixAndMatchSection']
}) {
	return (
		<section className={styles.mixAndMatchSection}>
			<div className={styles.competitionNote}>
				<p>{mixAndMatchSection.competitionNote}</p>
			</div>
			<h2>{mixAndMatchSection.title}</h2>
			<div className={styles.content}>
				<p>{mixAndMatchSection.description}</p>
			</div>
		</section>
	)
}
