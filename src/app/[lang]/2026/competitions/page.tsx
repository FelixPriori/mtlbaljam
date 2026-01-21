import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import {
	Judges,
	Sponsors,
	MixAndMatch,
	SlowBal,
	Intro,
	PureBal,
	Strictly,
} from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://www.mtlbaljam.org/${lang}/2026`

	if (lang === 'fr') {
		return {
			title: 'Compétitions | MTL BAL JAM 2026',
			description:
				"Compétitions du MTL BAL JAM, l'évenement de balboa à Montréal le 19-20-21 juin 2026",
			alternates: {
				canonical: `${siteUrl}/competitions`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM 2026 logo',
						width: 512,
						height: 512,
					},
				],
				title: 'Compétitions | MTL BAL JAM 2026',
				locale: 'fr',
				description:
					"Compétitions du MTL BAL JAM, l'évenement de balboa à Montréal le 19-20-21 juin 2026",
			},
		}
	} else {
		return {
			title: 'Competitions | MTL BAL JAM 2026',
			description:
				'Competitions of MTL BAL JAM, a Balboa event happening in Montreal on June 19-20-21 2026',
			alternates: {
				canonical: `${siteUrl}/competitions`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM 2026 logo',
						width: 512,
						height: 512,
					},
				],
				title: 'Competitions | MTL BAL JAM 2026',
				locale: 'en',
				description:
					'Competitions of MTL BAL JAM, a Balboa event happening in Montreal on June 19-20-21 2026',
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
	const { mbj2026 } = await getDictionary(lang)

	return (
		<>
			<Intro competitionsPage={mbj2026.competitionsPage} />
			<MixAndMatch
				mixAndMatchSection={mbj2026.competitionsPage.mixAndMatchSection}
			/>
			<Strictly strictlySection={mbj2026.competitionsPage.strictlySection} />
			{/* <PureBal pureBalSection={mbj2026.competitionsPage.pureBalSection} /> */}
			{/* <SlowBal slowBalSection={mbj2026.competitionsPage.slowBalSection} /> */}
			<Judges judgesSection={mbj2026.competitionsPage.judgesSection} />
			{/* <Sponsors sponsorsSection={mbj2026.competitionsPage.sponsorsSection} /> */}
		</>
	)
}
