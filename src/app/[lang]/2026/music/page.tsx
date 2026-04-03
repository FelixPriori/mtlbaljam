import Favicon from '@/app/favicon.ico'

import { Band, DJs } from './sections'
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
			title: 'Musique | MTL BAL JAM 2026',
			description:
				"Musique pour MTL BAL JAM, l'évenement de balboa à Montréal / Tiohtià:ke le 19-20-21 juin 2026",
			alternates: {
				canonical: `${siteUrl}/music`,
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
				title: 'Musique | MTL BAL JAM 2026',
				locale: 'fr',
				description:
					"Musique pour MTL BAL JAM, l'évenement de balboa à Montréal / Tiohtià:ke le 19-20-21 juin 2026",
			},
		}
	} else {
		return {
			title: 'Music | MTL BAL JAM 2026',
			description:
				'Music for the MTL BAL JAM, a Balboa event happening in Montréal / Tiohtià:ke on June 19-20-21, 2026',
			alternates: {
				canonical: `${siteUrl}/music`,
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
				title: 'Music | MTL BAL JAM 2026',
				locale: 'en',
				description:
					'Music for the MTL BAL JAM, a Balboa event happening in Montréal / Tiohtià:ke on June 19-20-21, 2026',
			},
		}
	}
}

export default async function MbjMusic({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { mbj2026, schema } = await getDictionary(lang)
	const { djs } = mbj2026.musicPage.djMusic

	const musicSchema = [
		{
			'@context': 'https://schema.org',
			'@type': 'MusicGroup',
			name: 'Michaël Srey Legacy Band',
			description: schema.performers.legacyBand.description,
			genre: 'Swing',
			image: 'https://mtlbaljam.org/legacy-band-promo.png',
			url: 'https://www.michaelsrey.com/',
			location: {
				'@type': 'Place',
				name: 'Montréal / Tiohtià:ke, QC, Canada',
			},
		},
		{
			'@context': 'https://schema.org',
			'@type': 'MusicGroup',
			name: 'Michael Johancsik Swing Orchestra',
			description: schema.performers.johancsik.description,
			genre: 'Swing',
			image: 'https://mtlbaljam.org/johancsik.png',
			url: 'https://michaeljohancsik.com/about-me/',
			location: {
				'@type': 'Place',
				name: 'Montréal / Tiohtià:ke, QC, Canada',
			},
		},
		...Object.values(djs).map(dj => ({
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: dj.djName,
			description: dj.biography,
			jobTitle: schema.djJobTitle,
			image: `https://mtlbaljam.org${dj.image.src}`,
		})),
	]

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(musicSchema) }}
			/>
			<Band liveMusic={mbj2026.musicPage.liveMusic} />
			<DJs djMusic={mbj2026.musicPage.djMusic} />
		</>
	)
}
