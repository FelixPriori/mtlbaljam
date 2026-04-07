import Favicon from '@/app/favicon.ico'

import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { TRACKS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { TRACKS_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'
import { Level, Tracks } from './sections'

type Props = {
	params: Promise<{ lang: Locales; year: string }>
}

export async function generateMetadata(props: Props) {
	const { lang, year } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}/${year}`

	if (lang === 'fr') {
		return {
			title: `Tracks | MTL BAL JAM ${year}`,
			description: `Tracks du MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/tracks` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Tracks | MTL BAL JAM ${year}`,
				locale: 'fr',
				description: `Tracks du MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			},
		}
	} else {
		return {
			title: `Tracks | MTL BAL JAM ${year}`,
			description: `Tracks for MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/tracks` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Tracks | MTL BAL JAM ${year}`,
				locale: 'en',
				description: `Tracks for MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			},
		}
	}
}

export default async function MbjTracks({
	params,
}: {
	params: Promise<{ lang: Locales; year: string }>
}) {
	const { lang, year } = await params
	const [data, settings] = await Promise.all([
		sanityFetch<TRACKS_QUERY_RESULT>(TRACKS_QUERY, { year: Number(year) }),
		sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
	])
	const labels = settings?.labels ?? null

	return (
		<>
			<Level levelInfo={data?.levelInfo ?? null} levelInfoConcepts={data?.levelInfoConcepts ?? null} labels={labels} lang={lang} />
			<Tracks tracks={data?.tracks ?? []} tracksPageDescription={data?.tracksPageDescription ?? null} labels={labels} lang={lang} />
		</>
	)
}
