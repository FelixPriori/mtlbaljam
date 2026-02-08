import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { ToMontreal, Transportation, Housing } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}`

	if (lang === 'fr') {
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

export default async function MbjTravel({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { travelPage } = await getDictionary(lang)
	return (
		<>
			<ToMontreal toMontreal={travelPage.toMontreal} />
			<Transportation transportation={travelPage.transportation} />
			<Housing housing={travelPage.housing} />
		</>
	)
}
