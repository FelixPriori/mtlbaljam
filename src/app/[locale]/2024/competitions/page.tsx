import { unstable_setRequestLocale } from 'next-intl/server'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Judges, Sponsors, MixAndMatch, Music, SlowBal } from './sections'

type Props = {
	params: { locale: string }
}

export async function generateMetadata({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const siteUrl = `https://www.mtlbaljam.org/${params.locale}/2024`

	if (params.locale === 'fr') {
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

export default function MbjCompetitions() {
	return (
		<>
			<MixAndMatch />
			<SlowBal />
			<Music />
			<Judges />
			<Sponsors />
		</>
	)
}
