import Image from 'next/image'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'
import { Locales } from '@/i18n'

const getDetails = (items: string) =>
	items?.split(',').map(detail => <li key={detail}>{detail}</li>)

export default function Bag({
	bag,
}: {
	bag: DictionaryType['mbj2026']['extrasPage']['shoebag']
	lang: Locales
}) {
	const creditLink = `<a href="https://www.instagram.com/youlia.moments/" rel="noopener noreferrer" target="_blank">Youlia</a>`

	return (
		<section className={styles.bagSection}>
			<h2>{bag.title}</h2>
			<div className={styles.content}>
				<div className={styles.imageWrapper}>
					<Image
						src={bag.images.previewSrc}
						width={1000}
						height={1000}
						alt={bag.images.previewAlt}
					/>
				</div>
				<div className={styles.text}>
					<p>{bag.price}</p>
					{/* <p className={styles.soldOut}>{bag.soldOut}</p> */}
					<p className={styles.when}>{bag.when}</p>
					<div className={styles.description}>
						<p>{bag.description}</p>
						<ul>{getDetails(bag.list)}</ul>
						<p
							dangerouslySetInnerHTML={{
								__html: bag.credit.replace('{{credit}}', creditLink),
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
