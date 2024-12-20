import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Protocol({
	protocolSection,
}: {
	protocolSection: DictionaryType['codePage']['protocolSection']
}) {
	const protocolLink = `<a
		target="_blank"
		rel="noopener noreferrer"
		href="${protocolSection.protocolLink}"
	>${protocolSection.protocolText}</a>`

	const reportLink = `<a
			target="_blank"
			rel="noopener noreferrer"
			href="${protocolSection.reportLink}"
		>${protocolSection.reportText}</a>`

	const inclusionEmail = `<a href="mailto:inclusion@campusbalboa.org">inclusion@campusbalboa.org</a>`

	return (
		<section className={styles.protocolSection}>
			<h2 className={styles.title}>{protocolSection.title}</h2>
			<div className={styles.content}>
				{protocolSection.content.map(line => (
					<p
						key={line}
						dangerouslySetInnerHTML={{
							__html: line
								.replace('{{email}}', inclusionEmail)
								.replace('{{protocol}}', protocolLink)
								.replace('{{report}}', reportLink),
						}}
					/>
				))}
			</div>
		</section>
	)
}
