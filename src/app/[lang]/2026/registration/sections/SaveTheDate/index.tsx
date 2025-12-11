import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function SaveTheDate({
	registrationPage,
}: {
	registrationPage: DictionaryType['mbj2026']['registrationPage']
}) {
	return (
		<section className={styles.saveTheDateSection}>
			<h2>{registrationPage.title}</h2>
			<div className={styles.content}>
				<div className={styles.annoucementBox}>
					<p>{registrationPage.registrationClosed}</p>
					{/* <a
						className={styles.registerNow}
						href="https://mtlbaljam2025.dancecamps.org/booking.php"
						rel="noreferrer noopener"
						target="_blank"
					>
						{registrationPage.registerNow}
					</a> */}
				</div>
			</div>
		</section>
	)
}
