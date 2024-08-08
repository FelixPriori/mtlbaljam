'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import styles from './styles.module.scss'

export default function Bar() {
	const t = useTranslations('MtlBalJam.2024.extrasPage.bar')

	return (
		<section className={styles.barSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				<div className={styles.imageWrapper}>
					<Image
						src={t('imageSrc')}
						width={250}
						height={250}
						alt={t('imageAlt')}
					/>
				</div>
				<div className={styles.text}>
					<p className={styles.when}>{t('when')}</p>
					<div className={styles.description}>
						<p>
							{t.rich('description', {
								br: () => <br />,
							})}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
