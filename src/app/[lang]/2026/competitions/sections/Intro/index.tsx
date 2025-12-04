import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Intro({
	competitionsPage,
}: {
	competitionsPage: DictionaryType['mbj2026']['competitionsPage']
}) {
	return (
		<section className={styles.introSection}>
			<h2>{competitionsPage.title}</h2>
			<div className={styles.scheduleNote}>
				<p>{competitionsPage.scheduleNote}</p>
			</div>
			<div className={styles.competitionNote}>
				<p>{competitionsPage.competitionNote}</p>
			</div>
			<h3>{competitionsPage.musicSection.title}</h3>
			<div className={styles.content}>
				<p>{competitionsPage.musicSection.description}</p>
			</div>
		</section>
	)
}
