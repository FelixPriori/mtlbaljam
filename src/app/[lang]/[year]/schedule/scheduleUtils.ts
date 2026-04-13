import { formatInTimeZone } from 'date-fns-tz'
import { enCA, fr } from 'date-fns/locale'
import type { SCHEDULE_QUERY_RESULT } from '@/sanity.types'
import type { Locales } from '@/i18n'

const TZ = 'America/Toronto'

export type ScheduleEventRaw = NonNullable<
	NonNullable<SCHEDULE_QUERY_RESULT>['scheduleEvents']
>[number]

export type Room = { label: { en: string; fr: string } | null; key: string }

export type ScheduleEvent = ScheduleEventRaw & {
	startDate: Date
	endDate: Date
	gridRowStart: number
	gridRowEnd: number
	gridColumn: string
	/** 0-based index of this event within its overlap group */
	overlapLane: number
	/** Total number of overlapping events in this group */
	overlapTotal: number
}

export type ScheduleDay = {
	/** ISO date string of the calendar day, e.g. "2026-06-19" */
	date: string
	/** UTC timestamp of the schedule day start (10:00 AM local → UTC) */
	dayStart: Date
	/** UTC timestamp of the schedule day cutoff (e.g. 3:00 AM next day → UTC) */
	dayEnd: Date
	events: ScheduleEvent[]
	rooms: Room[]
	/** First grid row to render (snapped to hour boundary). Subtract this - 1 from all row positions. */
	displayRowStart: number
	/** Last grid row to render (exclusive, snapped to hour boundary). */
	displayRowEnd: number
}

const SCHEDULE_START_HOUR = 10 // 10:00 AM local time
const DEFAULT_CUTOFF_HOUR = 3  // 3:00 AM local time
// Montreal is EDT (UTC−4) in summer. Used to convert local hours → UTC.
const UTC_OFFSET = 4

/**
 * Build one ScheduleDay bucket per calendar day from startDate to endDate.
 * dayStart = that day at SCHEDULE_START_HOUR local time (UTC)
 * dayEnd   = next day at nightCutoffHour local time (UTC)
 */
function buildDayBuckets(
	startDate: string,
	endDate: string,
	cutoffHour: number,
): Array<{ date: string; dayStart: Date; dayEnd: Date }> {
	const buckets: Array<{ date: string; dayStart: Date; dayEnd: Date }> = []

	// Parse as UTC date strings (YYYY-MM-DD) and iterate day by day
	const start = new Date(`${startDate}T00:00:00Z`)
	const end = new Date(`${endDate}T00:00:00Z`)

	const current = new Date(start)
	while (current <= end) {
		const yyyy = current.getUTCFullYear()
		const mm = String(current.getUTCMonth() + 1).padStart(2, '0')
		const dd = String(current.getUTCDate()).padStart(2, '0')
		const dateStr = `${yyyy}-${mm}-${dd}`

		// Day starts at SCHEDULE_START_HOUR local = SCHEDULE_START_HOUR + UTC_OFFSET in UTC
		const dayStart = new Date(
			`${dateStr}T${String(SCHEDULE_START_HOUR + UTC_OFFSET).padStart(2, '0')}:00:00Z`,
		)

		// Day ends at cutoffHour on the NEXT calendar day
		const nextDay = new Date(current)
		nextDay.setUTCDate(nextDay.getUTCDate() + 1)
		const nextYyyy = nextDay.getUTCFullYear()
		const nextMm = String(nextDay.getUTCMonth() + 1).padStart(2, '0')
		const nextDd = String(nextDay.getUTCDate()).padStart(2, '0')
		const dayEnd = new Date(
			`${nextYyyy}-${nextMm}-${nextDd}T${String(cutoffHour + UTC_OFFSET).padStart(2, '0')}:00:00Z`,
		)

		buckets.push({ date: dateStr, dayStart, dayEnd })
		current.setUTCDate(current.getUTCDate() + 1)
	}

	return buckets
}

function toGridRow(time: Date, dayStart: Date): number {
	const minutes = (time.getTime() - dayStart.getTime()) / 60000
	return Math.floor(minutes / 15) + 1
}

/**
 * Column 1 is always the time label.
 * Event columns start at 2.
 * A room's column = its index in the rooms array + 2.
 * An event with no room spans all event columns.
 */
function toGridColumn(track: string | null, rooms: Room[]): string {
	if (track && rooms.length > 0) {
		const idx = rooms.findIndex((r) => r.key === track)
		if (idx !== -1) return String(idx + 2)
	}
	const lastCol = rooms.length > 0 ? rooms.length + 2 : 3
	return `2 / ${lastCol}`
}

/**
 * For events in the same grid column, detect time overlaps and assign a lane
 * index (0-based) and total lane count so the UI can split the column width.
 */
