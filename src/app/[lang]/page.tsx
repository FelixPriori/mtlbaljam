import Favicon from '@/app/favicon.ico'

import { MainSection, MusicSection, Venue } from './sections'
import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { HOME_PAGE_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'
import { localize } from '@/lib/sanity/localize'

const CURRENT_YEAR = 2026

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}`
	if (lang === 'fr') {
		return {
			title: 'MTL BAL JAM 2026 — Événement Balboa · Montréal / Tiohtià:ke, 19–21 juin',
			description:
				'Week-end de Balboa à Montréal / Tiohtià:ke, 19–21 juin 2026. Instructeurs de classe mondiale, musique live swing, compétitions et soirées sociales. Inscrivez-vous!',
			alternates: {
				canonical: siteUrl,
				languages: {
					fr: 'https://mtlbaljam.org/fr',
					en: 'https://mtlbaljam.org/en',
					'x-default': 'https://mtlbaljam.org/en',
				},
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: '/og-image.png',
						alt: 'MTL BAL JAM logo',
						width: 1200,
						height: 630,
					},
				],
				title: 'MTL BAL JAM 2026 — Événement Balboa · Montréal / Tiohtià:ke, 19–21 juin',
				locale: 'fr',
				description:
					'Week-end de Balboa à Montréal / Tiohtià:ke, 19–21 juin 2026. Instructeurs de classe mondiale, musique live swing, compétitions et soirées sociales. Inscrivez-vous!',
			},
			twitter: {
				card: 'summary_large_image',
			},
		}
	} else {
		return {
			title: 'MTL BAL JAM 2026 — Balboa Dance Event · Montréal / Tiohtià:ke, June 19–21',
			description:
				'Balboa dance weekend in Montréal / Tiohtià:ke, June 19–21, 2026. World-class instructors, live swing bands, competitions, and social dancing. Register now!',
			alternates: {
				canonical: siteUrl,
				languages: {
					en: 'https://mtlbaljam.org/en',
					fr: 'https://mtlbaljam.org/fr',
					'x-default': 'https://mtlbaljam.org/en',
				},
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: '/og-image.png',
						alt: 'MTL BAL JAM logo',
						width: 1200,
						height: 630,
					},
				],
				title: 'MTL BAL JAM 2026 — Balboa Dance Event · Montréal / Tiohtià:ke, June 19–21',
				locale: 'en',
				description:
					'Balboa dance weekend in Montréal / Tiohtià:ke, June 19–21, 2026. World-class instructors, live swing bands, competitions, and social dancing. Register now!',
			},
			twitter: {
				card: 'summary_large_image',
			},
		}
	}
}

export default async function MTLBALJAM({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const [data, siteSettings] = await Promise.all([
		sanityFetch<HOME_PAGE_QUERY_RESULT>(HOME_PAGE_QUERY, { year: CURRENT_YEAR }),
		sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
	])

	const homePage = data?.homePage ?? null
	const bands = data?.bands ?? []
	const labels = siteSettings?.labels ?? null

	const band0 = bands[0]
	const band1 = bands[1]

	const eventSchema = {
		'@context': 'https://schema.org',
		'@type': 'DanceEvent',
		name: 'MTL BAL JAM 2026',
		url: `https://mtlbaljam.org/${lang}`,
		startDate: '2026-06-19T09:00:00-04:00',
		endDate: '2026-06-21T23:59:00-04:00',
		eventStatus: 'https://schema.org/EventScheduled',
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		image: ['https://mtlbaljam.org/og-image.png', 'https://mtlbaljam.org/legacy-band.png'],
		inLanguage: lang,
		location: {
			'@type': 'Place',
			name: 'Montréal / Tiohtià:ke',
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Montréal',
				addressRegion: 'QC',
				addressCountry: 'CA',
			},
		},
		organizer: {
			'@type': 'Organization',
			name: 'Campus Balboa',
			url: `https://mtlbaljam.org/${lang}/about`,
			email: 'mtlbaljam@campusbalboa.org',
		},
		performer: [
			band0 && {
				'@type': 'MusicGroup',
				name: band0.name,
				description: band0.schemaDescription ?? undefined,
				image: 'https://mtlbaljam.org/legacy-band-promo.png',
			},
			band1 && {
				'@type': 'MusicGroup',
				name: band1.name,
				description: band1.schemaDescription ?? undefined,
				image: 'https://mtlbaljam.org/johancsik.png',
			},
		].filter(Boolean),
		offers: {
			'@type': 'AggregateOffer',
			url: 'https://mtlbaljam2026.dancecamps.org/booking.php',
			availability: 'https://schema.org/InStock',
			lowPrice: 210,
			highPrice: 280,
			priceCurrency: 'CAD',
			validFrom: '2026-02-03',
		},
		description:
			lang === 'fr'
				? 'MTL BAL JAM est un événement de danse Balboa à Montréal / Tiohtià:ke.'
				: 'MTL BAL JAM is a Balboa dance event in Montréal / Tiohtià:ke.',
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
			/>
			{homePage && (
				<>
					<MainSection
						groups={homePage.featuredInstructorGroups ?? []}
						sectionTitle={localize(homePage.instructorSectionTitle, lang)}
						linkText={localize(homePage.instructorLinkText, lang)}
						labels={labels}
						year={String(CURRENT_YEAR)}
						lang={lang}
					/>
					<Venue
						featuredSponsors={homePage.featuredSponsors ?? []}
						sponsorSectionTitle={localize(homePage.sponsorSectionTitle, lang)}
						sponsorNoteText={localize(homePage.sponsorNoteText, lang)}
						venueSectionTitle={localize(homePage.venueSectionTitle, lang)}
						venueLearnMoreText={localize(homePage.venueLearnMoreText, lang)}
						labels={labels}
						year={String(CURRENT_YEAR)}
						lang={lang}
					/>
					<MusicSection
						bands={bands}
						sectionTitle={localize(homePage.musicSectionTitle, lang)}
						learnMoreText={localize(homePage.musicLearnMoreText, lang)}
						year={String(CURRENT_YEAR)}
						lang={lang}
						siteSettings={siteSettings}
					/>
				</>
			)}
		</>
	)
}
