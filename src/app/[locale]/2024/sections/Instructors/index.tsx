'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import LinesCircle from '@/assets/svgs/lines-circle'
import HalfCircle from '@/assets/svgs/half-circle'
import Link from 'next/link'
import Image from 'next/image'

export default function Instructors() {
	const t = useTranslations('MtlBalJam.homePage.instructorsSection')
	return (
		<section className={styles.instructorsSection}>
			<div className={styles.halfCircle}>
				<HalfCircle />
			</div>
			<div className={styles.content}>
				<div className={styles.instructorImageWrapper}>
					<Image
						src="/yulia-sasha.png"
						alt="Yulia & Sasha"
						height={300}
						width={300}
					/>
				</div>
				<div className={styles.text}>
					<h2>{t('title')}</h2>
					<h3>{t('instructorsNames')}</h3>
					<p>{t('description')}</p>
					<Link href={t('learnMore.href')}>{t('learnMore.text')}</Link>
				</div>
			</div>
			<div className={styles.linesCircle}>
				<LinesCircle />
			</div>
		</section>
	)
}
