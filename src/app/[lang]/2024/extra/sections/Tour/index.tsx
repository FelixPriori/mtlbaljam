import Image from 'next/image'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'
import TourImage from '@/../public/mbj-guided-tour.png'

type TourInstructions =
	keyof DictionaryType['mbj2024']['extrasPage']['tour']['instructions']

const keys: TourInstructions[] = ['register', 'edit', 'contact']

export default function Tour({
	tour,
}: {
	tour: DictionaryType['mbj2024']['extrasPage']['tour']
}) {
	const renderInstruction = (key: string) => {
		switch (key) {
			case 'register':
				return (
					<p>
						{tour.instructions.register.text}{' '}
						<a
							rel="noopener noreferrer"
							target="_blank"
							href="https://mtl-bal-jam-2024.dancecamps.org/booking.php"
						>
							{tour.instructions.register.linkText}
						</a>
					</p>
				)
			case 'contact':
				return (
					<p>
						{tour.instructions.contact.text}{' '}
						<a
							rel="noopener noreferrer"
							target="_blank"
							href="mailto:mtlbaljam@campusbalboa.org"
						>
							{tour.instructions.contact.linkText}
						</a>
					</p>
				)
			default:
				return <p>{tour.instructions.edit}</p>
		}
	}

	return (
		<section className={styles.bandSection}>
			<h2>{tour.title}</h2>
			<div className={styles.content}>
				<div className={styles.imageWrapper}>
					<Image
						src={TourImage}
						width={1080}
						height={1080}
						alt={tour.imageAlt}
					/>
				</div>
				<div className={styles.text}>
					<p>{tour.price}</p>
					<p>{tour.when}</p>
					<p>{tour.length}</p>
					<p>{tour.description}</p>

					<div className={styles.instructions}>
						<h3>{tour.how}</h3>
						<ul>
							{keys.map(key => (
								<li key={key}>{renderInstruction(key)}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
