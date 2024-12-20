import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Title, TravelBlog } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://www.mtlbaljam.org/${lang}`

	if (lang === 'fr') {
		return {
			title: 'Visiter | MTL BAL JAM 2024',
			description:
				"Visiter MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			alternates: {
				canonical: `${siteUrl}/visiting`,
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
				title: 'Visiter | MTL BAL JAM 2024',
				locale: 'fr',
				description:
					"Visiter MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			},
		}
	} else {
		return {
			title: 'Visiting | MTL BAL JAM 2024',
			description:
				'Visiting MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			alternates: {
				canonical: `${siteUrl}/visiting`,
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
				title: 'Visiting | MTL BAL JAM 2024',
				locale: 'en',
				description:
					'Visiting MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			},
		}
	}
}

export default async function MbjVisiting({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { visitingPage } = await getDictionary(lang)

	return (
		<>
			<Title visitingPage={visitingPage} />
			<TravelBlog travelBlogSection={visitingPage.travelBlogSection} />
		</>
	)
}
