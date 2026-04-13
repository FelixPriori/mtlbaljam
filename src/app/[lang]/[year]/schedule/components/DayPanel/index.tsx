import type { Locales } from '@/i18n'
import { localize } from '@/lib/sanity/localize'
import type { ScheduleDay } from '../../scheduleUtils'
import { TIME_LABELS } from '../../scheduleUtils'
import EventBlock from '../EventBlock'
import styles from './styles.module.scss'

export default function DayPanel({
	day,
	lang,
	year,
	scheduleSoonLabel,
	venueLocation,
}: {
	day: ScheduleDay
	lang: Locales
	year: string
	scheduleSoonLabel: string | null
	venueLocation: string | null
}) {
	if (day.events.length === 0) {
		return (
			<div className={styles.empty}>
				<p>{scheduleSoonLabel ?? (lang === 'fr' ? 'Horaire à venir' : 'Schedule coming soon')}</p>
			</div>
		)
	}

	const hasRooms = day.rooms.length > 0
	const numCols = Math.max(day.rooms.length, 1)
	// Room columns: minimum 150px each so content isn't crushed on mobile.
	// The panelWrapper handles horizontal scroll when total width exceeds the viewport.
	const gridColumns = `44px repeat(${numCols}, minmax(220px, 1fr))`

	// Offset so row 1 of the visible grid = displayRowStart
	const offset = day.displayRowStart - 1
	const visibleLabels = TIME_LABELS.filter(
		({ row }) => row >= day.displayRowStart && row < day.displayRowEnd,
	)

	return (
		<div className={styles.scrollOuter}>
		<div className={styles.panelWrapper}>
			{hasRooms && (
				<div className={styles.trackHeader} style={{ gridTemplateColumns: gridColumns }}>
					<div className={styles.timeCol} />
					{day.rooms.map((room) => (
						<div key={room.key} className={styles.trackLabel}>
							{localize(room.label, lang)}
						</div>
					))}
				</div>
			)}
			<div
				className={styles.dayGrid}
				style={{ gridTemplateColumns: gridColumns }}
			>
				{/* Time labels */}
				{visibleLabels.map(({ row, label }) => (
					<div
						key={label}
						className={styles.timeLabel}
						style={{ gridRow: `${row - offset} / ${row - offset + 4}` }}
					>
						{label}
					</div>
				))}

				{/* Hour divider lines */}
				{visibleLabels.map(({ row, label }) => (
					<div
						key={`line-${label}`}
						className={styles.hourLine}
						style={{ gridRow: String(row - offset), gridColumn: '1 / -1' }}
					/>
				))}

				{/* Events */}
				{day.events.map((event) => (
					<EventBlock
						key={event._key ?? event.title?.en}
						event={event}
						lang={lang}
						year={year}
						venueLocation={venueLocation}
						rowOffset={offset}
					/>
				))}
			</div>
		</div>
		</div>
	)
}
