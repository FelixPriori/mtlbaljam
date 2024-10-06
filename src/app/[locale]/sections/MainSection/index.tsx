'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function MainSection() {
	const t = useTranslations('MtlBalJam.mainPage')
	return (
		<section className={styles.mainSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
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
					<p>{t('firstInstructors.shortBio')}</p>
					<Link className={styles.link} href={t('firstInstructors.link')}>
						{t('firstInstructors.linkText')}
					</Link>
				</div>
			</div>
		</section>
	)
}
