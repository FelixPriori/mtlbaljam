import { unstable_setRequestLocale } from 'next-intl/server'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Values, Protocol } from './sections'

type Props = {
	params: { locale: string }
}

export async function generateMetadata({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const siteUrl = `https://www.mtlbaljam.org/${params.locale}`

	if (params.locale === 'fr') {
		return {
			title: 'Code de conduite | MTL BAL JAM',
			description: 'Code de conduite de MTL BAL JAM',
			alternates: {
				canonical: `${siteUrl}/code-of-conduct`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM logo',
						width: 512,
						height: 512,
					},
				],
				title: 'Code de conduite | MTL BAL JAM',
				locale: 'fr',
				description: 'Code de conduite de MTL BAL JAM',
			},
		}
	} else {
		return {
			title: 'Code of Conduct | MTL BAL JAM',
			description: "MTL BAL JAM's Code of Conduct",
			alternates: {
				canonical: `${siteUrl}/code-of-conduct`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM logo',
						width: 512,
						height: 512,
					},
				],
				title: 'Code of Conduct | MTL BAL JAM',
				locale: 'en',
				description: "MTL BAL JAM's Code of Conduct",
			},
		}
	}
}

export default function MbjCodeOfConduct() {
	return (
		<>
			<Values />
			<Protocol />
		</>
	)
}
