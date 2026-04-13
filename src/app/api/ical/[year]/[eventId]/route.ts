import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity/client'
import { defineQuery } from 'next-sanity'

const ICAL_EVENT_QUERY = defineQuery(`
  *[_type == "eventEdition" && year == $year][0]{
    "venueAddress": venueRef->address,
    "venueName": venueRef->name,
    "event": scheduleEvents[_key == $eventId][0] {
      "_key": _key,
      title,
      start,
      end,
      type,
      "location": location->{ name, address },
      "musicRef": musicRef->{ name },
      instructorRef->{ name }
    }
  }
`)

function formatICSDate(date: Date): string {
	// Format as YYYYMMDDTHHMMSSZ (UTC)
	return date.toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z'
}

function escapeICS(str: string): string {
	return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ year: string; eventId: string }> },
) {
	const { year, eventId } = await params
	const yearNum = Number(year)

	if (isNaN(yearNum)) {
		return NextResponse.json({ error: 'Invalid year' }, { status: 400 })
	}

	const data = await sanityClient.fetch(ICAL_EVENT_QUERY, {
		year: yearNum,
		eventId,
	})

	const event = data?.event
	if (!event || !event.start) {
		return NextResponse.json({ error: 'Event not found' }, { status: 404 })
	}

	const startDate = new Date(event.start)
	const endDate = event.end ? new Date(event.end) : new Date(startDate.getTime() + 3600000)
	const now = new Date()

	const titleEn = event.title?.en ?? event.title?.fr ?? 'MTL BAL JAM Event'
	const summary = escapeICS(`MTL BAL JAM ${year} — ${titleEn}`)
	const locationStr =
		event.location?.address ??
		event.location?.name ??
		data?.venueAddress ??
		data?.venueName ??
		'Montréal / Tiohtià:ke'
	const location = escapeICS(locationStr)
	const performer = event.musicRef?.name ?? event.instructorRef?.name
	const description = escapeICS([event.type, performer].filter(Boolean).join(' · '))

	const ics = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		`PRODID:-//MTL BAL JAM//mtlbaljam.org//EN`,
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		'BEGIN:VEVENT',
		`UID:${eventId}@mtlbaljam.org`,
		`DTSTAMP:${formatICSDate(now)}`,
		`DTSTART:${formatICSDate(startDate)}`,
		`DTEND:${formatICSDate(endDate)}`,
		`SUMMARY:${summary}`,
		`LOCATION:${location}`,
		description ? `DESCRIPTION:${description}` : null,
		`URL:https://mtlbaljam.org/en/${year}/schedule`,
		'END:VEVENT',
		'END:VCALENDAR',
	]
		.filter(Boolean)
		.join('\r\n')

	return new NextResponse(ics, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': `attachment; filename="mtlbaljam-${year}-${eventId}.ics"`,
			'Cache-Control': 'public, max-age=3600',
		},
	})
}
