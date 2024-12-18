import { unstable_setRequestLocale } from 'next-intl/server'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { SaveTheDate } from './sections'
// import { Tickets } from './sections'

type Props = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props) {
    const params = await props.params;
    unstable_setRequestLocale(params.locale)
    const siteUrl = `https://www.mtlbaljam.org/${params.locale}/2025`

    if (params.locale === 'fr') {
		return {
			title: 'Inscription | MTL BAL JAM 2025',
			description:
				"Inscription au MTL BAL JAM, l'évenement de balboa à Montréal le 20-21-22 juin 2025",
			alternates: {
				canonical: `${siteUrl}/registration`,
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
				title: 'Inscription | MTL BAL JAM 2025',
				locale: 'fr',
				description:
					"Inscription au MTL BAL JAM, l'évenement de balboa à Montréal le 20-21-22 juin 2025",
			},
		}
	} else {
		return {
			title: 'Registration | MTL BAL JAM 2025',
			description:
				'Register for the MTL BAL JAM, a Balboa event happening in Montreal on June 20-21-22 2025',
			alternates: {
				canonical: `${siteUrl}/registration`,
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
				title: 'Registration | MTL BAL JAM 2025',
				locale: 'en',
				description:
					'Register for the MTL BAL JAM, a Balboa event happening in Montreal on June 20-21-22 2025',
			},
		}
	}
}

export default function MbjRegistration() {
	return (
		<>
			{/* <Tickets /> */}
			<SaveTheDate />
		</>
	)
}
