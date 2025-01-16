import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { DictionaryType } from '../../dictionaries'

export default function MainSection({
	mainPage,
}: {
	mainPage: DictionaryType['mainPage']
}) {
	return (
		<section className={styles.mainSection}>
			<h2>{mainPage.title}</h2>
			<div className={styles.content}>
				<div className={`${styles.instructors} ${styles.first}`}>
					<div className={`${styles.cutout} ${styles.firsCutout}`}>
						<Image
							src="/lucia-javi-square.png"
							alt={mainPage.firstInstructors.cutoutAlt}
							width={1920}
							height={1005}
						/>
					</div>
					<div className={styles.text}>
						<h3>{mainPage.firstInstructors.instructorsNames}</h3>
						<p>{mainPage.firstInstructors.shortBio}</p>
						<Link className={styles.link} href={mainPage.firstInstructors.link}>
							{mainPage.firstInstructors.linkText}
						</Link>
					</div>
				</div>
				<div className={`${styles.instructors} ${styles.second}`}>
					<div className={`${styles.cutout} ${styles.secondCutout}`}>
						<Image
							src="/neus-albert-square.png"
							alt={mainPage.secondInstructors.cutoutAlt}
							width={1376}
							height={1113}
						/>
					</div>
					<div className={styles.text}>
						<h3>{mainPage.secondInstructors.instructorsNames}</h3>
						<p>{mainPage.secondInstructors.shortBio}</p>
						<Link
							className={styles.link}
							href={mainPage.secondInstructors.link}
						>
							{mainPage.secondInstructors.linkText}
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
