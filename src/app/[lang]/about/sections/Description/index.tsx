import Image from 'next/image'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Staff({
	aboutPage,
	landAcknowledgement,
	iconAlts,
}: {
	aboutPage: DictionaryType['aboutPage']
	landAcknowledgement: DictionaryType['landAcknowledgement']
	iconAlts: DictionaryType['iconAlts']
}) {
	const campusLink = `<a
			className={styles.link}
			href="https://www.campusbalboa.org/"
			target="_blank"
			rel="noopener noreferrer"
		>Campus Balboa</a>`

	return (
		<section className={styles.descriptionSection}>
			<h2>{aboutPage.descriptionSection.title}</h2>
			<div className={styles.content}>
				{aboutPage.descriptionSection.description.map(line => (
					<p
						key={line}
						dangerouslySetInnerHTML={{
							__html: line.replace('{{campus}}', campusLink),
						}}
					/>
				))}
			</div>
			<h2>{landAcknowledgement.title}</h2>
			<div className={styles.content}>
				<p>{landAcknowledgement.text}</p>
			</div>
			<div className={styles.logoContainer}>
				<Image
					src="/mtl-bal-jam-logo-white.png"
					height={1584}
					width={1584}
					alt={iconAlts.mbjLogo}
				/>
			</div>
		</section>
	)
}
