import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Music({
	musicSection,
}: {
	musicSection: DictionaryType['mbj2024']['competitionsPage']['musicSection']
}) {
	return (
		<section className={styles.musicSection}>
			<h2>{musicSection.title}</h2>
			<div className={styles.content}>
				<p>{musicSection.description}</p>
			</div>
		</section>
	)
}
