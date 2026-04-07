import Favicon from '@/app/favicon.ico'

import { Title, VisitingContent } from './sections'
import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { STATIC_PAGE_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import { localize } from '@/lib/sanity/localize'
import type { STATIC_PAGE_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'
import type { PortableTextBlock } from '@portabletext/types'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}`

	if (lang === 'fr') {
		return {
			title: 'Visiter | MTL BAL JAM',
			description: 'Visiter Montréal / Tiohtià:ke avec MTL BAL JAM',
			alternates: { canonical: `${siteUrl}/visiting` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: 'MTL BAL JAM logo', width: 1200, height: 630 }],
				title: 'Visiter | MTL BAL JAM',
				locale: 'fr',
				description: 'Visiter Montréal / Tiohtià:ke avec MTL BAL JAM',
			},
		}
	}
	return {
		title: 'Visiting | MTL BAL JAM',
		description: 'Visiting Montréal / Tiohtià:ke with MTL BAL JAM',
		alternates: { canonical: `${siteUrl}/visiting` },
		icons: [{ rel: 'icon', url: Favicon.src }],
		openGraph: {
			images: [{ url: '/og-image.png', alt: 'MTL BAL JAM logo', width: 1200, height: 630 }],
			title: 'Visiting | MTL BAL JAM',
			locale: 'en',
			description: 'Visiting Montréal / Tiohtià:ke with MTL BAL JAM',
		},
	}
}

export default async function MbjVisiting({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const [page, siteSettings] = await Promise.all([
		sanityFetch<STATIC_PAGE_QUERY_RESULT>(STATIC_PAGE_QUERY, { pageKey: 'visiting' }),
		sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
	])
	const labels = siteSettings?.labels ?? null

	const allBlocks = (localize(page?.content ?? null, lang) ?? []) as PortableTextBlock[]
	// First block is the h2 title — rendered by the Title hero section above
	const titleBlock = allBlocks[0] as { children?: Array<{ text?: string }> } | undefined
	const title = titleBlock?.children?.map(c => c.text ?? '').join('') ?? ''
	const contentBlocks = allBlocks.slice(1)

	return (
		<>
			<Title title={title} />
			<VisitingContent
				blocks={contentBlocks}
				foodImage={page?.foodSectionImage ?? null}
				sightseeingImage={page?.sightseeingSectionImage ?? null}
				mapUrl={page?.mapUrl ?? null}
				mapLabel={localize(page?.mapLabel ?? null, lang)}
				labels={labels}
				lang={lang}
			/>
		</>
	)
}
