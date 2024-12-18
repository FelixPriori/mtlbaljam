import { unstable_setRequestLocale } from 'next-intl/server'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Bar, Shirt, Tour, Youlia } from './sections'

type Props = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props) {
    const params = await props.params;
    unstable_setRequestLocale(params.locale)
    const siteUrl = `https://www.mtlbaljam.org/${params.locale}/2024`

    if (params.locale === 'fr') {
		return {
			title: 'Extra | MTL BAL JAM 2024',
			description:
				"Les extras du MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			alternates: {
				canonical: `${siteUrl}/extra`,
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
				title: 'Extra | MTL BAL JAM 2024',
				locale: 'fr',
				description:
					"Les extras du MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			},
		}
	} else {
		return {
			title: 'Extra | MTL BAL JAM 2024',
			description:
				'Extras of the MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			alternates: {
				canonical: `${siteUrl}/extra`,
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
				title: 'Extra | MTL BAL JAM 2024',
				locale: 'en',
				description:
					'Extras of  the MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			},
		}
	}
}

export default function MbjExtra() {
	return (
		<>
			<Youlia />
			<Tour />
			<Shirt />
			<Bar />
		</>
	)
}
