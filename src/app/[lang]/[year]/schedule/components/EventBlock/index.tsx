import type { Locales } from '@/i18n'
import { localize } from '@/lib/sanity/localize'
import type { ScheduleEvent } from '../../scheduleUtils'
import { formatTimeEDT, formatGCalDate } from '../../scheduleUtils'
import styles from './styles.module.scss'

const SHOW_CALENDAR = new Set(['class', 'social', 'competition', 'extra'])

export default function EventBlock({
	event,
	lang,
	year,
	venueLocation,
	rowOffset = 0,
}: {
	event: ScheduleEvent
	lang: Locales
	year: string
	venueLocation: string | null
	rowOffset?: number
}) {
	const title = localize(event.title, lang) ?? ''
	const startStr = formatTimeEDT(event.startDate, lang)
	const endStr = formatTimeEDT(event.endDate, lang)
	const showCalendar = event.type != null && SHOW_CALENDAR.has(event.type)

	// Prefer event-specific venue, fall back to edition venue
	const locationStr =
		event.location?.address ?? event.location?.name ?? venueLocation ?? 'Montréal / Tiohtià:ke'

	const gCalUrl = showCalendar
		? `https://calendar.google.com/calendar/render?action=TEMPLATE` +
		  `&text=${encodeURIComponent(`MTL BAL JAM — ${title}`)}` +
		  `&dates=${formatGCalDate(event.startDate)}/${formatGCalDate(event.endDate)}` +
		  `&location=${encodeURIComponent(locationStr)}` +
		  `&ctz=America%2FToronto`
		: null

	const icalUrl = showCalendar && event._key ? `/api/ical/${year}/${event._key}` : null

	const rowSpan = event.gridRowEnd - event.gridRowStart
	const performer = event.musicRef?.name ?? event.instructorRef?.name

	return (
		<div
			className={styles.eventBlock}
			data-type={event.type ?? 'other'}
			data-span={rowSpan}
			style={{
				gridRow: `${event.gridRowStart - rowOffset} / ${event.gridRowEnd - rowOffset}`,
				gridColumn: event.gridColumn,
				'--overlap-total': event.overlapTotal,
				'--overlap-lane': event.overlapLane,
			} as React.CSSProperties}
		>
			<div className={styles.inner}>
				<div className={styles.topRow}>
					<p className={styles.time}>
						{startStr} – {endStr}
					</p>
					{(gCalUrl || icalUrl) && (
						<div className={styles.calLinks}>
							{gCalUrl && (
								<a
									href={gCalUrl}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.calLink}
								>
									+ Google
								</a>
							)}
							{icalUrl && (
								<a href={icalUrl} download className={styles.calLink}>
									+ iCal
								</a>
							)}
						</div>
					)}
				</div>
				<p className={styles.title}>{title}</p>
				{performer && <p className={styles.instructor}>{performer}</p>}
			</div>
		</div>
	)
}
