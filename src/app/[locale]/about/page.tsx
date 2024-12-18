import { unstable_setRequestLocale } from 'next-intl/server'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Description, Staff } from './sections'
type Props = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props) {
    const params = await props.params;
    unstable_setRequestLocale(params.locale)
    const siteUrl = `https://www.mtlbaljam.org/${params.locale}`
    if (params.locale === 'fr') {
		return {
			title: 'À propos | MTL BAL JAM',
			description: 'À propos de MTL BAL JAM',
			alternates: {
				canonical: `${siteUrl}/about`,
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
				title: 'À propos | MTL BAL JAM',
				locale: 'fr',
				description: 'À propos de MTL BAL JAM',
			},
		}
	} else {
		return {
			title: 'About | MTL BAL JAM',
			description: 'About MTL BAL JAM',
			alternates: {
				canonical: `${siteUrl}/about`,
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
				title: 'About | MTL BAL JAM',
				locale: 'en',
				description: 'About MTL BAL JAM',
			},
		}
	}
}

export default function MbjAbout() {
	return (
		<>
			<Description />
			<Staff />
		</>
	)
}
