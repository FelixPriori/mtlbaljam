'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import ReactPlayer from 'react-player/youtube'
import Image from 'next/image'
import Skeleton from '@/app/[locale]/components/Skeleton'
import styles from './styles.module.scss'

export default function InstructorsSection() {
	const [hasWindow, setHasWindow] = useState(false)
	const t = useTranslations('MtlBalJam.2025.instructorsPage')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setHasWindow(true)
		}
	}, [])

	return (
		<section className={styles.instructorsSection}>
			<h2>{t('title')}</h2>
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
									width={68}
									height={68}
								/>
							</Skeleton>
						)}
					</div>
					<div className={styles.cutout}>
						<Image
							src="/javilucia.png"
							alt={t('firstInstructors.cutoutAlt')}
							width={1920}
							height={1005}
						/>
					</div>
					<div className={styles.text}>
						<h3>{t('firstInstructors.instructorsNames')}</h3>
						<p>
							{t.rich('firstInstructors.biography', { br: chunks => <br /> })}
						</p>
						<a
							target="_blank"
							rel="norefferer"
							href={t('firstInstructors.link')}
						>
							{t('firstInstructors.link')}
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
									width={68}
									height={68}
								/>
							</Skeleton>
						)}
					</div>
					<div className={styles.cutout}>
						<Image
							src="/neusalbert.png"
							alt={t('secondInstructors.cutoutAlt')}
							width={1376}
							height={1113}
						/>
					</div>
					<div className={styles.text}>
						<h3>{t('secondInstructors.instructorsNames')}</h3>
						<p>{t('secondInstructors.biography')}</p>
						<a
							target="_blank"
							rel="norefferer"
							href={t('secondInstructors.link')}
						>
							{t('secondInstructors.link')}
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
