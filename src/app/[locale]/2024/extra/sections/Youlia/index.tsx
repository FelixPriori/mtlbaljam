'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './styles.module.scss'

export default function Youlia() {
	const t = useTranslations('MtlBalJam.2024.extrasPage.youlia')

	return (
		<section className={styles.youliaSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				<div className={styles.imagesWrapper}>
					<Image
						className={styles.secondImage}
						src={t('sketchImageSrc')}
						width={250}
						height={250}
						alt={t('sketchImageAlt')}
					/>
					<Image
						className={styles.firstImage}
						src={t('earringImageSrc')}
						width={250}
						height={250}
						alt={t('earringImageAlt')}
					/>
				</div>
				<div className={styles.text}>
					<div className={styles.description}>
						<p>
							{t.rich('description', {
								br: () => <br />,
								contact: chunks => (
									<a
										rel="noopener noreferrer"
										target="_blank"
										href={t('contactLink')}
									>
										{chunks}
									</a>
								),
								order: chunks => (
									<a
										rel="noopener noreferrer"
										target="_blank"
										href={t('orderLink')}
									>
										{chunks}
									</a>
								),
								insta: chunks => (
									<a
										rel="noopener noreferrer"
										target="_blank"
										href={t('instaLink')}
									>
										{chunks}
									</a>
								),
							})}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
