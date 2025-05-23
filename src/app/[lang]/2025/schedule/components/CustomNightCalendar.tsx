'use client'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { startOfWeek } from 'date-fns/startOfWeek'
import { getDay } from 'date-fns/getDay'
import { useMemo } from 'react'
import { Locales } from '@/i18n'
import { enCA, fr } from 'date-fns/locale'
import MBJ2025WeekendNight from './MBJ2025WeekendNight'
import * as dates from 'date-arithmetic'
import './styles.scss'
import { CustomEventType, CustomParsedEventType } from '../sections/Schedule'

const parseEventDate = (event: CustomEventType) => ({
	...event,
	start: new Date(event.start),
	end: new Date(event.end),
})

const isBeforeThreeAM = (event: CustomParsedEventType) => {
	const hours = dates.hours(event.end)
	return hours >= 0 && hours <= 3
}

export default function CustomNightCalendar({
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
				week: MBJ2025WeekendNight,
			},
			parsedEvents: events.map(parseEventDate).filter(isBeforeThreeAM),
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
		<div className="calendar night">
			<Calendar
				defaultDate={defaultDate}
				defaultView={Views.WEEK}
				events={parsedEvents}
				localizer={localizer}
				views={views}
				culture={lang === 'fr' ? 'fr' : 'en-CA'}
				selectable={false}
				date={new Date(2025, 5, 21, 0, 0, 0)}
			/>
		</div>
	)
}
