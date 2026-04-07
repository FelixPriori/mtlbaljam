import Favicon from '@/app/favicon.ico'

import { Cats } from './sections'
import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { VENUE_QUERY } from '@/lib/sanity/queries'
import type { VENUE_QUERY_RESULT } from '@/sanity.types'

type Props = {
	params: Promise<{ lang: Locales; year: string }>
}

export async function generateMetadata(props: Props) {
	const { lang, year } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}/${year}`

	if (lang === 'fr') {
		return {
			title: `Lieux | MTL BAL JAM ${year}`,
			description: `Lieux du MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/venue` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Lieux | MTL BAL JAM ${year}`,
				locale: 'fr',
				description: `Lieux du MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			},
		}
	} else {
		return {
			title: `Venues | MTL BAL JAM ${year}`,
			description: `Venues for MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/venue` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Venues | MTL BAL JAM ${year}`,
				locale: 'en',
				description: `Venues for MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			},
		}
	}
}

export default async function MbjVenue({
	params,
}: {
	params: Promise<{ lang: Locales; year: string }>
}) {
	const { lang, year } = await params
	const data = await sanityFetch<VENUE_QUERY_RESULT>(VENUE_QUERY, { year: Number(year) })
	const venue = data?.venue
	if (!venue) return null

	const venueSchema = {
		'@context': 'https://schema.org',
		'@type': 'Place',
		name: venue.name,
		url: venue.website ?? undefined,
		image: venue.photo?.asset?.url,
		address: {
			'@type': 'PostalAddress',
			streetAddress: '1956 Rue Frontenac',
			addressLocality: 'Montréal',
			addressRegion: 'QC',
			postalCode: 'H2K 2Z1',
			addressCountry: 'CA',
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: venue.position?.lat,
			longitude: venue.position?.lng,
		},
		description: venue.description?.en?.join(' '),
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(venueSchema) }}
			/>
			<Cats venue={venue} lang={lang} />
		</>
	)
}
