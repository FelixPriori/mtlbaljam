'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'

export default function Protocol() {
	const t = useTranslations('MtlBalJam.codePage.protocolSection')

	return (
		<section className={styles.protocolSection}>
			<h2 className={styles.title}>{t('title')}</h2>
			<div className={styles.content}>
				<p>
					{t.rich('content', {
						br: () => <br />,
						protocol: chunks => (
							<a
								className="mbj-link"
								target="_blank"
								rel="noopener noreferrer"
								href={t('protocolLink')}
							>
								{chunks}
							</a>
						),
						email: chunks => (
							<a className="mbj-link" href="mailto:inclusion@campusbalboa.org">
								{chunks}
							</a>
						),
						report: chunks => (
							<a
								className="mbj-link"
								target="_blank"
								rel="noopener noreferrer"
								href={t('reportLink')}
							>
								{chunks}
							</a>
						),
					})}
				</p>
			</div>
		</section>
	)
}
