import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Volunteering } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}`

	if (lang === 'fr') {
		return {
			title: 'Bénévolat | MTL BAL JAM',
			description: 'Faire du bénévolat pour MTL BAL JAM',
			alternates: {
				canonical: `${siteUrl}/volunteering`,
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
				title: 'Bénévolat | MTL BAL JAM',
				locale: 'fr',
				description: 'Faire du bénévolat pour MTL BAL JAM',
			},
		}
	} else {
		return {
			title: 'Volunteering | MTL BAL JAM',
			description: 'Volunteer for MTL BAL JAM',
			alternates: {
				canonical: `${siteUrl}/volunteering`,
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
				title: 'Volunteering | MTL BAL JAM',
				locale: 'en',
				description: 'Volunteer for MTL BAL JAM',
			},
		}
	}
}

export default async function MbjVolunteering({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { volunteeringPage } = await getDictionary(lang)

	return (
		<Volunteering volunteeringSection={volunteeringPage.volunteeringSection} />
	)
}
