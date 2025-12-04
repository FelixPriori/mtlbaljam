import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { MainSection, Venue } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from './dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://www.mtlbaljam.org/${lang}`
	if (lang === 'fr') {
		return {
			title: 'MTL BAL JAM 2026',
			description: 'MTL BAL JAM 2026',
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
				title: 'MTL BAL JAM 2026',
				locale: 'fr',
				description: 'MTL BAL JAM 2026',
			},
		}
	} else {
		return {
			title: 'MTL BAL JAM 2026',
			description: 'MTL BAL JAM 2026',
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
				title: 'MTL BAL JAM 2026',
				locale: 'en',
				description: 'MTL BAL JAM 2026',
			},
		}
	}
}

export default async function MTLBALJAM({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { mainPage, mbj2025, mbj2026, iconAlts, comingSoon } =
		await getDictionary(lang)

	return (
		<>
			<MainSection mainPage={mainPage} />
			<Venue
				workshopsSection={mbj2025.homePage.workshopsSection}
				venueSection={mbj2026.homePage.venueSection}
				iconAlts={iconAlts}
				comingSoon={comingSoon}
			/>
		</>
	)
}
