import Image from 'next/image'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

const getDetails = (items: string) =>
	items?.split(',').map(detail => <li key={detail}>{detail}</li>)

type TowelInstructions =
	keyof DictionaryType['mbj2026']['extrasPage']['towel']['instructions']

const keys: TowelInstructions[] = ['register', 'edit', 'contact']

export default function Towel({
	towel,
}: {
	towel: DictionaryType['mbj2026']['extrasPage']['towel']
}) {
	const renderInstruction = (key: string) => {
		switch (key) {
			case 'register':
				return (
					<p>
						{towel.instructions.register.text}{' '}
						{towel.instructions.register.linkText}
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
						{towel.instructions.contact.text}{' '}
						<a
							rel="noopener noreferrer"
							target="_blank"
							href="mailto:mtlbaljam@campusbalboa.org"
						>
							{towel.instructions.contact.linkText}
						</a>
					</p>
				)

			default:
				return <p>{towel.instructions.edit}</p>
		}
	}
	return (
		<section className={styles.towelSection}>
			<h2>{towel.title}</h2>
			<div className={styles.content}>
				<div className={styles.imageWrapper}>
					<Image
						src={towel.images.previewSrc}
						width={1000}
						height={1000}
						alt={towel.images.previewAlt}
					/>
				</div>
				<div className={styles.text}>
					<p>{towel.price}</p>
					{/* <p className={styles.soldOut}>{shirt.soldOut}</p> */}
					<p className={styles.when}>{towel.when}</p>
					<div className={styles.description}>
						<p>{towel.description}</p>
						<ul>{getDetails(towel.list)}</ul>
					</div>
					<div className={styles.instructions}>
						<h3>{towel.how}</h3>
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
