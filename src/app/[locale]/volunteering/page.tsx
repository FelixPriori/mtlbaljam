import { unstable_setRequestLocale } from 'next-intl/server'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Volunteering } from './sections'

type Props = {
	params: { locale: string }
}

export async function generateMetadata({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const siteUrl = `https://www.mtlbaljam.org/${params.locale}`

	if (params.locale === 'fr') {
		return {
			title: 'Bénévolat | MTL BAL JAM',
			description: 'Faire du bénévolat pour MTL BAL JAM',
			alternates: {
				canonical: `${siteUrl}/volunteering`,
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
				title: 'Bénévolat | MTL BAL JAM',
				locale: 'fr',
				description: 'Faire du bénévolat pour MTL BAL JAM',
			},
		}
	} else {
		return {
			title: 'Volunteering | MTL BAL JAM',
			description: 'Volunteer for MTL BAL JAM',
			alternates: {
				canonical: `${siteUrl}/volunteering`,
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
				title: 'Volunteering | MTL BAL JAM',
				locale: 'en',
				description: 'Volunteer for MTL BAL JAM',
			},
		}
	}
}

export default function MbjVolunteering() {
	return <Volunteering />
}
