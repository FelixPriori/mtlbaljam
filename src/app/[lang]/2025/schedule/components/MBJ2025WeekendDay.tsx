'use client'
import {
	DateLocalizer,
	Navigate,
	NavigateAction,
	WeekProps,
} from 'react-big-calendar'
// @ts-ignore
import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import { useMemo } from 'react'
import * as dates from 'date-arithmetic'

interface MBJ2025WeekendDayProps extends WeekProps {
	date: Date
	localizer: DateLocalizer
	max: Date
	min: Date
	scrollToTime: Date
}

export default function MBJ2025WeekendDay({
	date,
	localizer,
	min = new Date(2025, 6, 21, 11),
	max = localizer.endOf(new Date(), 'day'),
	scrollToTime = new Date(2025, 6, 21, 9, 30),
	...props
}: MBJ2025WeekendDayProps) {
	const currRange = useMemo(
		() => MBJ2025WeekendDay.range(date, { localizer }),
		[date, localizer],
	)

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

MBJ2025WeekendDay.range = (
	date: Date,
	{ localizer }: { localizer: DateLocalizer },
) => {
	const start = date
	const end = dates.add(start, 2, 'day')

	let current = start
	const range = []

	while (localizer.lte(current, end, 'day')) {
		range.push(current)
		current = localizer.add(current, 1, 'day')
	}

	return range
}

MBJ2025WeekendDay.navigate = (
	date: Date,
	action: NavigateAction,
	{ localizer }: { localizer: DateLocalizer },
) => {
	switch (action) {
		case Navigate.PREVIOUS:
			return localizer.add(date, -3, 'day')

		case Navigate.NEXT:
			return localizer.add(date, 3, 'day')

		default:
			return date
	}
}

MBJ2025WeekendDay.title = () => `MTL BAL JAM 2025`
