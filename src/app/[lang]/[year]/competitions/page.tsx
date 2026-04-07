import Favicon from '@/app/favicon.ico'

import { Intro, CompetitionSection, Judges } from './sections'
import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { COMPETITIONS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { COMPETITIONS_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

type Props = {
	params: Promise<{ lang: Locales; year: string }>
}

export async function generateMetadata(props: Props) {
	const { lang, year } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}/${year}`

	if (lang === 'fr') {
		return {
			title: `Compétitions | MTL BAL JAM ${year}`,
			description: `Compétitions du MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/competitions` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Compétitions | MTL BAL JAM ${year}`,
				locale: 'fr',
				description: `Compétitions du MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			},
		}
	} else {
		return {
			title: `Competitions | MTL BAL JAM ${year}`,
			description: `Competitions of MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/competitions` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Competitions | MTL BAL JAM ${year}`,
				locale: 'en',
				description: `Competitions of MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			},
		}
	}
}

export default async function MbjCompetitions({
	params,
}: {
	params: Promise<{ lang: Locales; year: string }>
}) {
	const { lang, year } = await params
	const [data, settings] = await Promise.all([
		sanityFetch<COMPETITIONS_QUERY_RESULT>(COMPETITIONS_QUERY, { year: Number(year) }),
		sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
	])
	const labels = settings?.labels ?? null
	const scheduleNote = data?.scheduleNote ?? null
	const competitionNote = data?.competitionNote ?? null
	const musicTitle = data?.musicTitle ?? null
	const musicDescription = data?.musicDescription ?? null
	const competitions = data?.competitions ?? []
	const judges = data?.judges ?? []

	return (
		<>
			<Intro scheduleNote={scheduleNote} competitionNote={competitionNote} musicTitle={musicTitle} musicDescription={musicDescription} labels={labels} lang={lang} />
			{competitions.map((competition) => (
				<CompetitionSection key={competition.type} competition={competition} labels={labels} lang={lang} />
			))}
			<Judges judges={judges} labels={labels} lang={lang} />
		</>
	)
}
