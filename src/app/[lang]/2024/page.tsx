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
	const { homePage, iconAlts, socials } = await getDictionary(lang)

	return (
		<>
			<Instructors instructorsSection={homePage.instructorsSection} />
			<Venue
				venueSection={homePage.venueSection}
				scheduleSection={homePage.scheduleSection}
				iconAlts={iconAlts}
			/>
			<Music
				musicSection={homePage.musicSection}
				iconAlts={iconAlts}
				socials={socials}
			/>
		</>
	)
}
