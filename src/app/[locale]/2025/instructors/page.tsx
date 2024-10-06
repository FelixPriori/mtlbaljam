import { unstable_setRequestLocale } from 'next-intl/server'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { FirstInstructors } from './sections'

type Props = {
	params: { locale: string }
}

export async function generateMetadata({ params }: Props) {
	unstable_setRequestLocale(params.locale)
	const siteUrl = `https://www.mtlbaljam.org/${params.locale}/2025`

	if (params.locale === 'fr') {
		return {
			title: 'Instructeurs | MTL BAL JAM 2025',
			description:
				"Instructeurs du MTL BAL JAM, l'évenement de balboa à Montréal le 20-21-22 juin 2025",
			alternates: {
				canonical: `${siteUrl}/instructors`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM 2025 logo',
						width: 512,
						height: 512,
					},
				],
				title: 'Instructeurs | MTL BAL JAM 2025',
				locale: 'fr',
				description:
					"Instructeurs du MTL BAL JAM, l'évenement de balboa à Montréal le 20-21-22 juin 2025",
			},
		}
	} else {
		return {
			title: 'Instructors | MTL BAL JAM 2025',
			description:
				'Instructors of the MTL BAL JAM, a Balboa event happening in Montreal on June 20-21-22 2025',
			alternates: {
				canonical: `${siteUrl}/instructors`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM 2025 logo',
						width: 512,
						height: 512,
					},
				],
				title: 'Instructors | MTL BAL JAM 2025',
				locale: 'en',
				description:
					'Instructors of the MTL BAL JAM, a Balboa event happening in Montreal on June 20-21-22 2025',
			},
		}
	}
}

export default function MbjInstructors() {
	return (
		<>
			<FirstInstructors />
		</>
	)
}
