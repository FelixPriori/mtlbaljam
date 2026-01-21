import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function StrictlySection({
	strictlySection,
}: {
	strictlySection: DictionaryType['mbj2026']['competitionsPage']['strictlySection']
}) {
	return (
		<section className={styles.strictlySection}>
			<h2>{strictlySection.title}</h2>
			<div className={styles.content}>
				<div className={styles.details}>
					<p>
						<span>{strictlySection.information.priceTitle}</span>
						<span>{strictlySection.information.price}</span>
					</p>
					<p>
						<span>{strictlySection.information.formatTitle}</span>
						<span>{strictlySection.information.format}</span>
					</p>
					<p>
						<span>{strictlySection.information.timeTitle}</span>
						<span>{strictlySection.information.time}</span>
					</p>
					<p>{strictlySection.information.description}</p>
				</div>
			</div>
		</section>
	)
}
