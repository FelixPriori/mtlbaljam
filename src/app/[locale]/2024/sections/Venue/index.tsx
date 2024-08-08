'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import IconBox from '@/app/[locale]/components/IconBox'

export default function Venue() {
	const t = useTranslations('MtlBalJam')
	return (
		<section className={styles.venueSection}>
			<div className={styles.subscribeWrapper}>
				<div className={styles.registration}>
					<h2>{t('homePage.scheduleSection.title')}</h2>
					<div className={styles.registrationContent}>
						<p>
							{t.rich(`homePage.scheduleSection.description`, {
								details: chunks => (
									<Link
										className="mbj-link"
										href={t('homePage.scheduleSection.detailsLink')}
									>
										{chunks}
									</Link>
								),
							})}
						</p>
					</div>
				</div>
			</div>
			<div className={styles.archWrapper}>
				<div className={styles.arch}>
					<Image
						src="/salmon-arch.png"
						alt={t('iconAlts.arch')}
						width={100}
						height={150}
					/>
				</div>

				<div className={styles.text}>
					<h2>{t('homePage.venueSection.title')}</h2>
					<Link href={t('homePage.venueSection.learnMore.href')}>
						{t('homePage.venueSection.learnMore.text')}
					</Link>
				</div>

				<IconBox
					src="/mbj-loaf-white.png"
					alt={t('iconAlts.loaf')}
					width={50}
					height={50}
					position="topLeft"
				/>
			</div>
		</section>
	)
}
