import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { MainInstructors } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}/2024`

	if (lang === 'fr') {
		return {
			title: 'Instructeurs | MTL BAL JAM 2024',
			description:
				"Instructeurs du MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			alternates: {
				canonical: `${siteUrl}/instructors`,
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
				title: 'Instructeurs | MTL BAL JAM 2024',
				locale: 'fr',
				description:
					"Instructeurs du MTL BAL JAM, l'évenement de balboa à Montréal le 21-22-23 juin 2024",
			},
		}
	} else {
		return {
			title: 'Instructors | MTL BAL JAM 2024',
			description:
				'Instructors of the MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			alternates: {
				canonical: `${siteUrl}/instructors`,
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
				title: 'Instructors | MTL BAL JAM 2024',
				locale: 'en',
				description:
					'Instructors of the MTL BAL JAM, a Balboa event happening in Montreal on June 21-22-23 2024',
			},
		}
	}
}

export default async function MbjInstructors({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { mbj2024 } = await getDictionary(lang)

	return (
		<>
			<MainInstructors
				mainInstructors={mbj2024.instructorsPage.mainInstructors}
			/>
		</>
	)
}
