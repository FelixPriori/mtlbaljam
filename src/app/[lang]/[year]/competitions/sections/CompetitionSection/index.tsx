import styles from './styles.module.scss'
import { localize } from '@/lib/sanity/localize'
import type { SanityCompetition, SanityLabels } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function CompetitionSection({
	competition,
	labels,
	lang,
}: {
	competition: SanityCompetition
	labels: SanityLabels
	lang: Locales
}) {
	return (
		<section className={styles.competitionSection}>
			<h2>{localize(competition.title, lang)}</h2>
			<div className={styles.content}>
				<div className={styles.details}>
					{competition.price && (
						<p>
							<span>{localize(labels?.price, lang) ?? (lang === 'fr' ? 'Prix : ' : 'Price: ')}</span>
							<span>{competition.price}</span>
						</p>
					)}
					{competition.format && (
						<p>
							<span>{localize(labels?.format, lang) ?? (lang === 'fr' ? 'Format : ' : 'Format: ')}</span>
							<span>{localize(competition.format, lang)}</span>
						</p>
					)}
					{competition.when && (
						<p>
							<span>{localize(labels?.when, lang) ?? (lang === 'fr' ? 'Quand : ' : 'When: ')}</span>
							<span>{localize(competition.when, lang)}</span>
						</p>
					)}
					{localize(competition.description, lang)?.map((line) => (
						<p key={line}>{line}</p>
					))}
				</div>
			</div>
		</section>
	)
}
