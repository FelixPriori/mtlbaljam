import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function MixAndMatch({
	mixAndMatchSection,
}: {
	mixAndMatchSection: DictionaryType['mbj2025']['competitionsPage']['mixAndMatchSection']
}) {
	return (
		<section className={styles.mixAndMatchSection}>
			<h2>{mixAndMatchSection.title}</h2>
			<div className={styles.content}>
				<div className={styles.details}>
					<p>
						<span>{mixAndMatchSection.information.priceTitle}</span>
						<span>{mixAndMatchSection.information.price}</span>
					</p>
					<h3>{mixAndMatchSection.information.prelims.title}</h3>
					<p>
						<span>{mixAndMatchSection.information.prelims.timeTitle}</span>
						<span>{mixAndMatchSection.information.prelims.time}</span>
					</p>
					<p>
						<span>{mixAndMatchSection.information.prelims.bpmTitle}</span>
						<span>{mixAndMatchSection.information.prelims.bpm}</span>
					</p>
					<p>{mixAndMatchSection.information.prelims.description}</p>
					<h3>{mixAndMatchSection.information.finals.title}</h3>
					<p>
						<span>{mixAndMatchSection.information.finals.timeTitle}</span>
						<span>{mixAndMatchSection.information.finals.time}</span>
					</p>
					<p>
						<span>{mixAndMatchSection.information.finals.bpmTitle}</span>
						<span>{mixAndMatchSection.information.finals.bpm}</span>
					</p>
					<p>{mixAndMatchSection.information.finals.description}</p>
				</div>
			</div>
		</section>
	)
}
