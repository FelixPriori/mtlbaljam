import { cache } from 'react'
import Favicon from '@/app/favicon.ico'

import { EditionHome } from './sections'
import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { EDITIONS_FOR_NAV_QUERY, HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type {
	EDITIONS_FOR_NAV_QUERY_RESULT,
	HOME_PAGE_QUERY_RESULT,
	SITE_SETTINGS_QUERY_RESULT,
} from '@/sanity.types'
import { localize } from '@/lib/sanity/localize'
import { getHomeYear } from '@/lib/editions'
import { toPostalAddress } from '@/lib/schemaOrg'

type Props = {
	params: Promise<{ lang: Locales }>
}

const getHomeEdition = cache(async function getHomeEdition() {
	const [editions, siteSettings] = await Promise.all([
		sanityFetch<EDITIONS_FOR_NAV_QUERY_RESULT>(EDITIONS_FOR_NAV_QUERY),
		sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
	])
	const year = getHomeYear(editions ?? [], siteSettings?.currentEditionYear)
	const data =
		year != null ? await sanityFetch<HOME_PAGE_QUERY_RESULT>(HOME_PAGE_QUERY, { year }) : null
	return { year, data, siteSettings }
})

const parsePrice = (price: string | null | undefined) => {
	const match = price?.replace(/\s/g, '').match(/\d+(?:[.,]\d+)?/)
	const n = match ? Number(match[0].replace(',', '.')) : NaN
	return Number.isFinite(n) && n > 0 ? n : undefined
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const { year, data } = await getHomeEdition()
	const siteUrl = `https://mtlbaljam.org/${lang}`
	const date = localize(data?.displayDate, lang)

	const title =
		lang === 'fr'
			? `MTL BAL JAM ${year ?? ''} · Événement de Balboa · Montréal / Tiohtià:ke`
			: `MTL BAL JAM ${year ?? ''} · Balboa Dance Event · Montréal / Tiohtià:ke`
	const description =
		lang === 'fr'
			? `Week-end de danse Balboa à Montréal / Tiohtià:ke${date ? `, ${date}` : ''}. Instructeur.ice.s de classe mondiale, musique swing live, compétitions et soirées de danse sociale.`
			: `Balboa dance weekend in Montréal / Tiohtià:ke${date ? `, ${date}` : ''}. World-class instructors, live swing bands, competitions, and social dancing.`

	return {
		title,
		description,
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
			images: [{ url: '/og-image.png', alt: 'MTL BAL JAM logo', width: 1200, height: 630 }],
			title,
			locale: lang,
			description,
		},
		twitter: {
			card: 'summary_large_image',
		},
	}
}

export default async function MTLBALJAM({ params }: Props) {
	const { lang } = await params
	const { year, data, siteSettings } = await getHomeEdition()
	if (year == null || !data) return null

	const bands = data.bands ?? []
	const venue = data.venue ?? null

	const location = venue
		? {
				'@type': 'Place',
				name: venue.name,
				url: venue.website ?? undefined,
				address: toPostalAddress(venue.address),
				geo: venue.position
					? {
							'@type': 'GeoCoordinates',
							latitude: Number(venue.position.lat),
							longitude: Number(venue.position.lng),
						}
					: undefined,
			}
		: {
				'@type': 'Place',
				name: 'Montréal / Tiohtià:ke',
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Montréal',
					addressRegion: 'QC',
					addressCountry: 'CA',
				},
			}

	const offerUrl = data.registrationIsOpen
		? (data.registerUrl ?? siteSettings?.registrationUrl ?? null)
		: null
	const price = parsePrice(data.fullPassPrice)

	const eventSchema = {
		'@context': 'https://schema.org',
		'@type': 'DanceEvent',
		name: `MTL BAL JAM ${year}`,
		url: `https://mtlbaljam.org/${lang}`,
		startDate: data.startDate ?? undefined,
		endDate: data.endDate ?? undefined,
		eventStatus: 'https://schema.org/EventScheduled',
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		image: ['https://mtlbaljam.org/og-image.png'],
		inLanguage: lang,
		location,
		organizer: {
			'@type': 'Organization',
			name: 'Campus Balboa',
			url: `https://mtlbaljam.org/${lang}/about`,
			email: 'mtlbaljam@campusbalboa.org',
		},
		performer: bands.map(band => ({
			'@type': 'MusicGroup',
			name: band.name,
			description: band.schemaDescription ?? undefined,
			image: band.logo?.asset?.url ?? undefined,
		})),
		offers: offerUrl
			? {
					'@type': 'Offer',
					url: offerUrl,
					availability: 'https://schema.org/InStock',
					price,
					priceCurrency: 'CAD',
					validFrom: data.registrationOpenDate ?? undefined,
				}
			: undefined,
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
			<EditionHome data={data} siteSettings={siteSettings} year={String(year)} lang={lang} />
		</>
	)
}
