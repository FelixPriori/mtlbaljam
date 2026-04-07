import Favicon from '@/app/favicon.ico'

import { Band, DJs } from './sections'
import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { MUSIC_QUERY } from '@/lib/sanity/queries'
import type { MUSIC_QUERY_RESULT } from '@/sanity.types'

type Props = {
	params: Promise<{ lang: Locales; year: string }>
}

export async function generateMetadata(props: Props) {
	const { lang, year } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}/${year}`

	if (lang === 'fr') {
		return {
			title: `Musique | MTL BAL JAM ${year}`,
			description: `Musique pour MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/music` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Musique | MTL BAL JAM ${year}`,
				locale: 'fr',
				description: `Musique pour MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			},
		}
	} else {
		return {
			title: `Music | MTL BAL JAM ${year}`,
			description: `Music for MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/music` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Music | MTL BAL JAM ${year}`,
				locale: 'en',
				description: `Music for MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			},
		}
	}
}

export default async function MbjMusic({
	params,
}: {
	params: Promise<{ lang: Locales; year: string }>
}) {
	const { lang, year } = await params
	const data = await sanityFetch<MUSIC_QUERY_RESULT>(MUSIC_QUERY, {
		year: Number(year),
	})

	const bands = data?.bands ?? []
	const djs = data?.djs ?? []

	const musicSchema = [
		...bands.map((band) => ({
			'@context': 'https://schema.org',
			'@type': 'MusicGroup',
			name: band.name,
			description: band.schemaDescription ?? undefined,
			genre: 'Swing',
			image: band.logo?.asset?.url,
			url: band.link ?? undefined,
			location: { '@type': 'Place', name: 'Montréal / Tiohtià:ke, QC, Canada' },
		})),
		...djs.map((dj) => ({
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: dj.name,
			description: dj.schemaDescription ?? undefined,
			jobTitle: 'Swing DJ',
			image: dj.logo?.asset?.url,
		})),
	]

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(musicSchema) }}
			/>
			<Band bands={bands} lang={lang} />
			<DJs djs={djs} lang={lang} />
		</>
	)
}
