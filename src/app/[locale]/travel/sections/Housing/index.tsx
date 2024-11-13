'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'

const keys = ['hotel' /*'community'*/] as string[]

export default function ToMontreal() {
	const t = useTranslations('MtlBalJam.travelPage.housing')
	return (
		<section className={styles.housingSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				{keys.map(key => (
					<p key={key}>
						{t.rich(`${key}.description`, {
							link: chunk => (
								<a
									href={t(`${key}.link`)}
									rel="noreferrer noopener"
									target="_blank"
								>
									{chunk}
								</a>
							),
						})}
					</p>
				))}
			</div>
		</section>
	)
}
