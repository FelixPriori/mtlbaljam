import { Instructors, Music, Venue } from './sections'
import { unstable_setRequestLocale } from 'next-intl/server'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'

type Props = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props) {
    const params = await props.params;
    unstable_setRequestLocale(params.locale)
    const siteUrl = `https://www.mtlbaljam.org/${params.locale}/2024`

    if (params.locale === 'fr') {
		return {
			title: 'MTL BAL JAM 2024',
			description:
				'Évenement de balboa qui a eu lieu à Montréal/Tiohtià:ke le 21-22-23 juin 2024',
			alternates: {
				canonical: siteUrl,
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
				title: 'MTL BAL JAM 2024',
				locale: 'fr',
				description:
					'Évenement de balboa qui a eu lieu à Montréal/Tiohtià:ke le 21-22-23 juin 2024',
			},
		}
	} else {
		return {
			title: 'MTL BAL JAM',
			description:
				'Balboa event which happened in Montreal/Tiohtià:ke on June 21-22-23, 2024',
			alternates: {
				canonical: siteUrl,
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
				title: 'MTL BAL JAM 2024',
				locale: 'en',
				description:
					'Balboa event which happened in Montreal/Tiohtià:ke on June 21-22-23, 2024',
			},
		}
	}
}

export default function Event2024() {
	return (
		<>
			<Instructors />
			<Venue />
			<Music />
		</>
	)
}
