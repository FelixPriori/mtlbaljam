'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import ReactPlayer from 'react-player/youtube'
import Image from 'next/image'
import Skeleton from '@/app/[locale]/components/Skeleton'
import styles from './styles.module.scss'

export default function MainInstructors() {
	const [hasWindow, setHasWindow] = useState(false)
	const t = useTranslations('MtlBalJam.2024.instructorsPage.mainInstructors')

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
								width={68}
								height={68}
							/>
						</Skeleton>
					)}
				</div>
				<div className={styles.cutout}>
					<Image
						src="/yulia-sasha.png"
						alt={t('cutoutAlt')}
						width={150}
						height={150}
					/>
				</div>
				<div className={styles.text}>
					<h3>{t('instructorsNames')}</h3>
					<p>{t.rich('biography', { br: chunks => <br /> })}</p>
					<a target="_blank" rel="norefferer" href={t('link')}>
						{t('link')}
					</a>
				</div>
			</div>
		</section>
	)
}
