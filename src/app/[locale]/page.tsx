import { unstable_setRequestLocale } from 'next-intl/server'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { MainSection } from './sections'

type Props = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props) {
    const params = await props.params;
    unstable_setRequestLocale(params.locale)
    const siteUrl = `https://www.mtlbaljam.org/${params.locale}`
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

export default function MTLBALJAM() {
	return (
		<>
			<MainSection />
		</>
	)
}
