import Favicon from '@/app/favicon.ico'

import { Cats } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params

	const siteUrl = `https://mtlbaljam.org/${lang}/2026`

	if (lang === 'fr') {
		return {
			title: 'Lieux | MTL BAL JAM 2026',
			description:
				"Lieux du MTL BAL JAM, l'évenement de balboa à Montréal / Tiohtià:ke le 19-20-21 juin 2026",
			alternates: {
				canonical: `${siteUrl}/venue`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: '/og-image.png',
						alt: 'MTL BAL JAM 2026 logo',
						width: 1200,
						height: 630,
					},
				],
				title: 'Lieux | MTL BAL JAM 2026',
				locale: 'fr',
				description:
					"Lieux du MTL BAL JAM, l'évenement de balboa à Montréal / Tiohtià:ke le 19-20-21 juin 2026",
			},
		}
	} else {
		return {
			title: 'Venues | MTL BAL JAM 2026',
			description:
				'Venues for the MTL BAL JAM, a Balboa event happening in Montréal / Tiohtià:ke on June 19-20-21, 2026',
			alternates: {
				canonical: `${siteUrl}/venue`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: '/og-image.png',
						alt: 'MTL BAL JAM 2026 logo',
						width: 1200,
						height: 630,
					},
				],
				title: 'Venues | MTL BAL JAM 2026',
				locale: 'en',
				description:
					'Venues for the MTL BAL JAM, a Balboa event happening in Montréal / Tiohtià:ke on June 19-20-21, 2026',
			},
		}
	}
}

export default async function MbjVenue({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { mbj2026 } = await getDictionary(lang)
	const { cats } = mbj2026.venuePage

	const venueSchema = {
		'@context': 'https://schema.org',
		'@type': 'Place',
		name: cats.venueName,
		url: cats.venueWebsite,
		image: 'https://mtlbaljam.org/cats-corner-banner.png',
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
			latitude: cats.position.lat,
			longitude: cats.position.lng,
		},
		description: Array.isArray(cats.venueDescription)
			? cats.venueDescription.join(' ')
			: cats.venueDescription,
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(venueSchema) }}
			/>
			<Cats cats={mbj2026.venuePage.cats} />
		</>
	)
}
