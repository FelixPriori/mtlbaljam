import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Judges, Sponsors, MixAndMatch, Music, SlowBal } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://www.mtlbaljam.org/${lang}/2024`

	if (lang === 'fr') {
		return {
			title: 'Compétitions | MTL BAL JAM 2024',
			description:
				"Compétitions du MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			alternates: {
				canonical: `${siteUrl}/competitions`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM 2024 logo',
						width: 512,
						height: 512,
					},
				],
				title: 'Compétitions | MTL BAL JAM 2024',
				locale: 'fr',
				description:
					"Compétitions du MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			},
		}
	} else {
		return {
			title: 'Competitions | MTL BAL JAM 2024',
			description:
				'Competitions of MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			alternates: {
				canonical: `${siteUrl}/competitions`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM 2024 logo',
						width: 512,
						height: 512,
					},
				],
				title: 'Competitions | MTL BAL JAM 2024',
				locale: 'en',
				description:
					'Competitions of MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
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
	const { mbj2024 } = await getDictionary(lang)

	return (
		<>
			<MixAndMatch
				mixAndMatchSection={mbj2024.competitionsPage.mixAndMatchSection}
			/>
			<SlowBal slowBalSection={mbj2024.competitionsPage.slowBalSection} />
			<Music musicSection={mbj2024.competitionsPage.musicSection} />
			<Judges judgesSection={mbj2024.competitionsPage.judgesSection} />
			<Sponsors sponsorsSection={mbj2024.competitionsPage.sponsorsSection} />
		</>
	)
}
