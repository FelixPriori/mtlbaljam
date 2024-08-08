'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './styles.module.scss'

export default function Band() {
	const t = useTranslations('MtlBalJam.2024.musicPage.liveMusic')
	return (
		<section className={styles.bandSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				<div className={styles.cutout}>
					<Image
						src="/michael-cutout.png"
						alt={t('logoAlt')}
						width={150}
						height={150}
					/>
				</div>
				<div className={styles.logoWrapper}>
					<Image
						src="/legacy-band.png"
						alt={t('logoAlt')}
						width={150}
						height={150}
					/>
				</div>
				<div className={styles.text}>
					<h3>{t('bandName')}</h3>
					<p>{t.rich('biography', { br: chunks => <br /> })}</p>
					<a target="_blank" rel="norefferer" href={t('link')}>
						{t('link')}
					</a>
				</div>
			</div>
		</section>
	)
}
