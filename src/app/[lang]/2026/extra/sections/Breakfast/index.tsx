import Image from 'next/image'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

type BreakfastInstructions =
	keyof DictionaryType['mbj2026']['extrasPage']['breakfast']['instructions']

const keys: BreakfastInstructions[] = ['register', 'edit', 'contact']

export default function Breakfast({
	breakfast,
}: {
	breakfast: DictionaryType['mbj2026']['extrasPage']['breakfast']
}) {
	const renderInstruction = (key: string) => {
		switch (key) {
			case 'register':
				return (
					<p>
						{breakfast.instructions.register.text}{' '}
						{breakfast.instructions.register.linkText}
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
						{breakfast.instructions.contact.text}{' '}
						<a
							rel="noopener noreferrer"
							target="_blank"
							href="mailto:mtlbaljam@campusbalboa.org"
						>
							{breakfast.instructions.contact.linkText}
						</a>
					</p>
				)

			default:
				return <p>{breakfast.instructions.edit}</p>
		}
	}
	return (
		<section className={styles.breakfastSection}>
			<h2>{breakfast.title}</h2>
			<div className={styles.content}>
				<div className={styles.imageWrapper}>
					<Image
						src={breakfast.images.previewSrc}
						width={1000}
						height={1000}
						alt={breakfast.images.previewAlt}
					/>
				</div>
				<div className={styles.text}>
					<p>{breakfast.price}</p>
					{/* <p className={styles.soldOut}>{shirt.soldOut}</p> */}
					<p className={styles.when}>{breakfast.when}</p>
					<div className={styles.description}>
						<p>{breakfast.description}</p>
					</div>
					<div className={styles.instructions}>
						<h3>{breakfast.how}</h3>
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
