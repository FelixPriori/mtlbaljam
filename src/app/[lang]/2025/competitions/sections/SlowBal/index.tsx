import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function SlowBal({
	slowBalSection,
}: {
	slowBalSection: DictionaryType['mbj2025']['competitionsPage']['slowBalSection']
}) {
	return (
		<section className={styles.slowBalSection}>
			<h2>{slowBalSection.title}</h2>
			<div className={styles.content}>
				<div className={styles.details}>
					<p>
						<span>{slowBalSection.information.priceTitle}</span>
						<span>{slowBalSection.information.price}</span>
					</p>
					<p>
						<span>{slowBalSection.information.formatTitle}</span>
						<span>{slowBalSection.information.format}</span>
					</p>
					<p>
						<span>{slowBalSection.information.timeTitle}</span>
						<span>{slowBalSection.information.time}</span>
					</p>
					<p>{slowBalSection.information.description}</p>
				</div>
			</div>
		</section>
	)
}
