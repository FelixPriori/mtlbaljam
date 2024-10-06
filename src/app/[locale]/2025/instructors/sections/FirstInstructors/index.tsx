'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import ReactPlayer from 'react-player/youtube'
import Image from 'next/image'
import Skeleton from '@/app/[locale]/components/Skeleton'
import styles from './styles.module.scss'

export default function FirstInstructors() {
	const [hasWindow, setHasWindow] = useState(false)
	const t = useTranslations('MtlBalJam.2025.instructorsPage')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setHasWindow(true)
		}
	}, [])

	return (
		<section className={styles.mainInstructors}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
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
						width={150}
						height={150}
					/>
				</div>
				<div className={styles.text}>
					<h3>{t('firstInstructors.instructorsNames')}</h3>
					<p>
						{t.rich('firstInstructors.biography', { br: chunks => <br /> })}
					</p>
					<a target="_blank" rel="norefferer" href={t('firstInstructors.link')}>
						{t('firstInstructors.link')}
					</a>
				</div>
			</div>
		</section>
	)
}
