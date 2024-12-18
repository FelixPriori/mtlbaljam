'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'

const keys = ['first', 'second', 'third', 'door'] as const

const getDetails = (items: string) =>
	items?.split(',').map(detail => <li key={detail}>{detail}</li>)

export default function Tickets() {
	const t = useTranslations('MtlBalJam.2025.registrationPage.tickets')
	return (
		<section className={styles.ticketsSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				<div className={styles.calendar}>
					<h3>{t('priceCalendar.title')}</h3>
					<h4>{t('fullPass')}</h4>
					<ul>
						{keys.map(key => (
							<li key={key} className={styles.priceItem}>
								<span
									className={
										key === 'first' || key === 'second' || key === 'third'
											? styles.dashed
											: ''
									}
								>
									{t(`priceCalendar.dates.${key}`)}
								</span>
								<span className={styles.dots}></span>
								<span
									className={`${styles.price} ${
										key === 'first' || key === 'second' || key === 'third'
											? styles.dashed
											: ''
									}`}
								>
									<strong>{t(`priceCalendar.full.${key}`)}</strong>
								</span>
							</li>
						))}
					</ul>
					<h4>{t('partyPass')}</h4>
					<ul>
						{keys.map(key => (
							<li key={key} className={styles.priceItem}>
								<span
									className={
										key === 'first' || key === 'second' || key === 'third'
											? styles.dashed
											: ''
									}
								>
									{t(`priceCalendar.dates.${key}`)}
								</span>
								<span className={styles.dots}></span>
								<span
									className={`${styles.price} ${
										key === 'first' || key === 'second' || key === 'third'
											? styles.dashed
											: ''
									}`}
								>
									<strong>{t(`priceCalendar.party.${key}`)}</strong>
								</span>
							</li>
						))}
					</ul>
					<p className={styles.note}>{t('priceCalendar.note')}</p>
				</div>
				<div className={styles.details}>
					<h3>{t('ticketsDetails.title')}</h3>
					<h4>{t('fullPass')}</h4>
					<ul>{getDetails(t('ticketsDetails.full'))}</ul>
					<h4>{t('partyPass')}</h4>
					<ul>{getDetails(t('ticketsDetails.party'))}</ul>
				</div>
				<div className={styles.level}>
					<h3>{t('level.title')}</h3>
					<p>{t('level.content.details')}</p>
					<ul className={styles.levelList}>
						{getDetails(t('level.content.list'))}
					</ul>
				</div>
				<div className={styles.subsidize}>
					<h3>{t('subsidize.title')}</h3>
					<p>
						{t.rich('subsidize.description', {
							email: chunks => (
								<a href="mailto:mtlbaljam@campusbalboa.org">{chunks}</a>
							),
						})}
					</p>
				</div>
				<div className={styles.terms}>
					<h3>{t('terms.title')}</h3>
					<p>
						{t.rich('terms.content', {
							link: chunks => (
								<a
									target="_blank"
									rel="noreferrer noopener"
									href={t('terms.link')}
								>
									{chunks}
								</a>
							),
						})}
					</p>
				</div>
			</div>
		</section>
	)
}
