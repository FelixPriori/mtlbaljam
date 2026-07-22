import Favicon from '@/app/favicon.ico'

import { Gallery } from './sections'
import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { GALLERY_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import { localize } from '@/lib/sanity/localize'
import type { GALLERY_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}`

	if (lang === 'fr') {
		return {
			title: 'Galerie | MTL BAL JAM',
			description: 'Galerie de photos du MTL BAL JAM, l\'évenement de balboa à Montréal / Tiohtià:ke',
			alternates: { canonical: `${siteUrl}/gallery` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: 'MTL BAL JAM logo', width: 1200, height: 630 }],
				title: 'Galerie | MTL BAL JAM',
				locale: 'fr',
				description: 'Galerie de photos du MTL BAL JAM, l\'évenement de balboa à Montréal / Tiohtià:ke',
			},
		}
	} else {
		return {
			title: 'Gallery | MTL BAL JAM',
			description: 'Photo gallery for MTL BAL JAM, a Balboa event in Montréal / Tiohtià:ke',
			alternates: { canonical: `${siteUrl}/gallery` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: 'MTL BAL JAM logo', width: 1200, height: 630 }],
				title: 'Gallery | MTL BAL JAM',
				locale: 'en',
				description: 'Photo gallery for MTL BAL JAM, a Balboa event in Montréal / Tiohtià:ke',
			},
		}
	}
}

export default async function MbjGallery({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const [albums, siteSettings] = await Promise.all([
		sanityFetch<GALLERY_QUERY_RESULT>(GALLERY_QUERY),
		sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
	])
	if (!albums || albums.length === 0) return null

	const title =
		localize(siteSettings?.labels?.gallery, lang) ?? (lang === 'fr' ? 'Galerie' : 'Gallery')

	return <Gallery albums={albums} title={title} lang={lang} />
}
