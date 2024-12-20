import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function PureBal({
	pureBalSection,
}: {
	pureBalSection: DictionaryType['mbj2025']['competitionsPage']['pureBalSection']
}) {
	return (
		<section className={styles.pureBalSection}>
			<h2>{pureBalSection.title}</h2>
			<div className={styles.content}>
				<div className={styles.details}>
					<p>
						<span>{pureBalSection.information.priceTitle}</span>
						<span>{pureBalSection.information.price}</span>
					</p>
					<p>
						<span>{pureBalSection.information.formatTitle}</span>
						<span>{pureBalSection.information.format}</span>
					</p>
					<p>
						<span>{pureBalSection.information.timeTitle}</span>
						<span>{pureBalSection.information.time}</span>
					</p>
					<p>{pureBalSection.information.description}</p>
				</div>
			</div>
		</section>
	)
}
