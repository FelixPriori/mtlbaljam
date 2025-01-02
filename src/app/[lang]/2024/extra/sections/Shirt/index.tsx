import Image from 'next/image'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'
import ENSoldOut from '@/../public/mbj-shirt-sold-out-en.png'
import FRSoldOut from '@/../public/mbj-shirt-sold-out-fr.png'
import { Locales } from '@/i18n'

const getDetails = (items: string) =>
	items?.split(',').map(detail => <li key={detail}>{detail}</li>)

type ShirtInstructions =
	keyof DictionaryType['mbj2024']['extrasPage']['shirt']['instructions']

const keys: ShirtInstructions[] = ['register', 'edit', 'contact']

export default function Shirt({
	shirt,
	lang,
}: {
	shirt: DictionaryType['mbj2024']['extrasPage']['shirt']
	lang: Locales
}) {
	const renderInstruction = (key: string) => {
		switch (key) {
			case 'register':
				return (
					<p>
						{shirt.instructions.register.text}
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

	return (
		<section className={styles.shirtSection}>
			<h2>{shirt.title}</h2>
			<div className={styles.content}>
				<div className={styles.imageWrapper}>
					<Image
						src={lang === 'fr' ? FRSoldOut : ENSoldOut}
						width={1080}
						height={1080}
						alt={shirt.imageAlt}
					/>
				</div>
				<div className={styles.text}>
					<p className={styles.soldOutPrice}>{shirt.price}</p>
					<p className={styles.soldOut}>{shirt.soldOut}</p>
					<p className={styles.when}>{shirt.when}</p>
					<div className={styles.description}>
						<p>{shirt.description}</p>
						<ul>{getDetails(shirt.list)}</ul>
						<p>
							{shirt.credit.map(line => {
								if (line === 'Youlia') {
									return (
										<a
											key={line}
											href={shirt.link}
											rel="noopener noreferrer"
											target="_blank"
										>
											{line}
										</a>
									)
								}
								return <span key={line}>{line}</span>
							})}
						</p>
					</div>
					<div className={styles.instructions}>
						<h3>{shirt.how}</h3>
						<ul className={styles.instructionsList}>
							{keys.map(key => (
								<li key={key} className={styles.soldOutPrice}>
									{renderInstruction(key)}
								</li>
							))}
							<li className={styles.soldOut}>
								<p>{shirt.instructions.soldOut}</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
