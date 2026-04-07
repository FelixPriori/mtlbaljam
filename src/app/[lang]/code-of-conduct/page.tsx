import Favicon from '@/app/favicon.ico'

import { Values } from './sections'
import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { STATIC_PAGE_QUERY } from '@/lib/sanity/queries'
import { localize } from '@/lib/sanity/localize'
import type { STATIC_PAGE_QUERY_RESULT } from '@/sanity.types'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}`

	if (lang === 'fr') {
		return {
			title: 'Code de conduite | MTL BAL JAM',
			description: 'Code de conduite de MTL BAL JAM',
			alternates: { canonical: `${siteUrl}/code-of-conduct` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: 'MTL BAL JAM logo', width: 1200, height: 630 }],
				title: 'Code de conduite | MTL BAL JAM',
				locale: 'fr',
				description: 'Code de conduite de MTL BAL JAM',
			},
		}
	}
	return {
		title: 'Code of Conduct | MTL BAL JAM',
		description: "MTL BAL JAM's Code of Conduct",
		alternates: { canonical: `${siteUrl}/code-of-conduct` },
		icons: [{ rel: 'icon', url: Favicon.src }],
		openGraph: {
			images: [{ url: '/og-image.png', alt: 'MTL BAL JAM logo', width: 1200, height: 630 }],
			title: 'Code of Conduct | MTL BAL JAM',
			locale: 'en',
			description: "MTL BAL JAM's Code of Conduct",
		},
	}
}

export default async function MbjCodeOfConduct({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const page = await sanityFetch<STATIC_PAGE_QUERY_RESULT>(STATIC_PAGE_QUERY, { pageKey: 'code-of-conduct' })

	const blocks = (localize(page?.content ?? null, lang) ?? []) as import('@portabletext/types').PortableTextBlock[]

	return <Values blocks={blocks} />
}
