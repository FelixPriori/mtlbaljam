import styles from './styles.module.scss'
import { localize } from '@/lib/sanity/localize'
import type { SanityRegistrationPage, SanityLabels } from '@/lib/sanity/queryTypes'
import type { Locales } from '@/i18n'

export default function Tickets({
	registrationPage,
	labels,
	lang,
}: {
	registrationPage: SanityRegistrationPage | null
	labels: SanityLabels
	lang: Locales
}) {
	if (!registrationPage) return null

	const {
		priceTiers,
		fullPassDescription,
		partyPassDescription,
		classPassDescription,
		ticketsDetailsTitle,
		fullPassIncludes,
		partyPassIncludes,
		classPassIncludes,
		subsidyTitle,
		subsidyInfo,
		subsidyEligibilityTitle,
		subsidyEligibility,
		termsUrl,
		termsLinkText,
		termsContent,
		registerUrl,
	} = registrationPage

	const mtlbaljamEmail = `<a href="mailto:mtlbaljam@campusbalboa.org">mtlbaljam@campusbalboa.org</a>`

	const fullPassLabel = localize(fullPassDescription, lang) ?? localize(labels?.fullPass, lang) ?? (lang === 'fr' ? 'Pass complet' : 'Full Pass')
	const partyPassLabel = localize(partyPassDescription, lang) ?? localize(labels?.partyPass, lang) ?? (lang === 'fr' ? 'Pass soirée' : 'Party Pass')
	const classPassLabel = localize(classPassDescription, lang) ?? localize(labels?.classPass, lang) ?? (lang === 'fr' ? 'Pass cours' : 'Class Pass')

	const ticketsTitle = localize(ticketsDetailsTitle, lang) ?? localize(labels?.ticketsInclude, lang) ?? (lang === 'fr' ? 'À l\'achat d\'un laissez-passer' : 'Tickets include')
	const fullIncludes = localize(fullPassIncludes, lang)
	const partyIncludes = localize(partyPassIncludes, lang)
	const classIncludes = localize(classPassIncludes, lang)

	const hasTicketsIncludes = (fullIncludes?.length ?? 0) > 0 || (partyIncludes?.length ?? 0) > 0 || (classIncludes?.length ?? 0) > 0

	const subsidySectionTitle = localize(subsidyTitle, lang) ?? localize(labels?.helpSomeoneAttend, lang) ?? (lang === 'fr' ? 'Aider quelqu\'un à participer' : 'Help someone attend MTL BAL JAM')
	const eligibilityTitle = localize(subsidyEligibilityTitle, lang) ?? localize(labels?.eligibilityAndGuidelines, lang) ?? (lang === 'fr' ? 'Critères et directives' : 'Eligibility and Guidelines')

	const termsBody = localize(termsContent, lang)
	const termsLink = localize(termsLinkText, lang)

	const termsBodyHtml = termsBody && termsUrl && termsLink
		? termsBody.replace('{{link}}', `<a href="${termsUrl}" target="_blank" rel="noreferrer noopener">${termsLink}</a>`)
		: null

	return (
		<section className={styles.ticketsSection}>
			<h2>{localize(labels?.registration, lang) ?? (lang === 'fr' ? 'Inscription' : 'Registration')}</h2>
			<div className={styles.content}>
				{registerUrl && (
					<div className={styles.registerLink}>
						<a href={registerUrl} target="_blank" rel="noreferrer noopener">
							{localize(labels?.registerNow, lang) ?? (lang === 'fr' ? "S'inscrire" : 'Register now')}
						</a>
					</div>
				)}

				{hasTicketsIncludes && (
					<div className={styles.ticketsDetails}>
						<h3>{ticketsTitle}</h3>
						{fullIncludes && fullIncludes.length > 0 && (
							<>
								<h4>{fullPassLabel}</h4>
								<ul>
									{fullIncludes.map((item) => <li key={item}>{item}</li>)}
								</ul>
							</>
						)}
						{partyIncludes && partyIncludes.length > 0 && (
							<>
								<h4>{partyPassLabel}</h4>
								<ul>
									{partyIncludes.map((item) => <li key={item}>{item}</li>)}
								</ul>
							</>
						)}
						{classIncludes && classIncludes.length > 0 && (
							<>
								<h4>{classPassLabel}</h4>
								<ul>
									{classIncludes.map((item) => <li key={item}>{item}</li>)}
								</ul>
							</>
						)}
					</div>
				)}

				{priceTiers && priceTiers.length > 0 && (
					<div className={styles.calendar}>
						<h3>{localize(labels?.priceCalendar, lang) ?? (lang === 'fr' ? 'Calendrier des prix' : 'Price Calendar')}</h3>
						<h4>{fullPassLabel}</h4>
						<ul>
							{priceTiers.map((tier, i) => (
								<li key={i} className={styles.priceItem}>
									<span>{localize(tier.dateLabel, lang)}</span>
									<span className={styles.dots}></span>
									<span className={styles.price}>
										<strong>{tier.fullPassPrice}</strong>
									</span>
								</li>
							))}
						</ul>
						<h4>{partyPassLabel}</h4>
						<ul>
							{priceTiers.map((tier, i) => (
								<li key={i} className={styles.priceItem}>
									<span>{localize(tier.dateLabel, lang)}</span>
									<span className={styles.dots}></span>
									<span className={styles.price}>
										<strong>{tier.partyPassPrice}</strong>
									</span>
								</li>
							))}
						</ul>
						<h4>{classPassLabel}</h4>
						<ul>
							{priceTiers.map((tier, i) => (
								<li key={i} className={styles.priceItem}>
									<span>{localize(tier.dateLabel, lang)}</span>
									<span className={styles.dots}></span>
									<span className={styles.price}>
										<strong>{tier.classPassPrice}</strong>
									</span>
								</li>
							))}
						</ul>
					</div>
				)}

				{(subsidyInfo || subsidyEligibility) && (
					<div className={styles.subsidize}>
						<h3>{subsidySectionTitle}</h3>
						{localize(subsidyInfo, lang)?.map((line) => (
							<p
								key={line}
								dangerouslySetInnerHTML={{
									__html: line.replace('{{email}}', mtlbaljamEmail),
								}}
							/>
						))}
						{subsidyEligibility && (localize(subsidyEligibility, lang)?.length ?? 0) > 0 && (
							<>
								<h4>{eligibilityTitle}</h4>
								<ul>
									{localize(subsidyEligibility, lang)?.map((line) => (
										<li key={line}>
											<p>{line}</p>
										</li>
									))}
								</ul>
							</>
						)}
					</div>
				)}

				{(termsBodyHtml || termsUrl) && (
					<div className={styles.terms}>
						<h3>{localize(labels?.termsAndConditions, lang) ?? (lang === 'fr' ? 'Conditions générales' : 'Terms & Conditions')}</h3>
						{termsBodyHtml ? (
							<p dangerouslySetInnerHTML={{ __html: termsBodyHtml }} />
						) : (
							termsUrl && termsLink && (
								<p>
									<a href={termsUrl} target="_blank" rel="noreferrer noopener">
										{termsLink}
									</a>
								</p>
							)
						)}
					</div>
				)}
			</div>
		</section>
	)
}
