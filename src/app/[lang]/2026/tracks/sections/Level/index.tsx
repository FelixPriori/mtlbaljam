import { DictionaryType } from '@/app/[lang]/dictionaries'
import styles from './styles.module.scss'
const getDetails = (items: string) =>
	items?.split(',').map(detail => <li key={detail}>{detail}</li>)

export default function LevelSection({
	levelSection,
}: {
	levelSection: DictionaryType['mbj2026']['tracksPage']['level']
}) {
	return (
		<section className={styles.levelSection}>
			<h2>{levelSection.title}</h2>
			<div className={styles.content}>
				<div className={styles.level}>
					{levelSection.content.details.map(line => (
						<p key={line}>{line}</p>
					))}
					<ul className={styles.levelList}>
						{getDetails(levelSection.content.list)}
					</ul>
				</div>
			</div>
		</section>
	)
}
