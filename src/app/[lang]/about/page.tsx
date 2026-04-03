import Favicon from '@/app/favicon.ico'

import { Description, Staff } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}`
	if (lang === 'fr') {
		return {
			title: 'À propos | MTL BAL JAM',
			description:
				'MTL Bal Jam est un week-end de Balboa à Montréal / Tiohtià:ke organisé par Campus Balboa, un organisme sans but lucratif fondé en 2023. Rencontrez l\'équipe derrière l\'événement.',
			alternates: {
				canonical: `${siteUrl}/about`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: '/og-image.png',
						alt: 'MTL BAL JAM logo',
						width: 1200,
						height: 630,
					},
				],
				title: 'À propos | MTL BAL JAM',
				locale: 'fr',
				description:
					'MTL Bal Jam est un week-end de Balboa à Montréal / Tiohtià:ke organisé par Campus Balboa, un organisme sans but lucratif fondé en 2023. Rencontrez l\'équipe derrière l\'événement.',
			},
		}
	} else {
		return {
			title: 'About | MTL BAL JAM',
			description:
				'MTL Bal Jam is a Balboa dance weekend in Montréal / Tiohtià:ke organized by Campus Balboa, a nonprofit founded in 2023. Meet the team behind the event.',
			alternates: {
				canonical: `${siteUrl}/about`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: '/og-image.png',
						alt: 'MTL BAL JAM logo',
						width: 1200,
						height: 630,
					},
				],
				title: 'About | MTL BAL JAM',
				locale: 'en',
				description:
					'MTL Bal Jam is a Balboa dance weekend in Montréal / Tiohtià:ke organized by Campus Balboa, a nonprofit founded in 2023. Meet the team behind the event.',
			},
		}
	}
}

export default async function MbjAbout({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { aboutPage, landAcknowledgement, iconAlts, schema } = await getDictionary(lang)

	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'NGO',
		name: 'Campus Balboa',
		url: `https://mtlbaljam.org/${lang}/about`,
		email: 'info@campusbalboa.org',
		foundingDate: '2023',
		logo: 'https://mtlbaljam.org/mtl-bal-jam-logo-white.png',
		description: schema.organization.description,
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
			<Description
				aboutPage={aboutPage}
				landAcknowledgement={landAcknowledgement}
				iconAlts={iconAlts}
			/>
			<Staff staffSection={aboutPage.staffSection} />
		</>
	)
}
