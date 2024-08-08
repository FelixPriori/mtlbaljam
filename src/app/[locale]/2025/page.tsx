import { unstable_setRequestLocale } from 'next-intl/server'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { ComingSoon } from './coming-soon/sections'

type Props = {
	params: { locale: string }
}

export async function generateMetadata({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const siteUrl = `https://www.mtlbaljam.org/${params.locale}/2025`
	if (params.locale === 'fr') {
		return {
			title: 'MTL BAL JAM 2025',
			description: 'MTL BAL JAM 2025',
			alternates: {
				canonical: siteUrl,
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
				title: 'MTL BAL JAM 2025',
				locale: 'fr',
				description: 'MTL BAL JAM 2025',
			},
		}
	} else {
		return {
			title: 'MTL BAL JAM 2025',
			description: 'MTL BAL JAM 2025',
			alternates: {
				canonical: siteUrl,
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
				title: 'MTL BAL JAM 2025',
				locale: 'en',
				description: 'MTL BAL JAM 2025',
			},
		}
	}
}

export default function Event2025() {
	return (
		<>
			<ComingSoon />
		</>
	)
}
