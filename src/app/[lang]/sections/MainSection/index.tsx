import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import LinesCircle from '@/assets/svgs/lines-circle'
import HalfCircle from '@/assets/svgs/half-circle'
import { urlFor } from '@/lib/sanity/image'
import { localize } from '@/lib/sanity/localize'
import type { SanityInstructorGroup, SanityLabels } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function MainSection({
	groups,
	sectionTitle,
	linkText,
	labels,
	year,
	lang,
}: {
	groups: SanityInstructorGroup[]
	sectionTitle: string | null
	linkText: string | null
	labels: SanityLabels
	year: string
	lang: Locales
}) {
	const resolvedLinkText = linkText ?? localize(labels?.learnMore, lang) ?? (lang === 'fr' ? 'En savoir plus...' : 'Learn more...')

	return (
		<section className={styles.mainSection}>
			<div className={styles.halfCircle}>
				<HalfCircle />
			</div>
			<h2>{sectionTitle ?? localize(labels?.instructors, lang) ?? (lang === 'fr' ? 'Instructeurs' : 'Instructors')}</h2>
			<div className={styles.content}>
				{groups.map((group, i) => (
					<div
						key={group.groupName}
						className={`${styles.instructors} ${i === 0 ? styles.first : styles.second}`}
					>
						{group.groupImage && (
							<div className={`${styles.cutout} ${i === 0 ? styles.firsCutout : styles.secondCutout}`}>
								<Image
									src={urlFor(group.groupImage).width(1080).url()}
									alt={localize(group.groupImage.alt, lang) ?? group.groupName ?? ''}
									width={1080}
									height={1080}
									loading={i === 0 ? 'eager' : 'lazy'}
									priority={i === 0}
								/>
							</div>
						)}
						<div className={styles.text}>
							<h3>{group.groupName}</h3>
							{localize(group.shortBio, lang)?.map(line => (
								<p key={line}>{line}</p>
							))}
							<Link className={styles.link} href={`/${lang}/${year}/instructors`}>
								{resolvedLinkText}
							</Link>
						</div>
					</div>
				))}
			</div>
			<div className={styles.linesCircle}>
				<LinesCircle />
			</div>
		</section>
	)
}
