import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Band, DJs } from './sections'
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
			title: 'Musique | MTL BAL JAM 2024',
			description:
				"Musique pour MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			alternates: {
				canonical: `${siteUrl}/music`,
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
				title: 'Musique | MTL BAL JAM 2024',
				locale: 'fr',
				description:
					"Musique pour MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			},
		}
	} else {
		return {
			title: 'Music | MTL BAL JAM 2024',
			description:
				'Music for the MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			alternates: {
				canonical: `${siteUrl}/music`,
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
				title: 'Music | MTL BAL JAM 2024',
				locale: 'en',
				description:
					'Music for the MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			},
		}
	}
}

export default async function MbjMusic({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { mbj2024 } = await getDictionary(lang)

	return (
		<>
			<Band liveMusic={mbj2024.musicPage.liveMusic} />
			<DJs djMusic={mbj2024.musicPage.djMusic} />
		</>
	)
}
