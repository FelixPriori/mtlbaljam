import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

type HousingData = DictionaryType['travelPage']['housing']

export default function Housing({ housing }: { housing: HousingData }) {
	const couchsurfingLink = `<a
			href="${housing.hotel.link}"
			rel="noreferrer noopener"
			target="_blank"
		>${housing.hotel.linkText}</a>`

	const facebookHousingLink = `
		<a
			href="${housing.community.link}"
			rel="noreferrer noopener"
			target="_blank"
		>${housing.community.linkText}</a>`

	return (
		<section className={styles.housingSection}>
			<h2>{housing.title}</h2>
			<div className={styles.content}>
				<p
					dangerouslySetInnerHTML={{
						__html: housing.hotel.description.replace(
							'{{link}}',
							couchsurfingLink,
						),
					}}
				/>
				<p
					dangerouslySetInnerHTML={{
						__html: housing.community.description.replace(
							'{{link}}',
							facebookHousingLink,
						),
					}}
				/>
			</div>
		</section>
	)
}
