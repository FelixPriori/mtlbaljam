import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Transportation({
	transportation,
}: {
	transportation: DictionaryType['travelPage']['transportation']
}) {
	const opusLink = `<a
			href="${transportation.publicTransit.opus.link}"
			rel="noreferrer noopener"
			target="_blank"
		>${transportation.publicTransit.opus.linkText}</a>`

	const chronoLink = `<a
			href="https://chronoapp.quebec"
			rel="noreferrer noopener"
			target="_blank"
		>Chrono</a>`

	const bixiLink = `<a
			href="${transportation.bixi.link}"
			rel="noreferrer noopener"
			target="_blank"
		>Bixi</a>`

	const parkingLink = `<a
			href="${transportation.car.link}"
			rel="noreferrer noopener"
			target="_blank"
		>${transportation.car.linkText}</a>`

	return (
		<section className={styles.transportationSection}>
			<h2>{transportation.title}</h2>
			<div className={styles.content}>
				<div className={styles.mode}>
					<h3 className={styles.modeTitle}>
						{transportation.publicTransit.title}
					</h3>
					<div className={styles.opus}>
						<p
							dangerouslySetInnerHTML={{
								__html: transportation.publicTransit.opus.description.replace(
									'{{link}}',
									opusLink,
								),
							}}
						/>
					</div>
					<div className={styles.app}>
						<p
							dangerouslySetInnerHTML={{
								__html: transportation.publicTransit.app.description.replace(
									'{{link}}',
									chronoLink,
								),
							}}
						/>
					</div>
				</div>
				<div className={styles.mode}>
					<h3 className={styles.modeTitle}>{transportation.bixi.title}</h3>
					<p
						dangerouslySetInnerHTML={{
							__html: transportation.bixi.description.replace(
								'{{link}}',
								bixiLink,
							),
						}}
					/>
				</div>
				<div className={styles.mode}>
					<h3 className={styles.modeTitle}>{transportation.car.title}</h3>
					<p
						dangerouslySetInnerHTML={{
							__html: transportation.car.description.replace(
								'{{link}}',
								parkingLink,
							),
						}}
					/>
				</div>
			</div>
		</section>
	)
}
