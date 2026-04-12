import Favicon from '@/app/favicon.ico'

import { ExtraItem } from './sections'
import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { EXTRAS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { EXTRAS_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

type Props = {
	params: Promise<{ lang: Locales; year: string }>
}

export async function generateMetadata(props: Props) {
	const { lang, year } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}/${year}`

	if (lang === 'fr') {
		return {
			title: `Extra | MTL BAL JAM ${year}`,
			description: `Extras du MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/extra` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Extras | MTL BAL JAM ${year}`,
				locale: 'fr',
				description: `Extras du MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			},
		}
	} else {
		return {
			title: `Extras | MTL BAL JAM ${year}`,
			description: `Extras for MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/extra` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Extras | MTL BAL JAM ${year}`,
				locale: 'en',
				description: `Extras for MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			},
		}
	}
}

export default async function MbjExtra({
	params,
}: {
	params: Promise<{ lang: Locales; year: string }>
}) {
	const { lang, year } = await params
	const [data, settings] = await Promise.all([
		sanityFetch<EXTRAS_QUERY_RESULT>(EXTRAS_QUERY, { year: Number(year) }),
		sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
	])
	const labels = settings?.labels ?? null
	const contactEmail = settings?.contactEmail ?? null
	const extras = data?.extras ?? []

	return (
		<>
			{extras.map((extra) => (
				<ExtraItem key={extra.key} extra={extra} labels={labels} lang={lang} contactEmail={contactEmail} />
			))}
		</>
	)
}
