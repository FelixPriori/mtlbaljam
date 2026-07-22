'use client'
import { useSyncExternalStore } from 'react'
import ReactPlayer from 'react-player/youtube'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import Skeleton from '@/app/[lang]/components/Skeleton'
import TextLink from '@/app/[lang]/components/TextLink'
import SanityImage from '@/app/[lang]/components/SanityImage'
import styles from './styles.module.scss'
import { localize } from '@/lib/sanity/localize'
import { urlFor } from '@/lib/sanity/image'
import type { SanityInstructor } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function InstructorsSection({
	instructors,
	title,
	lang,
}: {
	instructors: SanityInstructor[]
	title: { en: string | null; fr: string | null } | null
	lang: Locales
}) {
	const hasWindow = useSyncExternalStore(() => () => {}, () => true, () => false)

	return (
		<section className={styles.instructorsSection}>
			{title && <h2>{localize(title, lang)}</h2>}
			<div className={styles.content}>
				{instructors.map((instructor) => (
					<div key={instructor._id} className={styles.instructor}>
						{instructor.youtubeUrl && (
							<div className={styles.youtubeWrapper}>
								{hasWindow ? (
									<ReactPlayer
										url={instructor.youtubeUrl}
										config={{
											playerVars: {
												showInfo: 1,
												origin: window.location.origin,
											},
										}}
									/>
								) : (
									<Skeleton wrapperClass={styles.loading} boxClass={styles.box}>
										<Image
											priority
											src="/youtube-logo.png"
											alt="youtube logo"
											width={512}
											height={512}
										/>
									</Skeleton>
								)}
							</div>
						)}
						{instructor.cutoutImage && (
							<div className={styles.cutout}>
								<SanityImage
									src={urlFor(instructor.cutoutImage).width(1080).height(1080).url()}
									alt={localize(instructor.cutoutImage.alt, lang) ?? ''}
									width={1080}
									height={1080}
								/>
							</div>
						)}
						<div className={styles.text}>
							<h3>{instructor.name}</h3>
							<PortableText value={localize(instructor.biography, lang) ?? []} />
							{instructor.externalLink && (
								<TextLink href={instructor.externalLink}>{instructor.externalLink}</TextLink>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
