import { unstable_setRequestLocale } from 'next-intl/server'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { ComingSoon } from './sections'

type Props = {
	params: { locale: string }
}

export async function generateMetadata({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const siteUrl = `https://www.mtlbaljam.org/${params.locale}/2025`
	if (params.locale === 'fr') {
		return {
			title: 'À venir | MTL BAL JAM 2025',
			description: 'À venir - MTL BAL JAM 2025',
			alternates: {
				canonical: `${siteUrl}/coming-soon`,
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
				title: 'À venir | MTL BAL JAM 2025',
				locale: 'fr',
				description: 'À venir - MTL BAL JAM 2025',
			},
		}
	} else {
		return {
			title: 'Coming Soon | MTL BAL JAM 2025',
			description: 'Coming Soon - MTL BAL JAM 2025',
			alternates: {
				canonical: `${siteUrl}/coming-soon`,
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
				title: 'Coming Soon | MTL BAL JAM 2025',
				locale: 'en',
				description: 'Coming Soon - MTL BAL JAM 2025',
			},
		}
	}
}

export default function ComingSoonPage() {
	return (
		<>
			<ComingSoon />
		</>
	)
}
