import Favicon from '@/app/favicon.ico'

import { MainSection, MusicSection, Venue } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from './dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}`
	if (lang === 'fr') {
		return {
			title: 'MTL Bal Jam 2026 — Événement Balboa · Montréal / Tiohtià:ke, 19–21 juin',
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
				title: 'MTL Bal Jam 2026 — Événement Balboa · Montréal / Tiohtià:ke, 19–21 juin',
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
			title: 'MTL Bal Jam 2026 — Balboa Dance Event · Montréal / Tiohtià:ke, June 19–21',
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
				title: 'MTL Bal Jam 2026 — Balboa Dance Event · Montréal / Tiohtià:ke, June 19–21',
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
	const { mainPage, mbj2026, iconAlts, socials, schema } =
		await getDictionary(lang)

	const eventSchema = {
		'@context': 'https://schema.org',
		'@type': 'DanceEvent',
		name: 'MTL Bal Jam 2026',
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
			{
				'@type': 'MusicGroup',
				name: 'Michaël Srey Legacy Band',
				description: schema.performers.legacyBand.description,
				image: 'https://mtlbaljam.org/legacy-band-promo.png',
				url: 'https://www.michaelsrey.com/',
			},
			{
				'@type': 'MusicGroup',
				name: 'Michael Johancsik Swing Orchestra',
				description: schema.performers.johancsik.description,
				image: 'https://mtlbaljam.org/johancsik.png',
				url: 'https://michaeljohancsik.com/about-me/',
			},
		],
		offers: {
			'@type': 'Offer',
			url: 'https://mtlbaljam2026.dancecamps.org/booking.php',
			availability: 'https://schema.org/InStock',
		},
		description: schema.event.description,
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
			/>
			<MainSection mainPage={mainPage} />
			<Venue
				sponsorsSection={mbj2026.homePage.sponsorsSection}
				venueSection={mbj2026.homePage.venueSection}
				iconAlts={iconAlts}
			/>
			<MusicSection
				musicSection={mbj2026.homePage.musicSection}
				iconAlts={iconAlts}
				socials={socials}
			/>
		</>
	)
}
