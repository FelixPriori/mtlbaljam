'use client'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import Skeleton from '@/app/[lang]/components/Skeleton'
import styles from './styles.module.scss'
import { localize } from '@/lib/sanity/localize'
import { urlFor } from '@/lib/sanity/image'
import type { SanityInstructor } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function InstructorsSection({
	instructors,
	lang,
}: {
	instructors: SanityInstructor[]
	lang: Locales
}) {
	const [hasWindow, setHasWindow] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setHasWindow(true)
		}
	}, [])

	return (
		<section className={styles.instructorsSection}>
			<h2>Instructors</h2>
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
								<Image
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
								<a target="_blank" rel="noreferrer" href={instructor.externalLink}>
									{instructor.externalLink}
								</a>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
