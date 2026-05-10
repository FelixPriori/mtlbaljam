import Favicon from '@/app/favicon.ico'
import { Instructors, Music, Venue } from './sections'
import { Locales } from '@/i18n'
import { getDictionary } from '../dictionaries'

type Props = {
	params: Promise<{ lang: Locales }>
}

export async function generateMetadata(props: Props) {
	const { lang } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}/2025`

	if (lang === 'fr') {
		return {
			title: 'MTL BAL JAM 2025',
			description:
				"Évenement de balboa qui a eu lieu à Montréal / Tiohtià:ke le 20-21-22 juin 2025",
			alternates: { canonical: siteUrl },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: 'MTL BAL JAM 2025 logo', width: 1200, height: 630 }],
				title: 'MTL BAL JAM 2025',
				locale: 'fr',
				description: "Évenement de balboa qui a eu lieu à Montréal / Tiohtià:ke le 20-21-22 juin 2025",
			},
		}
	}

	return {
		title: 'MTL BAL JAM 2025',
		description:
			'Balboa event which happened in Montréal / Tiohtià:ke on June 20-21-22, 2025',
		alternates: { canonical: siteUrl },
		icons: [{ rel: 'icon', url: Favicon.src }],
		openGraph: {
			images: [{ url: '/og-image.png', alt: 'MTL BAL JAM 2025 logo', width: 1200, height: 630 }],
			title: 'MTL BAL JAM 2025',
			locale: 'en',
			description: 'Balboa event which happened in Montréal / Tiohtià:ke on June 20-21-22, 2025',
		},
	}
}

export default async function Event2025({
	params,
}: {
	params: Promise<{ lang: Locales }>
}) {
	const { lang } = await params
	const { mbj2025, iconAlts, socials } = await getDictionary(lang)

	return (
		<>
			<Instructors
				instructorsPage={mbj2025.instructorsPage}
				learnMoreText={mbj2025.homePage.instructorsSection.learnMore.text}
				lang={lang}
			/>
			<Venue
				venueSection={mbj2025.homePage.venueSection}
				competitionsSection={mbj2025.homePage.competitionsSection}
				iconAlts={iconAlts}
				lang={lang}
			/>
			<Music
				musicSection={mbj2025.homePage.musicSection}
				iconAlts={iconAlts}
				socials={socials}
				lang={lang}
			/>
		</>
	)
}
