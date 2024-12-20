import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function SaveTheDate({
	registrationPage,
}: {
	registrationPage: DictionaryType['mbj2025']['registrationPage']
}) {
	return (
		<section className={styles.saveTheDateSection}>
			<h2>{registrationPage.title}</h2>
			<div className={styles.content}>
				<div className={styles.annoucementBox}>
					<p>{registrationPage.registrationSave.subtitle}</p>
					<h3>{registrationPage.registrationSave.date}</h3>
					<p>{registrationPage.registrationSave.text}</p>
				</div>
			</div>
		</section>
	)
}
