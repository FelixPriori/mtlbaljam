'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import IconBox from '@/app/[locale]/components/IconBox'
import Socials from '@/app/[locale]/components/Socials'

export default function MusicSection() {
	const t = useTranslations('MtlBalJam')

	return (
		<section className={styles.bandSection}>
			<div className={styles.bandName}>
				<div className={styles.bandImageWrapper}>
					<Image
						src="/legacy-band.png"
						alt="Legacy Band logo"
						height={100}
						width={100}
					/>
				</div>
				<div className={styles.text}>
					<h2>{t('homePage.musicSection.title')}</h2>
					<h3>{t('homePage.musicSection.bandName')}</h3>
					<p>{t('homePage.musicSection.description')}</p>
					<Link href={t('homePage.musicSection.learnMore.href')}>
						{t('homePage.musicSection.learnMore.text')}
					</Link>
				</div>
			</div>

			<div className={styles.socialsWrapper}>
				<IconBox
					src="/mbj-toaster-black.png"
					alt={t('iconAlts.toaster')}
					width={50}
					height={50}
					position="topRight"
				/>
				<Socials />
			</div>
		</section>
	)
}
