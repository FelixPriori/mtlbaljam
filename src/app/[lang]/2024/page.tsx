import { Instructors, Music, Venue } from './sections'
import Favicon from '@/app/favicon.ico'
import BigOG from '@/app/opengraph-image.png'
import { Locales } from '@/i18n'
import { getDictionary } from '../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://www.mtlbaljam.org/${lang}/2024`

	if (lang === 'fr') {
		return {
			title: 'MTL BAL JAM 2024',
			description:
				'Évenement de balboa qui a eu lieu à Montréal/Tiohtià:ke le 21-22-23 juin 2024',
			alternates: {
				canonical: siteUrl,
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
				title: 'MTL BAL JAM 2024',
				locale: 'fr',
				description:
					'Évenement de balboa qui a eu lieu à Montréal/Tiohtià:ke le 21-22-23 juin 2024',
			},
		}
	} else {
		return {
			title: 'MTL BAL JAM',
			description:
				'Balboa event which happened in Montreal/Tiohtià:ke on June 21-22-23, 2024',
			alternates: {
				canonical: siteUrl,
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
				title: 'MTL BAL JAM 2024',
				locale: 'en',
				description:
					'Balboa event which happened in Montreal/Tiohtià:ke on June 21-22-23, 2024',
			},
		}
	}
}

export default async function Event2024({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { mbj2024, iconAlts, socials } = await getDictionary(lang)

	return (
		<>
			<Instructors instructorsSection={mbj2024.homePage.instructorsSection} />
			<Venue
				venueSection={mbj2024.homePage.venueSection}
				scheduleSection={mbj2024.homePage.scheduleSection}
				iconAlts={iconAlts}
			/>
			<Music
				musicSection={mbj2024.homePage.musicSection}
				iconAlts={iconAlts}
				socials={socials}
			/>
		</>
	)
}
