'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'

export default function ToMontreal() {
	const t = useTranslations('MtlBalJam.travelPage.transportation')
	return (
		<section className={styles.transportationSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				<div className={styles.mode}>
					<h3 className={styles.modeTitle}>{t('publicTransit.title')}</h3>
					<div className={styles.opus}>
						<p>
							{t.rich('publicTransit.opus.description', {
								link: chunk => (
									<a
										href={t('publicTransit.opus.link')}
										rel="noreferrer noopener"
										target="_blank"
									>
										{chunk}
									</a>
								),
							})}
						</p>
					</div>
					<div className={styles.app}>
						<p>
							{t.rich('publicTransit.app.description', {
								link: chunk => (
									<a
										href={t('publicTransit.app.link')}
										rel="noreferrer noopener"
										target="_blank"
									>
										{chunk}
									</a>
								),
							})}
						</p>
					</div>
				</div>
				<div className={styles.mode}>
					<h3 className={styles.modeTitle}>{t('bixi.title')}</h3>
					<p>
						{t.rich('bixi.description', {
							link: chunk => (
								<a
									href={t('bixi.link')}
									rel="noreferrer noopener"
									target="_blank"
								>
									{chunk}
								</a>
							),
						})}
					</p>
				</div>
				<div className={styles.mode}>
					<h3 className={styles.modeTitle}>{t('car.title')}</h3>
					<p>
						{t.rich('car.description', {
							link: chunk => (
								<a
									href={t('car.link')}
									rel="noreferrer noopener"
									target="_blank"
								>
									{chunk}
								</a>
							),
						})}
					</p>
				</div>
			</div>
		</section>
	)
}
