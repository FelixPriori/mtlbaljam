import styles from './styles.module.scss'
import { DictionaryType } from '@/app/[lang]/dictionaries'

type Tiers =
	keyof DictionaryType['mbj2025']['registrationPage']['tickets']['priceCalendar']['dates']

const keys: Tiers[] = ['first', 'second', 'third', 'door']

const getDetails = (items: string) =>
	items?.split(',').map(detail => <li key={detail}>{detail}</li>)

export default function Tickets({
	tickets,
}: {
	tickets: DictionaryType['mbj2025']['registrationPage']['tickets']
}) {
	const mtlbaljamEmail = `<a href="mailto:mtlbaljam@campusbalboa.org">mtlbaljam@campusbalboa.org</a>`

	const termsLink = `<a
			target="_blank"
			rel="noreferrer noopener"
			href="${tickets.terms.link}"
		>${tickets.terms.linkText}</a>`

	return (
		<section className={styles.ticketsSection}>
			<h2>{tickets.title}</h2>
			<div className={styles.content}>
				<div className={styles.calendar}>
					<h3>{tickets.priceCalendar.title}</h3>
					<h4>{tickets.fullPass}</h4>
					<ul>
						{keys.map(key => (
							<li key={key} className={styles.priceItem}>
								<span
								// className={
								// 	key === 'first' || key === 'second' || key === 'third'
								// 		? styles.dashed
								// 		: ''
								// }
								>
									{tickets.priceCalendar.dates[key]}
								</span>
								<span className={styles.dots}></span>
								<span className={`${styles.price}`}>
									<strong>{tickets.priceCalendar.full[key]}</strong>
								</span>
							</li>
						))}
					</ul>
					<h4>{tickets.partyPass}</h4>
					<ul>
						{keys.map(key => (
							<li key={key} className={styles.priceItem}>
								<span
								// className={
								// 	key === 'first' || key === 'second' || key === 'third'
								// 		? styles.dashed
								// 		: ''
								// }
								>
									{tickets.priceCalendar.dates[key]}
								</span>
								<span className={styles.dots}></span>
								<span className={`${styles.price}`}>
									<strong>{tickets.priceCalendar.party[key]}</strong>
								</span>
							</li>
						))}
					</ul>
					<h4>{tickets.classPass}</h4>
					<ul>
						{keys.map(key => (
							<li key={key} className={styles.priceItem}>
								<span
								// className={
								// 	key === 'first' || key === 'second' || key === 'third'
								// 		? styles.dashed
								// 		: ''
								// }
								>
									{tickets.priceCalendar.dates[key]}
								</span>
								<span className={styles.dots}></span>
								<span className={`${styles.price}`}>
									<strong>{tickets.priceCalendar.class[key]}</strong>
								</span>
							</li>
						))}
					</ul>
					<p className={styles.note}>{tickets.priceCalendar.note}</p>
				</div>
				<div className={styles.details}>
					<h3>{tickets.ticketsDetails.title}</h3>
					<h4>{tickets.fullPass}</h4>
					<ul>{getDetails(tickets.ticketsDetails.full)}</ul>
					<h4>{tickets.partyPass}</h4>
					<ul>{getDetails(tickets.ticketsDetails.party)}</ul>
					<h4>{tickets.classPass}</h4>
					<ul>{getDetails(tickets.ticketsDetails.class)}</ul>
				</div>
				<div className={styles.level}>
					<h3>{tickets.level.title}</h3>
					<p>{tickets.level.content.details}</p>
					<ul className={styles.levelList}>
						{getDetails(tickets.level.content.list)}
					</ul>
				</div>
				<div className={styles.subsidize}>
					<h3>{tickets.subsidize.title}</h3>
					<p
						dangerouslySetInnerHTML={{
							__html: tickets.subsidize.description.replace(
								'{{email}}',
								mtlbaljamEmail,
							),
						}}
					/>
					<h4>{tickets.subsidize.eligibilityTitle}</h4>
					<ul>
						{tickets.subsidize.eligibility.map(line => (
							<li key={line}>
								<p>{line}</p>
							</li>
						))}
					</ul>
				</div>
				<div className={styles.terms}>
					<h3>{tickets.terms.title}</h3>
					<p
						dangerouslySetInnerHTML={{
							__html: tickets.terms.content.replace('{{link}}', termsLink),
						}}
					/>
				</div>
			</div>
		</section>
	)
}
