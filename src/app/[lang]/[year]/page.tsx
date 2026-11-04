import Favicon from '@/app/favicon.ico'

import { EditionHome } from '@/app/[lang]/sections'
import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { HOME_PAGE_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { HOME_PAGE_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'
import { localize } from '@/lib/sanity/localize'

type Props = {
	params: Promise<{ lang: Locales; year: string }>
}

export async function generateMetadata(props: Props) {
	const { lang, year } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}/${year}`

	if (lang === 'fr') {
		return {
			title: `MTL BAL JAM ${year}`,
			description: `MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			alternates: { canonical: siteUrl },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `MTL BAL JAM ${year}`,
				locale: 'fr',
				description: `MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			},
		}
	} else {
		return {
			title: `MTL BAL JAM ${year}`,
			description: `MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			alternates: { canonical: siteUrl },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `MTL BAL JAM ${year}`,
				locale: 'en',
				description: `MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			},
		}
	}
}

export default async function MbjYearHome({
	params,
}: {
	params: Promise<{ lang: Locales; year: string }>
}) {
	const { lang, year } = await params
	const [data, siteSettings] = await Promise.all([
		sanityFetch<HOME_PAGE_QUERY_RESULT>(HOME_PAGE_QUERY, { year: Number(year) }),
		sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
	])

	if (!data) return null
	return <EditionHome data={data} siteSettings={siteSettings} year={year} lang={lang} />
}
