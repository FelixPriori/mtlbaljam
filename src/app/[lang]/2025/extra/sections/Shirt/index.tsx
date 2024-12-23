import Image from 'next/image'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'
import { Locales } from '@/i18n'

const getDetails = (items: string) =>
	items?.split(',').map(detail => <li key={detail}>{detail}</li>)

type ShirtInstructions =
	keyof DictionaryType['mbj2025']['extrasPage']['shirt']['instructions']

const keys: ShirtInstructions[] = ['register', 'edit', 'contact']

export default function Shirt({
	shirt,
	lang,
}: {
	shirt: DictionaryType['mbj2025']['extrasPage']['shirt']
	lang: Locales
}) {
	const renderInstruction = (key: string) => {
		switch (key) {
			case 'register':
				return (
					<p>
						{shirt.instructions.register.text}{' '}
						{shirt.instructions.register.linkText}
						{/* <a
							rel="noopener noreferrer"
							target="_blank"
							href="https://mtl-bal-jam-2024.dancecamps.org/booking.php"
						>
							{shirt.instructions.register.linkText}
						</a> */}
					</p>
				)
			case 'contact':
				return (
					<p>
						{shirt.instructions.contact.text}{' '}
						<a
							rel="noopener noreferrer"
							target="_blank"
							href="mailto:mtlbaljam@campusbalboa.org"
						>
							{shirt.instructions.contact.linkText}
						</a>
					</p>
				)

			default:
				return <p>{shirt.instructions.edit}</p>
		}
	}

	const creditLink = `<a href="https://raph.xyz/" rel="noopener noreferrer" target="_blank">Raphael</a>`

	return (
		<section className={styles.shirtSection}>
			<h2>{shirt.title}</h2>
			<div className={styles.content}>
				<div className={styles.imageWrapper}>
					<Image
						src={shirt.images.previewSrc}
						width={1000}
						height={1000}
						alt={shirt.images.previewAlt}
					/>
				</div>
				<div className={styles.text}>
					<p>{shirt.price}</p>
					{/* <p className={styles.soldOut}>{shirt.soldOut}</p> */}
					<p className={styles.when}>{shirt.when}</p>
					<div className={styles.description}>
						<p>{shirt.description}</p>
						<ul>{getDetails(shirt.list)}</ul>
						<p
							dangerouslySetInnerHTML={{
								__html: shirt.credit.replace('{{credit}}', creditLink),
							}}
						/>
					</div>
					<div className={styles.instructions}>
						<h3>{shirt.how}</h3>
						<ul className={styles.instructionsList}>
							{keys.map(key => (
								<li key={key}>{renderInstruction(key)}</li>
							))}
							{/* <li className={styles.soldOut}>
								<p>{shirt.instructions.soldOut}</p>
							</li> */}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
