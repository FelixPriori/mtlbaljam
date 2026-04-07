import Favicon from '@/app/favicon.ico'

import { Tickets } from './sections'
import { sanityFetch } from '@/lib/sanity/fetch'
import { REGISTRATION_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { REGISTRATION_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'
import { Locales } from '@/i18n'

type Props = {
	params: Promise<{ lang: Locales; year: string }>
}

export async function generateMetadata(props: Props) {
	const { lang, year } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}/${year}`

	if (lang === 'fr') {
		return {
			title: `Inscription | MTL BAL JAM ${year}`,
			description: `Inscription au MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/registration` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Inscription | MTL BAL JAM ${year}`,
				locale: 'fr',
				description: `Inscription au MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			},
		}
	} else {
		return {
			title: `Registration | MTL BAL JAM ${year}`,
			description: `Register for MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/registration` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Registration | MTL BAL JAM ${year}`,
				locale: 'en',
				description: `Register for MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			},
		}
	}
}

export default async function MbjRegistration({
	params,
}: {
	params: Promise<{ lang: Locales; year: string }>
}) {
	const { lang, year } = await params
	const [data, settings] = await Promise.all([
		sanityFetch<REGISTRATION_QUERY_RESULT>(REGISTRATION_QUERY, { year: Number(year) }),
		sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
	])
	const labels = settings?.labels ?? null
	return (
		<>
			<Tickets registrationPage={data?.registrationPage ?? null} labels={labels} lang={lang} />
		</>
	)
}
