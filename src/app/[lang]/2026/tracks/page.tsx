import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Locales } from '@/i18n'
import { getDictionary } from '../../dictionaries'
import { Level, Tracks } from './sections'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params

	const siteUrl = `https://www.mtlbaljam.org/${lang}/2026`

	if (lang === 'fr') {
		return {
			title: 'Tracks | MTL BAL JAM 2026',
			description:
				"Tracks du MTL BAL JAM, l'évenement de balboa à Montréal le 19-20-21 juin 2026",
			alternates: {
				canonical: `${siteUrl}/tracks`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM 2026 logo',
						width: 512,
						height: 512,
					},
				],
				title: 'Tracks | MTL BAL JAM 2026',
				locale: 'fr',
				description:
					"Tracks du MTL BAL JAM, l'évenement de balboa à Montréal le 19-20-21 juin 2026",
			},
		}
	} else {
		return {
			title: 'Tracks | MTL BAL JAM 2026',
			description:
				'Tracks for the MTL BAL JAM, a Balboa event happening in Montreal on June 19-20-21 2026',
			alternates: {
				canonical: `${siteUrl}/tracks`,
			},
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [
					{
						url: BigOG.src,
						alt: 'MTL BAL JAM 2026 logo',
						width: 512,
						height: 512,
					},
				],
				title: 'Tracks | MTL BAL JAM 2026',
				locale: 'en',
				description:
					'Tracks for the MTL BAL JAM, a Balboa event happening in Montreal on June 19-20-21 2026',
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
	const { mbj2026 } = await getDictionary(lang)

	return (
		<>
			<Level levelSection={mbj2026.tracksPage.level} />
			<Tracks tracksPage={mbj2026.tracksPage} />
			{/* <ClassDescriptions tracksPage={mbj2026.tracksPage} /> */}
		</>
	)
}
