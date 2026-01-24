import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Bag, Shirt, Towel } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://www.mtlbaljam.org/${lang}/2026`

	if (lang === 'fr') {
		return {
			title: 'Extra | MTL BAL JAM 2026',
			description:
				"Extras du MTL BAL JAM, l'évenement de balboa à Montréal le 19-20-21 juin 2026",
			alternates: {
				canonical: `${siteUrl}/extra`,
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
				title: 'Extras | MTL BAL JAM 2026',
				locale: 'fr',
				description:
					"Extras du MTL BAL JAM, l'évenement de balboa à Montréal le 19-20-21 juin 2026",
			},
		}
	} else {
		return {
			title: 'Extras | MTL BAL JAM 2026',
			description:
				'Extras for the MTL BAL JAM, a Balboa event happening in Montreal on June 19-20-21 2026',
			alternates: {
				canonical: `${siteUrl}/extra`,
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
				title: 'Extras | MTL BAL JAM 2026',
				locale: 'en',
				description:
					'Extras for the MTL BAL JAM, a Balboa event happening in Montreal on June 19-20-21 2026',
			},
		}
	}
}

export default async function MbjExtra({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { mbj2026 } = await getDictionary(lang)

	return (
		<>
			<Shirt shirt={mbj2026.extrasPage.shirt} lang={lang} />
			<Bag bag={mbj2026.extrasPage.shoebag} lang={lang} />
			<Towel towel={mbj2026.extrasPage.towel} />
		</>
	)
}
