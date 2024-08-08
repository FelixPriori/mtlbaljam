'use client'
import { useTranslations } from 'next-intl'
import ExternalLink from '@/assets/svgs/external-link'
import styles from './styles.module.scss'

export default function RegisterNow() {
	const t = useTranslations('MtlBalJam.header')
	return (
		<a
			aria-label={t('registerNowAria')}
			className={styles.registerNow}
			target="_blank"
			href="https://mtl-bal-jam-2024.dancecamps.org/booking.php"
		>
			{t('registerNow')}
			<ExternalLink />
		</a>
	)
}
