import Favicon from '@/app/favicon.ico'

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
						url: '/og-image.png',
						alt: 'MTL BAL JAM logo',
						width: 1200,
						height: 630,
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
						url: '/og-image.png',
						alt: 'MTL BAL JAM logo',
						width: 1200,
						height: 630,
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
