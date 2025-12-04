import { Fragment } from 'react'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Tracks({
	tracksPage,
}: {
	tracksPage: DictionaryType['mbj2026']['tracksPage']
}) {
	return (
		<section className={styles.tracksSection}>
			<h2>{tracksPage.title}</h2>
			<div className={styles.content}>
				<p>{tracksPage.description}</p>
				{tracksPage.tracks.map(track => (
					<Fragment key={track.title}>
						<h3>{track.title}</h3>
						<p>{track.description}</p>
					</Fragment>
				))}
			</div>
		</section>
	)
}
