'use client'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import Image from 'next/image'
import Skeleton from '@/app/[lang]/components/Skeleton'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function InstructorsSection({
	instructorsPage,
}: {
	instructorsPage: DictionaryType['mbj2025']['instructorsPage']
}) {
	const [hasWindow, setHasWindow] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setHasWindow(true)
		}
	}, [])

	return (
		<section className={styles.instructorsSection}>
			<h2>{instructorsPage.title}</h2>
			<div className={styles.content}>
				<div className={styles.instructor}>
					<div className={styles.youtubeWrapper}>
						{hasWindow ? (
							<ReactPlayer
								url="https://www.youtube.com/watch?v=MCV0nGQXeWU"
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
					<div className={styles.cutout}>
						<Image
							src="/javilucia.jpg"
							alt={instructorsPage.firstInstructors.cutoutAlt}
							width={1920}
							height={1005}
						/>
					</div>
					<div className={styles.text}>
						<h3>{instructorsPage.firstInstructors.instructorsNames}</h3>
						{instructorsPage.firstInstructors.biography.map(line => (
							<p key={line}>{line}</p>
						))}
						<a
							target="_blank"
							rel="norefferer"
							href={instructorsPage.firstInstructors.link}
						>
							{instructorsPage.firstInstructors.link}
						</a>
					</div>
				</div>
				<div className={styles.instructor}>
					<div className={styles.youtubeWrapper}>
						{hasWindow ? (
							<ReactPlayer
								url="https://www.youtube.com/watch?v=v8RIcdyC608"
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
					<div className={styles.cutout}>
						<Image
							src="/neusalbert.png"
							alt={instructorsPage.secondInstructors.cutoutAlt}
							width={1376}
							height={1113}
						/>
					</div>
					<div className={styles.text}>
						<h3>{instructorsPage.secondInstructors.instructorsNames}</h3>
						<p>{instructorsPage.secondInstructors.biography}</p>
						<a
							target="_blank"
							rel="norefferer"
							href={instructorsPage.secondInstructors.link}
						>
							{instructorsPage.secondInstructors.link}
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
