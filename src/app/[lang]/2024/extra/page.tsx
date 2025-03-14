import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Bar, Shirt, Tour, Youlia } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://www.mtlbaljam.org/${lang}/2024`

	if (lang === 'fr') {
		return {
			title: 'Extra | MTL BAL JAM 2024',
			description:
				"Les extras du MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			alternates: {
				canonical: `${siteUrl}/extra`,
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
				title: 'Extra | MTL BAL JAM 2024',
				locale: 'fr',
				description:
					"Les extras du MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			},
		}
	} else {
		return {
			title: 'Extra | MTL BAL JAM 2024',
			description:
				'Extras of the MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			alternates: {
				canonical: `${siteUrl}/extra`,
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
				title: 'Extra | MTL BAL JAM 2024',
				locale: 'en',
				description:
					'Extras of  the MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
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
	const { mbj2024 } = await getDictionary(lang)

	return (
		<>
			<Youlia youlia={mbj2024.extrasPage.youlia} />
			<Tour tour={mbj2024.extrasPage.tour} />
			<Shirt shirt={mbj2024.extrasPage.shirt} lang={lang} />
			<Bar bar={mbj2024.extrasPage.bar} />
		</>
	)
}
