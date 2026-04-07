import { Fragment } from 'react'
import styles from './styles.module.scss'
import { localize } from '@/lib/sanity/localize'
import type { LocalizedStringArray, SanityTrack, SanityLabels } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function Tracks({
	tracks,
	tracksPageDescription,
	labels,
	lang,
}: {
	tracks: SanityTrack[]
	tracksPageDescription: LocalizedStringArray | null
	labels: SanityLabels
	lang: Locales
}) {
	const description = localize(tracksPageDescription, lang)
	return (
		<section className={styles.tracksSection}>
			<h2>{localize(labels?.tracks, lang) ?? 'Tracks'}</h2>
			<div className={styles.content}>
				{description?.map((line) => (
					<p key={line}>{line}</p>
				))}
				{tracks.map((track) => (
					<Fragment key={localize(track.trackName, lang)}>
						<h3>{localize(track.trackName, lang)}</h3>
						{localize(track.trackDescription, lang)?.map((line) => (
							<p key={line}>{line}</p>
						))}
					</Fragment>
				))}
			</div>
		</section>
	)
}
