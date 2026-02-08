import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Locales } from '@/i18n'
import { getDictionary } from '../../dictionaries'
import { Level, Tracks } from './sections'
import ClassDescriptions from './sections/ClassDescriptions'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params

	const siteUrl = `https://mtlbaljam.org/${lang}/2025`

	if (lang === 'fr') {
		return {
			title: 'Tracks | MTL BAL JAM 2025',
			description:
				"Tracks du MTL BAL JAM, l'évenement de balboa à Montréal le 20-21-22 juin 2025",
			alternates: {
				canonical: `${siteUrl}/tracks`,
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
				title: 'Tracks | MTL BAL JAM 2025',
				locale: 'fr',
				description:
					"Tracks du MTL BAL JAM, l'évenement de balboa à Montréal le 20-21-22 juin 2025",
			},
		}
	} else {
		return {
			title: 'Tracks | MTL BAL JAM 2025',
			description:
				'Tracks for the MTL BAL JAM, a Balboa event happening in Montreal on June 20-21-22 2025',
			alternates: {
				canonical: `${siteUrl}/tracks`,
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
				title: 'Tracks | MTL BAL JAM 2025',
				locale: 'en',
				description:
					'Tracks for the MTL BAL JAM, a Balboa event happening in Montreal on June 20-21-22 2025',
			},
		}
	}
}

export default async function MbjTracks({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { mbj2025 } = await getDictionary(lang)

	return (
		<>
			<Level levelSection={mbj2025.tracksPage.level} />
			<Tracks tracksPage={mbj2025.tracksPage} />
			<ClassDescriptions tracksPage={mbj2025.tracksPage} />
		</>
	)
}