function assignOverlapLanes(events: ScheduleEvent[]): ScheduleEvent[] {
	// Group by exact gridColumn string — only events in the same column can overlap
	const byColumn = new Map<string, ScheduleEvent[]>()
	for (const e of events) {
		const col = e.gridColumn
		if (!byColumn.has(col)) byColumn.set(col, [])
		byColumn.get(col)!.push(e)
	}

	const result: ScheduleEvent[] = []

	for (const group of byColumn.values()) {
		const sorted = [...group].sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

		// Greedy lane assignment: find first free lane at event start
		const laneEnds: Date[] = []
		for (const event of sorted) {
			let lane = laneEnds.findIndex((end) => end <= event.startDate)
			if (lane === -1) {
				lane = laneEnds.length
				laneEnds.push(event.endDate)
			} else {
				laneEnds[lane] = event.endDate
			}
			event.overlapLane = lane
		}

		// overlapTotal = highest lane index among all events that overlap this one, + 1
		for (const event of sorted) {
			let maxLane = event.overlapLane
			for (const other of sorted) {
				if (other !== event && event.startDate < other.endDate && event.endDate > other.startDate) {
					maxLane = Math.max(maxLane, other.overlapLane)
				}
			}
			event.overlapTotal = maxLane + 1
			result.push(event)
		}
	}

	return result
}

export function groupEventsByDay(
	rawEvents: ScheduleEventRaw[],
	rawRooms: NonNullable<SCHEDULE_QUERY_RESULT>['rooms'],
	startDate: string | null,
	endDate: string | null,
	nightCutoffHour: number | null,
): ScheduleDay[] {
	const rooms = (rawRooms ?? []).filter((r) => r.key != null) as Room[]

	const cutoff = nightCutoffHour ?? DEFAULT_CUTOFF_HOUR

	// Fall back to a single placeholder day if no dates configured
	if (!startDate || !endDate) {
		return []
	}

	const buckets = buildDayBuckets(startDate, endDate, cutoff)

	// Group raw events into the correct day bucket
	const eventsByDate = new Map<string, ScheduleEventRaw[]>(
		buckets.map((b) => [b.date, []]),
	)

	for (const e of rawEvents) {
		if (!e.start) continue
		const eventStart = new Date(e.start)
		const bucket = buckets.find(
			(b) => eventStart >= b.dayStart && eventStart < b.dayEnd,
		)
		if (bucket) eventsByDate.get(bucket.date)?.push(e)
	}

	return buckets.map(({ date, dayStart, dayEnd }) => {
		const mapped = (eventsByDate.get(date) ?? [])
			.filter((e) => e.start != null)
			.sort((a, b) => new Date(a.start!).getTime() - new Date(b.start!).getTime())
			.map((e) => {
				const start = new Date(e.start!)
				const end = e.end ? new Date(e.end) : new Date(start.getTime() + 3600000)
				return {
					...e,
					startDate: start,
					endDate: end,
					gridRowStart: toGridRow(start, dayStart),
					gridRowEnd: toGridRow(end, dayStart),
					gridColumn: toGridColumn(e.track ?? null, rooms),
					overlapLane: 0,
					overlapTotal: 1,
				}
			})

		const events: ScheduleEvent[] = assignOverlapLanes(mapped)

		// Crop the visible grid to the actual event range, with a 1-hour buffer on each side.
		// Each hour = 4 rows (15 min each). Row formula: hourIndex * 4 + 1.
		const FULL_ROW_START = 1
		const FULL_ROW_END = TIME_LABELS[TIME_LABELS.length - 1].row + 4
		let displayRowStart = FULL_ROW_START
		let displayRowEnd = FULL_ROW_END
		if (events.length > 0) {
			const minRow = Math.min(...events.map((e) => e.gridRowStart))
			const maxRow = Math.max(...events.map((e) => e.gridRowEnd))
			// Snap first event to hour, then subtract 1 hour buffer
			const firstHour = Math.floor((minRow - 1) / 4) * 4 + 1
			displayRowStart = Math.max(FULL_ROW_START, firstHour - 4)
			// Snap last event to hour, then add 1 hour buffer — unless it reaches the day cutoff
			const lastHour = Math.ceil((maxRow - 1) / 4) * 4 + 1
			displayRowEnd = maxRow >= FULL_ROW_END ? FULL_ROW_END : Math.min(FULL_ROW_END, lastHour + 4)
		}

		return { date, dayStart, dayEnd, events, rooms, displayRowStart, displayRowEnd }
	})
}

export function formatTimeEDT(date: Date, lang: Locales): string {
	return formatInTimeZone(date, TZ, 'HH:mm', { locale: lang === 'fr' ? fr : enCA })
}

/** Format a Date as YYYYMMDDTHHMMSS in EDT, for Google Calendar URLs. */
export function formatGCalDate(date: Date): string {
	return formatInTimeZone(date, TZ, "yyyyMMdd'T'HHmmss")
}

/** Derive a day tab label from the day's date string. */
export function getDayLabel(date: string, lang: Locales): string {
	// Parse at noon UTC to avoid any day-boundary shift
	const d = new Date(`${date}T12:00:00Z`)
	return formatInTimeZone(d, 'UTC', 'EEEE d', { locale: lang === 'fr' ? fr : enCA })
}

// 18 hour-labels from 10:00 to 03:00, placed at their grid row.
export const TIME_LABELS = Array.from({ length: 18 }, (_, i) => ({
	label: `${String((SCHEDULE_START_HOUR + i) % 24).padStart(2, '0')}:00`,
	row: i * 4 + 1,
}))
