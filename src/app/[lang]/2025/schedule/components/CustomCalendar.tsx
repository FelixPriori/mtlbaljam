'use client'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { startOfWeek } from 'date-fns/startOfWeek'
import { getDay } from 'date-fns/getDay'
import { useMemo } from 'react'
import { Locales } from '@/i18n'
import { enCA, fr } from 'date-fns/locale'
import MBJ2025Weekend from './MBJ2025Weekend'
import MBJ2025Day from './MBJ2025Day'

type CustomEventType = { id: string; start: string; end: string; title: string }

const parseEventDate = (event: CustomEventType) => ({
	...event,
	start: new Date(event.start),
	end: new Date(event.end),
})

export default function CustomCalendar({
	events,
	lang,
}: {
	events: CustomEventType[]
	lang: Locales
}) {
	const { defaultDate, views, parsedEvents, localizer } = useMemo(
		() => ({
			defaultDate: new Date('2025-06-21'),
			views: {
				week: MBJ2025Weekend,
				day: MBJ2025Day,
			},
			parsedEvents: events.map(parseEventDate),
			localizer: dateFnsLocalizer({
				format,
				parse,
				startOfWeek,
				getDay,
				locales: lang === 'fr' ? { fr } : { 'en-CA': enCA },
			}),
		}),
		[events, lang],
	)

	return (
		<Calendar
			defaultDate={defaultDate}
			defaultView={Views.WEEK}
			events={parsedEvents}
			localizer={localizer}
			views={views}
			culture={lang === 'fr' ? 'fr' : 'en-CA'}
			selectable={false}
			showMultiDayTimes={true}
		/>
	)
}
