import styles from './styles.module.scss'
import { localize } from '@/lib/sanity/localize'
import type { LocalizedStringArray, SanityLabels } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function LevelSection({
	levelInfo,
	levelInfoConcepts,
	labels,
	lang,
}: {
	levelInfo: LocalizedStringArray | null
	levelInfoConcepts: LocalizedStringArray | null
	labels: SanityLabels
	lang: Locales
}) {
	const lines = localize(levelInfo, lang)
	const concepts = localize(levelInfoConcepts, lang)
	if (!lines?.length && !concepts?.length) return null
	return (
		<section className={styles.levelSection}>
			<h2>{localize(labels?.levelRequirement, lang) ?? (lang === 'fr' ? 'Niveau requis' : 'Level requirement')}</h2>
			<div className={styles.content}>
				<div className={styles.level}>
					{lines?.map((line) => (
						<p key={line}>{line}</p>
					))}
					{concepts && concepts.length > 0 && (
						<ul className={styles.levelList}>
							{concepts.map((concept) => (
								<li key={concept}>{concept}</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</section>
	)
}
