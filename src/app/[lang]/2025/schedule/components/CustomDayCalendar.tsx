'use client'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { startOfWeek } from 'date-fns/startOfWeek'
import { getDay } from 'date-fns/getDay'
import { useMemo } from 'react'
import { Locales } from '@/i18n'
import { enCA, fr } from 'date-fns/locale'
import MBJ2025WeekendDay from './MBJ2025WeekendDay'
import * as dates from 'date-arithmetic'
import './styles.scss'

type CustomEventType = { id: string; start: string; end: string; title: string }

const parseEventDate = (event: CustomEventType) => ({
	...event,
	start: new Date(event.start),
	end: new Date(event.end),
})

type CustomParsedEventType = {
	id: string
	start: Date
	end: Date
	title: string
}
const isAfter9AM = (event: CustomParsedEventType) => {
	const hours = dates.hours(event.start)
	return hours >= 9
}

export default function CustomDayCalendar({
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
				week: MBJ2025WeekendDay,
			},
			parsedEvents: events.map(parseEventDate).filter(isAfter9AM),
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
		<div className="calendar day">
			<Calendar
				defaultDate={defaultDate}
				defaultView={Views.WEEK}
				events={parsedEvents}
				localizer={localizer}
				views={views}
				culture={lang === 'fr' ? 'fr' : 'en-CA'}
				selectable={false}
			/>
		</div>
	)
}
