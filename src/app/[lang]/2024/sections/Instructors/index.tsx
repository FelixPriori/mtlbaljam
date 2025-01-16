import styles from './styles.module.scss'
import LinesCircle from '@/assets/svgs/lines-circle'
import HalfCircle from '@/assets/svgs/half-circle'
import Link from 'next/link'
import Image from 'next/image'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Instructors({
	instructorsSection,
}: {
	instructorsSection: DictionaryType['mbj2024']['homePage']['instructorsSection']
}) {
	return (
		<section className={styles.instructorsSection}>
			<div className={styles.halfCircle}>
				<HalfCircle />
			</div>
			<div className={styles.content}>
				<div className={styles.instructorImageWrapper}>
					<Image
						src="/yulia-sasha.png"
						alt="Yulia & Sasha"
						height={1311}
						width={1244}
					/>
				</div>
				<div className={styles.text}>
					<h2>{instructorsSection.title}</h2>
					<h3>{instructorsSection.instructorsNames}</h3>
					<p>{instructorsSection.description}</p>
					<Link href={instructorsSection.learnMore.href}>
						{instructorsSection.learnMore.text}
					</Link>
				</div>
			</div>
			<div className={styles.linesCircle}>
				<LinesCircle />
			</div>
		</section>
	)
}
