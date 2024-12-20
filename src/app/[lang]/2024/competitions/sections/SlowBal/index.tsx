import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function SlowBal({
	slowBalSection,
}: {
	slowBalSection: DictionaryType['mbj2024']['competitionsPage']['slowBalSection']
}) {
	return (
		<section className={styles.mixAndMatchSection}>
			<h2>{slowBalSection.title}</h2>
			<div className={styles.content}>
				{slowBalSection.description.map(line => (
					<p key={line}>{line}</p>
				))}
			</div>
		</section>
	)
}
