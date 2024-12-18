import { unstable_setRequestLocale } from 'next-intl/server'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Title, TravelBlog } from './sections'

type Props = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props) {
    const params = await props.params;
    unstable_setRequestLocale(params.locale)
    const siteUrl = `https://www.mtlbaljam.org/${params.locale}`

    if (params.locale === 'fr') {
		return {
			title: 'Visiter | MTL BAL JAM 2024',
			description:
				"Visiter MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			alternates: {
				canonical: `${siteUrl}/visiting`,
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
				title: 'Visiter | MTL BAL JAM 2024',
				locale: 'fr',
				description:
					"Visiter MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			},
		}
	} else {
		return {
			title: 'Visiting | MTL BAL JAM 2024',
			description:
				'Visiting MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			alternates: {
				canonical: `${siteUrl}/visiting`,
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
				title: 'Visiting | MTL BAL JAM 2024',
				locale: 'en',
				description:
					'Visiting MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			},
		}
	}
}

export default function MbjVisiting() {
	return (
		<>
			<Title />
			<TravelBlog />
		</>
	)
}
