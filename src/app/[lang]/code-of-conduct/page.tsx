import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Values, Protocol } from './sections'
import { Locale, Locales } from '@/i18n'
import { getDictionary } from '../dictionaries'

type Props = {
	params: Promise<{ lang: Locale }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://www.mtlbaljam.org/${lang}`

	if (lang === 'fr') {
		return {
			title: 'Code de conduite | MTL BAL JAM',
			description: 'Code de conduite de MTL BAL JAM',
			alternates: {
				canonical: `${siteUrl}/code-of-conduct`,
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
				title: 'Code de conduite | MTL BAL JAM',
				locale: 'fr',
				description: 'Code de conduite de MTL BAL JAM',
			},
		}
	} else {
		return {
			title: 'Code of Conduct | MTL BAL JAM',
			description: "MTL BAL JAM's Code of Conduct",
			alternates: {
				canonical: `${siteUrl}/code-of-conduct`,
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
				title: 'Code of Conduct | MTL BAL JAM',
				locale: 'en',
				description: "MTL BAL JAM's Code of Conduct",
			},
		}
	}
}

export default async function MbjCodeOfConduct({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { codePage } = await getDictionary(lang)

	return (
		<>
			<Values valuesSection={codePage.valuesSection} />
			<Protocol protocolSection={codePage.protocolSection} />
		</>
	)
}
