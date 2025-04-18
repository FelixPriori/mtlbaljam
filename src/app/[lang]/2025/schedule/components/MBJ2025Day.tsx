'use client'
import {
	DateLocalizer,
	DayProps,
	Navigate,
	NavigateAction,
} from 'react-big-calendar'
// @ts-ignore
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import { useMemo } from 'react'
import './styles.scss'
// import './day.scss'

interface MBJ2025WeekendProps extends DayProps {
	date: Date
	localizer: DateLocalizer
	max: Date
	min: Date
	scrollToTime: Date
}

export default function MBJ2025Day({
	date,
	localizer,
	max = localizer.endOf(new Date(), 'day'),
	min = localizer.startOf(new Date(), 'day'),
	scrollToTime = localizer.startOf(new Date(), 'day'),
	...props
}: MBJ2025WeekendProps) {
	const currRange = useMemo(() => MBJ2025Day.range(date), [date])

	return (
		<TimeGrid
			date={date}
			eventOffset={15}
			localizer={localizer}
			max={max}
			min={min}
			range={currRange}
			scrollToTime={scrollToTime}
			{...props}
		/>
	)
}

MBJ2025Day.range = (date: Date) => [date]

MBJ2025Day.navigate = (
	date: Date,
	action: NavigateAction,
	{ localizer }: { localizer: DateLocalizer },
) => {
	switch (action) {
		case Navigate.PREVIOUS:
			return localizer.add(date, -1, 'day')
		case Navigate.NEXT:
			return localizer.add(date, 1, 'day')
		default:
			return date
	}
}

MBJ2025Day.title = () => `MTL BAL JAM 2025`
