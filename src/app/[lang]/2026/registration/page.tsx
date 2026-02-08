import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { SaveTheDate, Tickets } from './sections'
import { getDictionary } from '../../dictionaries'
import { Locales } from '@/i18n'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}/2026`

	if (lang === 'fr') {
		return {
			title: 'Inscription | MTL BAL JAM 2026',
			description:
				"Inscription au MTL BAL JAM, l'évenement de balboa à Montréal le 19-20-21 juin 2026",
			alternates: {
				canonical: `${siteUrl}/registration`,
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
				title: 'Inscription | MTL BAL JAM 2026',
				locale: 'fr',
				description:
					"Inscription au MTL BAL JAM, l'évenement de balboa à Montréal le 19-20-21 juin 2026",
			},
		}
	} else {
		return {
			title: 'Registration | MTL BAL JAM 2026',
			description:
				'Register for the MTL BAL JAM, a Balboa event happening in Montreal on June 19-20-21 2026',
			alternates: {
				canonical: `${siteUrl}/registration`,
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
				title: 'Registration | MTL BAL JAM 2026',
				locale: 'en',
				description:
					'Register for the MTL BAL JAM, a Balboa event happening in Montreal on June 19-20-21 2026',
			},
		}
	}
}

export default async function MbjRegistration({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { mbj2026 } = await getDictionary(lang)
	return (
		<>
			{/* <SaveTheDate registrationPage={mbj2026.registrationPage} /> */}
			<Tickets tickets={mbj2026.registrationPage.tickets} />
		</>
	)
}
