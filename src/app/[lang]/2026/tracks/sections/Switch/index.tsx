import { DictionaryType } from '@/app/[lang]/dictionaries'
import styles from './styles.module.scss'

export default function SwitchSection({
	switchSection,
}: {
	switchSection: DictionaryType['mbj2026']['tracksPage']['switch']
}) {
	return (
		<section className={styles.switchSection}>
			<h2>{switchSection.title}</h2>
			<div className={styles.content}>
				<div className={styles.level}>
					{switchSection.content.details.map(line => (
						<p key={line}>{line}</p>
					))}
					<ul className={styles.levelList}>
						<li>{switchSection.content.info.price}</li>
						<li>{switchSection.content.info.when}</li>
					</ul>
				</div>
			</div>
		</section>
	)
}
