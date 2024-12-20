import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import {
	Judges,
	Sponsors,
	MixAndMatch,
	SlowBal,
	Intro,
	PureBal,
} from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://www.mtlbaljam.org/${lang}/2025`

	if (lang === 'fr') {
		return {
			title: 'Compétitions | MTL BAL JAM 2025',
			description:
				"Compétitions du MTL BAL JAM, l'évenement de balboa à Montréal le 20-21-22 juin 2025",
			alternates: {
				canonical: `${siteUrl}/competitions`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM 2025 logo',
						width: 512,
						height: 512,
					},
				],
				title: 'Compétitions | MTL BAL JAM 2025',
				locale: 'fr',
				description:
					"Compétitions du MTL BAL JAM, l'évenement de balboa à Montréal le 20-21-22 juin 2025",
			},
		}
	} else {
		return {
			title: 'Competitions | MTL BAL JAM 2025',
			description:
				'Competitions of MTL BAL JAM, a Balboa event happening in Montreal on June 20-21-22 2025',
			alternates: {
				canonical: `${siteUrl}/competitions`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM 2025 logo',
						width: 512,
						height: 512,
					},
				],
				title: 'Competitions | MTL BAL JAM 2025',
				locale: 'en',
				description:
					'Competitions of MTL BAL JAM, a Balboa event happening in Montreal on June 20-21-22 2025',
			},
		}
	}
}

export default async function MbjCompetitions({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { mbj2025 } = await getDictionary(lang)

	return (
		<>
			<Intro competitionsPage={mbj2025.competitionsPage} />
			<MixAndMatch
				mixAndMatchSection={mbj2025.competitionsPage.mixAndMatchSection}
			/>
			<PureBal pureBalSection={mbj2025.competitionsPage.pureBalSection} />
			<SlowBal slowBalSection={mbj2025.competitionsPage.slowBalSection} />
			<Judges judgesSection={mbj2025.competitionsPage.judgesSection} />
			<Sponsors sponsorsSection={mbj2025.competitionsPage.sponsorsSection} />
		</>
	)
}
