'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import IconBox from '../../components/IconBox'

export default function Footer() {
	const t = useTranslations('MtlBalJam')

	return (
		<footer className={styles.footer}>
			<p>{t('copyright')}</p>
			<IconBox
				src="/mbj-knife-white.png"
				alt={t('iconAlts.knife')}
				width={50}
				height={50}
				position="centerLeft"
			/>
		</footer>
	)
}
