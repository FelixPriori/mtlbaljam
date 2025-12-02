import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { DictionaryType } from '../../dictionaries'
import LinesCircle from '@/assets/svgs/lines-circle'
import HalfCircle from '@/assets/svgs/half-circle'

export default function MainSection({
	mainPage,
}: {
	mainPage: DictionaryType['mainPage']
}) {
	return (
		<section className={styles.mainSection}>
			<div className={styles.halfCircle}>
				<HalfCircle />
			</div>
			<h2>{mainPage.title}</h2>
			<div className={styles.content}>
				<div className={`${styles.instructors} ${styles.first}`}>
					<div className={`${styles.cutout} ${styles.firsCutout}`}>
						<Image
							src="/irina-natalia.png"
							alt={mainPage.firstInstructors.cutoutAlt}
							width={1080}
							height={1080}
						/>
					</div>
					<div className={styles.text}>
						<h3>{mainPage.firstInstructors.instructorsNames}</h3>
						{mainPage.firstInstructors.shortBio.map(line => (
							<p key={line}>{line}</p>
						))}
						<Link className={styles.link} href={mainPage.firstInstructors.link}>
							{mainPage.firstInstructors.linkText}
						</Link>
					</div>
				</div>
				<div className={`${styles.instructors} ${styles.second}`}>
					<div className={`${styles.cutout} ${styles.secondCutout}`}>
						<Image
							src="/fancy-albert.png"
							alt={mainPage.secondInstructors.cutoutAlt}
							width={1080}
							height={1080}
						/>
					</div>
					<div className={styles.text}>
						<h3>{mainPage.secondInstructors.instructorsNames}</h3>
						{mainPage.secondInstructors.shortBio.map(line => (
							<p key={line}>{line}</p>
						))}
						<Link
							className={styles.link}
							href={mainPage.secondInstructors.link}
						>
							{mainPage.secondInstructors.linkText}
						</Link>
					</div>
				</div>
			</div>
			<div className={styles.linesCircle}>
				<LinesCircle />
			</div>
		</section>
	)
}
