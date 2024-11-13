import { unstable_setRequestLocale } from 'next-intl/server'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { ToMontreal, ToTheEvent, Transportation, Housing } from './sections'

type Props = {
	params: { locale: string }
}

export async function generateMetadata({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const siteUrl = `https://www.mtlbaljam.org/${params.locale}`

	if (params.locale === 'fr') {
		return {
			title: 'Voyagement | MTL BAL JAM',
			description: 'Voyager pour MTL BAL JAM',
			alternates: {
				canonical: `${siteUrl}/travel`,
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
				title: 'Voyagement | MTL BAL JAM',
				locale: 'fr',
				description: 'Voyager pour MTL BAL JAM',
			},
		}
	} else {
		return {
			title: 'Travel | MTL BAL JAM',
			description: 'Traveling to MTL BAL JAM',
			alternates: {
				canonical: `${siteUrl}/travel`,
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
				title: 'Travel | MTL BAL JAM',
				locale: 'en',
				description: 'Travel to MTL BAL JAM',
			},
		}
	}
}

export default function MbjTravel() {
	return (
		<>
			<ToMontreal />
			{/* <ToTheEvent /> */}
			<Transportation />
			<Housing />
		</>
	)
}
