import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Casa, Cenne } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params

	const siteUrl = `https://mtlbaljam.org/${lang}/2024`

	if (lang === 'fr') {
		return {
			title: 'Lieux | MTL BAL JAM 2024',
			description:
				"Lieux du MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			alternates: {
				canonical: `${siteUrl}/venue`,
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
				title: 'Lieux | MTL BAL JAM 2024',
				locale: 'fr',
				description:
					"Lieux du MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			},
		}
	} else {
		return {
			title: 'Venues | MTL BAL JAM 2024',
			description:
				'Venues for the MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			alternates: {
				canonical: `${siteUrl}/venue`,
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
				title: 'Venues | MTL BAL JAM 2024',
				locale: 'en',
				description:
					'Venues for the MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			},
		}
	}
}

export default async function MbjVenue({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { mbj2024 } = await getDictionary(lang)

	return (
		<>
			<Casa casa={mbj2024.venuePage.casa} />
			<Cenne cenne={mbj2024.venuePage.cenne} />
		</>
	)
}
