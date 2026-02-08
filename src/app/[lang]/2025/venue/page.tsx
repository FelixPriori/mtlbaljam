import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Cats } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params

	const siteUrl = `https://mtlbaljam.org/${lang}/2025`

	if (lang === 'fr') {
		return {
			title: 'Lieux | MTL BAL JAM 2025',
			description:
				"Lieux du MTL BAL JAM, l'évenement de balboa à Montréal le 20-21-22 juin 2025",
			alternates: {
				canonical: `${siteUrl}/venue`,
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
				title: 'Lieux | MTL BAL JAM 2025',
				locale: 'fr',
				description:
					"Lieux du MTL BAL JAM, l'évenement de balboa à Montréal le 20-21-22 juin 2025",
			},
		}
	} else {
		return {
			title: 'Venues | MTL BAL JAM 2025',
			description:
				'Venues for the MTL BAL JAM, a Balboa event happening in Montreal on June 20-21-22 2025',
			alternates: {
				canonical: `${siteUrl}/venue`,
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
				title: 'Venues | MTL BAL JAM 2025',
				locale: 'en',
				description:
					'Venues for the MTL BAL JAM, a Balboa event happening in Montreal on June 20-21-22 2025',
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
	const { mbj2025 } = await getDictionary(lang)

	return (
		<>
			<Cats cats={mbj2025.venuePage.cats} />
		</>
	)
}
