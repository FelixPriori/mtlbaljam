'use client'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.scss'

export default function Staff() {
	const t = useTranslations('MtlBalJam')
	const locale = useLocale()

	return (
		<section className={styles.descriptionSection}>
			<h2>{t('aboutPage.descriptionSection.title')}</h2>
			<div className={styles.content}>
				<p>
					{t.rich('aboutPage.descriptionSection.description', {
						br: () => <br />,
						campus: chunks => (
							<a
								className={styles.link}
								href={`https://www.campusbalboa.org/${locale}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{chunks}
							</a>
						),
					})}
				</p>
			</div>
			<h2>{t('landAknowledgement.title')}</h2>
			<div className={styles.content}>
				<p>{t('landAknowledgement.text', { name: 'MTL BAL JAM' })}</p>
			</div>
			<div className={styles.logoContainer}>
				<Image
					src="/mtl-bal-jam-logo-white.png"
					height={150}
					width={150}
					alt={t('iconAlts.mbjLogo')}
				/>
			</div>
		</section>
	)
}
