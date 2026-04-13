import Favicon from '@/app/favicon.ico'

import { Locales } from '@/i18n'
import { sanityFetch } from '@/lib/sanity/fetch'
import { SCHEDULE_QUERY, SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { SCHEDULE_QUERY_RESULT, SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'
import { groupEventsByDay } from './scheduleUtils'
import { localize } from '@/lib/sanity/localize'
import Schedule from './sections/Schedule'

type Props = {
	params: Promise<{ lang: Locales; year: string }>
}

export async function generateMetadata(props: Props) {
	const { lang, year } = await props.params
	const siteUrl = `https://mtlbaljam.org/${lang}/${year}`

	if (lang === 'fr') {
		return {
			title: `Horaire | MTL BAL JAM ${year}`,
			description: `Horaire du MTL BAL JAM ${year}, l'événement de balboa à Montréal / Tiohtià:ke`,
			alternates: { canonical: `${siteUrl}/schedule` },
			icons: [{ rel: 'icon', url: Favicon.src }],
			openGraph: {
				images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
				title: `Horaire | MTL BAL JAM ${year}`,
				locale: 'fr',
				description: `Horaire du MTL BAL JAM ${year}, l'événement de balboa à Montréal / Tiohtià:ke`,
			},
		}
	}

	return {
		title: `Schedule | MTL BAL JAM ${year}`,
		description: `Schedule for MTL BAL JAM ${year}, a Balboa dance event in Montréal / Tiohtià:ke`,
		alternates: { canonical: `${siteUrl}/schedule` },
		icons: [{ rel: 'icon', url: Favicon.src }],
		openGraph: {
			images: [{ url: '/og-image.png', alt: `MTL BAL JAM ${year} logo`, width: 1200, height: 630 }],
			title: `Schedule | MTL BAL JAM ${year}`,
			locale: 'en',
			description: `Schedule for MTL BAL JAM ${year}, a Balboa dance event in Montréal / Tiohtià:ke`,
		},
	}
}

export default async function SchedulePage({
	params,
}: {
	params: Promise<{ lang: Locales; year: string }>
}) {
	const { lang, year } = await params

	const [data, siteSettings] = await Promise.all([
		sanityFetch<SCHEDULE_QUERY_RESULT>(SCHEDULE_QUERY, { year: Number(year) }),
		sanityFetch<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY),
	])

	const rawEvents = data?.scheduleEvents ?? []
	const rawRooms = data?.rooms ?? []
	const startDate = data?.startDate ?? null
	const endDate = data?.endDate ?? null
	const nightCutoffHour = data?.nightCutoffHour ?? null
	const days = groupEventsByDay(rawEvents, rawRooms, startDate, endDate, nightCutoffHour)

	const labels = siteSettings?.labels ?? null
	const scheduleTitle = localize(labels?.schedule, lang)
	const scheduleSoonLabel = localize(labels?.scheduleSoon, lang)

	// Build a venue label for calendar links: prefer address, fall back to name
	const venueLocation = data?.venueAddress ?? data?.venueName ?? null

	return (
		<Schedule
			days={days}
			lang={lang}
			year={year}
			scheduleTitle={scheduleTitle}
			scheduleSoonLabel={scheduleSoonLabel}
			venueLocation={venueLocation}
		/>
	)
}
