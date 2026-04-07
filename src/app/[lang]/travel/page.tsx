import Favicon from '@/app/favicon.ico'

import { Travel } from './sections'
import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { STATIC_PAGE_QUERY } from '@/lib/sanity/queries'
import { localize } from '@/lib/sanity/localize'
import type { STATIC_PAGE_QUERY_RESULT } from '@/sanity.types'
import type { PortableTextBlock } from '@portabletext/types'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}`

	if (lang === 'fr') {
		return {
			title: 'Voyagement | MTL BAL JAM',
			description: 'Voyager pour MTL BAL JAM',
			alternates: { canonical: `${siteUrl}/travel` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: 'MTL BAL JAM logo', width: 1200, height: 630 }],
				title: 'Voyagement | MTL BAL JAM',
				locale: 'fr',
				description: 'Voyager pour MTL BAL JAM',
			},
		}
	}
	return {
		title: 'Travel | MTL BAL JAM',
		description: 'Traveling to MTL BAL JAM',
		alternates: { canonical: `${siteUrl}/travel` },
		icons: [{ rel: 'icon', url: Favicon.src }],
		openGraph: {
			images: [{ url: '/og-image.png', alt: 'MTL BAL JAM logo', width: 1200, height: 630 }],
			title: 'Travel | MTL BAL JAM',
			locale: 'en',
			description: 'Travel to MTL BAL JAM',
		},
	}
}

export default async function MbjTravel({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const page = await sanityFetch<STATIC_PAGE_QUERY_RESULT>(STATIC_PAGE_QUERY, { pageKey: 'travel' })

	const blocks = (localize(page?.content ?? null, lang) ?? []) as PortableTextBlock[]

	return <Travel blocks={blocks} />
}
