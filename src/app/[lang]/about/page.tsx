import Favicon from '@/app/favicon.ico'

import { Description, Staff } from './sections'
import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { STAFF_QUERY, STATIC_PAGE_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import { localize } from '@/lib/sanity/localize'
import type { STAFF_QUERY_RESULT, STATIC_PAGE_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'
import type { PortableTextBlock } from '@portabletext/types'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}`
	const aboutPage_ = await sanityFetch<STATIC_PAGE_QUERY_RESULT>(STATIC_PAGE_QUERY, { pageKey: 'about' })
	const title = localize(aboutPage_?.metaTitle ?? null, lang)
		?? (lang === 'fr' ? 'À propos | MTL BAL JAM' : 'About | MTL BAL JAM')
	const description = localize(aboutPage_?.metaDescription ?? null, lang)
		?? (lang === 'fr'
			? 'MTL BAL JAM est un week-end de Balboa à Montréal / Tiohtià:ke organisé par Campus Balboa, un organisme sans but lucratif fondé en 2023. Rencontrez l\'équipe derrière l\'événement.'
			: 'MTL BAL JAM is a Balboa dance weekend in Montréal / Tiohtià:ke organized by Campus Balboa, a nonprofit founded in 2023. Meet the team behind the event.')
	return {
		title,
		description,
		alternates: { canonical: `${siteUrl}/about` },
		icons: [{ rel: 'icon', url: Favicon.src }],
		openGraph: {
			images: [{ url: '/og-image.png', alt: 'MTL BAL JAM logo', width: 1200, height: 630 }],
			title,
			locale: lang,
			description,
		},
	}
}

export default async function MbjAbout({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const [staffMembers, aboutPage_, siteSettings] = await Promise.all([
		sanityFetch<STAFF_QUERY_RESULT>(STAFF_QUERY),
		sanityFetch<STATIC_PAGE_QUERY_RESULT>(STATIC_PAGE_QUERY, { pageKey: 'about' }),
		sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
	])

	const blocks = (localize(aboutPage_?.content ?? null, lang) ?? []) as PortableTextBlock[]

	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'NGO',
		name: 'Campus Balboa',
		url: `https://mtlbaljam.org/${lang}/about`,
		email: 'info@campusbalboa.org',
		foundingDate: '2023',
		logo: 'https://mtlbaljam.org/mtl-bal-jam-logo-white.png',
		description: lang === 'fr'
			? 'Campus Balboa est un organisme sans but lucratif fondé en 2023 à Montréal / Tiohtià:ke, dédié à la promotion de la danse Balboa.'
			: 'Campus Balboa is a nonprofit organization founded in 2023 in Montréal / Tiohtià:ke, dedicated to promoting Balboa dance.',
		location: {
			'@type': 'Place',
			name: 'Montréal / Tiohtià:ke, QC, Canada',
		},
		sameAs: [
			'https://www.facebook.com/MtlBalJam',
			'https://www.instagram.com/MTLBALJAM/',
		],
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
			/>
			<Description blocks={blocks} />
			<Staff
				title={localize(siteSettings?.labels?.ourTeam, lang) ?? (lang === 'fr' ? 'Notre équipe' : 'Our Team')}
				currentTeamTitle={localize(siteSettings?.labels?.currentTeam, lang) ?? (lang === 'fr' ? 'Équipe actuelle' : 'Current Team')}
				pastTeamTitle={localize(siteSettings?.labels?.pastTeam, lang) ?? (lang === 'fr' ? 'Ancienne équipe' : 'Past Team')}
				members={staffMembers}
				lang={lang}
			/>
		</>
	)
}
