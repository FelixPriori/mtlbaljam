import Favicon from '@/app/favicon.ico'

import { InstructorsSection } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}/2026`

	if (lang === 'fr') {
		return {
			title: 'Instructeurs | MTL BAL JAM 2026',
			description:
				"Instructeurs du MTL BAL JAM, l'évenement de balboa à Montréal / Tiohtià:ke le 19-20-21 juin 2026",
			alternates: {
				canonical: `${siteUrl}/instructors`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: '/og-image.png',
						alt: 'MTL BAL JAM 2026 logo',
						width: 1200,
						height: 630,
					},
				],
				title: 'Instructeurs | MTL BAL JAM 2026',
				locale: 'fr',
				description:
					"Instructeurs du MTL BAL JAM, l'évenement de balboa à Montréal / Tiohtià:ke le 19-20-21 juin 2026",
			},
		}
	} else {
		return {
			title: 'Instructors | MTL BAL JAM 2026',
			description:
				'Instructors of the MTL BAL JAM, a Balboa event happening in Montréal / Tiohtià:ke on June 19-20-21, 2026',
			alternates: {
				canonical: `${siteUrl}/instructors`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: '/og-image.png',
						alt: 'MTL BAL JAM 2026 logo',
						width: 1200,
						height: 630,
					},
				],
				title: 'Instructors | MTL BAL JAM 2026',
				locale: 'en',
				description:
					'Instructors of the MTL BAL JAM, a Balboa event happening in Montréal / Tiohtià:ke on June 19-20-21, 2026',
			},
		}
	}
}

export default async function MbjInstructors({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { mbj2026, schema } = await getDictionary(lang)

	const instructorsSchema = [
		{
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'Fancy',
			description: schema.instructors.fancy.description,
			jobTitle: schema.instructors.jobTitle,
			image: 'https://mtlbaljam.org/fancy.jpg',
		},
		{
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'Albert',
			description: schema.instructors.albert.description,
			jobTitle: schema.instructors.jobTitle,
			image: 'https://mtlbaljam.org/albert.jpg',
		},
		{
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'Irina',
			description: schema.instructors.irina.description,
			jobTitle: schema.instructors.jobTitle,
			image: 'https://mtlbaljam.org/irina.jpg',
		},
		{
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'Natalia',
			description: schema.instructors.natalia.description,
			jobTitle: schema.instructors.jobTitle,
			image: 'https://mtlbaljam.org/natalia.jpg',
		},
	]

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(instructorsSchema) }}
			/>
			<InstructorsSection instructorsPage={mbj2026.instructorsPage} />
		</>
	)
}
