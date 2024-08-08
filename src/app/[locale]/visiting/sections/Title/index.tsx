'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import HalfCircle from '@/assets/svgs/half-circle'
import LinesCircle from '@/assets/svgs/lines-circle'

export default function Title() {
	const t = useTranslations('MtlBalJam.visitingPage')
	return (
		<div className={styles.titleSection}>
			<div className={styles.halfCircle}>
				<HalfCircle />
			</div>
			<div className={styles.content}>
				<div className={styles.text}>
					<h2>{t('title')}</h2>
				</div>
			</div>
			<div className={styles.linesCircle}>
				<LinesCircle />
			</div>
		</div>
	)
}
