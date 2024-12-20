'use client'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import Image from 'next/image'
import Skeleton from '@/app/[lang]/components/Skeleton'
import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function MainInstructors({
	mainInstructors,
}: {
	mainInstructors: DictionaryType['mbj2024']['instructorsPage']['mainInstructors']
}) {
	const [hasWindow, setHasWindow] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setHasWindow(true)
		}
	}, [])

	return (
		<section className={styles.mainInstructors}>
			<h2>{mainInstructors.title}</h2>
			<div className={styles.content}>
				<div className={styles.youtubeWrapper}>
					{hasWindow ? (
						<ReactPlayer
							url="https://www.youtube.com/watch?v=7jV-xrxLN_w"
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
						src="/yulia-sasha.png"
						alt={mainInstructors.cutoutAlt}
						width={1311}
						height={1224}
					/>
				</div>
				<div className={styles.text}>
					<h3>{mainInstructors.instructorsNames}</h3>
					{mainInstructors.biography.map(line => (
						<p key={line}>{line}</p>
					))}
					<a target="_blank" rel="norefferer" href={mainInstructors.link}>
						{mainInstructors.link}
					</a>
				</div>
			</div>
		</section>
	)
}
