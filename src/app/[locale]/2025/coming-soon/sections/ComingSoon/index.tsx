'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './styles.module.scss'

export default function ComingSoon() {
	const t = useTranslations('MtlBalJam.2025.comingSoon')

	return (
		<section className={styles.comingSoonSection}>
			<div className={styles.content}>
				<div className={styles.text}>
					<h2 className={styles.title}>{t('title')}</h2>
					<p className={styles.saveTheDate}>{t('saveTheDate')}</p>
				</div>
				<div className={styles.cutout}>
					<Image
						src="/javilucia.png"
						alt={t('cutoutAlt')}
						width={1920}
						height={1005}
					/>
				</div>
			</div>
		</section>
	)
}
