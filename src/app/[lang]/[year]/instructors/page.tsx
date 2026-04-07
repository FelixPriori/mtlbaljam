import Favicon from '@/app/favicon.ico'

import { InstructorsSection } from './sections'
import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { INSTRUCTORS_QUERY } from '@/lib/sanity/queries'
import type { INSTRUCTORS_QUERY_RESULT } from '@/sanity.types'

type Props = {
	params: Promise<{ lang: Locales; year: string }>
}

export async function generateMetadata(props: Props) {
	const { lang, year } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}/${year}`

	if (lang === 'fr') {
		return {
			title: `Instructeurs | MTL BAL JAM ${year}`,
			description: `Instructeurs du MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/instructors` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Instructeurs | MTL BAL JAM ${year}`,
				locale: 'fr',
				description: `Instructeurs du MTL BAL JAM ${year}, l'évenement de balboa à Montréal / Tiohtià:ke`,
			},
		}
	} else {
		return {
			title: `Instructors | MTL BAL JAM ${year}`,
			description: `Instructors for MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/instructors` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Instructors | MTL BAL JAM ${year}`,
				locale: 'en',
				description: `Instructors for MTL BAL JAM ${year}, a Balboa event in Montréal / Tiohtià:ke`,
			},
		}
	}
}

export default async function MbjInstructors({
	params,
}: {
	params: Promise<{ lang: Locales; year: string }>
}) {
	const { lang, year } = await params
	const data = await sanityFetch<INSTRUCTORS_QUERY_RESULT>(INSTRUCTORS_QUERY, {
		year: Number(year),
	})

	const instructors = data?.instructors ?? []
	const instructorsSchema = instructors.map((instructor) => ({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: instructor.name,
		description: instructor.schemaDescription ?? undefined,
		jobTitle: 'Balboa Instructor',
		image: instructor.cutoutImage?.asset?.url,
	}))

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(instructorsSchema) }}
			/>
			<InstructorsSection instructors={instructors} lang={lang} />
		</>
	)
}
