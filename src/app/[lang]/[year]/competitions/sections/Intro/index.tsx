import styles from './styles.module.scss'
import { localize } from '@/lib/sanity/localize'
import type { LocalizedString, SanityLabels } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function Intro({
	scheduleNote,
	competitionNote,
	musicTitle,
	musicDescription,
	labels,
	lang,
}: {
	scheduleNote: LocalizedString | null
	competitionNote: LocalizedString | null
	musicTitle: LocalizedString | null
	musicDescription: LocalizedString | null
	labels: SanityLabels
	lang: Locales
}) {
	if (!scheduleNote && !competitionNote && !musicTitle && !musicDescription) return null
	return (
		<section className={styles.introSection}>
			<h2>{localize(labels?.competitions, lang) ?? (lang === 'fr' ? 'Compétitions' : 'Competitions')}</h2>
			{scheduleNote && (
				<div className={styles.scheduleNote}>
					<p>{localize(scheduleNote, lang)}</p>
				</div>
			)}
			{competitionNote && (
				<div className={styles.competitionNote}>
					<p>{localize(competitionNote, lang)}</p>
				</div>
			)}
			{musicTitle && <h3>{localize(musicTitle, lang)}</h3>}
			{musicDescription && (
				<div className={styles.content}>
					<p>{localize(musicDescription, lang)}</p>
				</div>
			)}
		</section>
	)
}
