import ComingSoon from '../ComingSoon'
import MainSection from '../MainSection'
import MusicSection from '../Music'
import Venue from '../Venue'
import { localize } from '@/lib/sanity/localize'
import { registrationOpensText, showRegistrationOpensOn } from '@/lib/editions'
import type { HOME_PAGE_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'
import type { Locales } from '@/i18n'

export default function EditionHome({
	data,
	siteSettings,
	year,
	lang,
}: {
	data: NonNullable<HOME_PAGE_QUERY_RESULT>
	siteSettings: SITE_SETTINGS_QUERY_RESULT
	year: string
	lang: Locales
}) {
	const homePage = data.homePage ?? null
	const labels = siteSettings?.labels ?? null

	const comingSoonTitle = homePage
		? null
		: (localize(labels?.detailsComingSoon, lang) ??
			(lang === 'fr' ? 'Plus de détails à venir' : 'More details coming soon'))
	const opensOn =
		data.registrationOpenDate && showRegistrationOpensOn(data.registrationIsOpen, data.registrationOpenDate)
			? registrationOpensText(localize(labels?.registrationOpensOn, lang), data.registrationOpenDate, lang)
			: null

	return (
		<>
			<ComingSoon title={comingSoonTitle} text={opensOn} />
			<MainSection
				groups={homePage?.featuredInstructorGroups ?? []}
				sectionTitle={localize(homePage?.instructorSectionTitle, lang)}
				linkText={localize(homePage?.instructorLinkText, lang)}
				labels={labels}
				year={year}
				lang={lang}
			/>
			<Venue
				featuredSponsors={homePage?.featuredSponsors ?? []}
				sponsorSectionTitle={localize(homePage?.sponsorSectionTitle, lang)}
				sponsorNoteText={localize(homePage?.sponsorNoteText, lang)}
				venueSectionTitle={localize(homePage?.venueSectionTitle, lang)}
				venueLearnMoreText={localize(homePage?.venueLearnMoreText, lang)}
				labels={labels}
				year={year}
				lang={lang}
				hasVenue={data.venue != null}
				contactEmail={siteSettings?.contactEmail}
			/>
			<MusicSection
				bands={data.bands ?? []}
				sectionTitle={localize(homePage?.musicSectionTitle, lang)}
				learnMoreText={localize(homePage?.musicLearnMoreText, lang)}
				year={year}
				lang={lang}
				siteSettings={siteSettings}
			/>
		</>
	)
}
