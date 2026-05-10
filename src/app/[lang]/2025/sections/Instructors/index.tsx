import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import LinesCircle from '@/assets/svgs/lines-circle'
import HalfCircle from '@/assets/svgs/half-circle'
import { DictionaryType } from '@/app/[lang]/dictionaries'
import { Locales } from '@/i18n'

const couples = [
	{ key: 'first' as const, src: '/javilucia.jpg', width: 1920, height: 1005 },
	{ key: 'second' as const, src: '/neusalbert.png', width: 1376, height: 1113 },
]

export default function Instructors({
	instructorsPage,
	learnMoreText,
	lang,
}: {
	instructorsPage: DictionaryType['mbj2025']['instructorsPage']
	learnMoreText: string
	lang: Locales
}) {
	return (
		<section className={styles.mainSection}>
			<div className={styles.halfCircle}>
				<HalfCircle />
			</div>
			<h2>{instructorsPage.title}</h2>
			<div className={styles.content}>
				{couples.map(({ key, src, width, height }, i) => {
					const data = instructorsPage[`${key}Instructors`]
					const bio = data.biography
					const lines: string[] = Array.isArray(bio) ? bio : [bio]
					return (
						<div
							key={data.instructorsNames}
							className={`${styles.instructors} ${i === 0 ? styles.first : styles.second}`}
						>
							<div className={styles.cutout}>
								<Image
									src={src}
									alt={data.instructorsNames}
									width={width}
									height={height}
									loading={i === 0 ? 'eager' : 'lazy'}
									priority={i === 0}
								/>
							</div>
							<div className={styles.text}>
								<h3>{data.instructorsNames}</h3>
								{lines.map(line => (
									<p key={line}>{line}</p>
								))}
								<Link className={styles.link} href={`/${lang}/2025/instructors`}>
									{learnMoreText}
								</Link>
							</div>
						</div>
					)
				})}
			</div>
			<div className={styles.linesCircle}>
				<LinesCircle />
			</div>
		</section>
	)
}
