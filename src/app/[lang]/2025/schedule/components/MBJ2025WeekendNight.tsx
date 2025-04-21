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

interface MBJ2025WeekendNightProps extends WeekProps {
	date: Date
	localizer: DateLocalizer
	max: Date
	min: Date
	scrollToTime: Date
}

export default function MBJ2025WeekendNight({
	date,
	localizer,
	min = localizer.startOf(new Date(), 'day'),
	max = new Date(2025, 6, 21, 3, 30),
	scrollToTime = localizer.startOf(new Date(), 'day'),
	...props
}: MBJ2025WeekendNightProps) {
	const currRange = useMemo(
		() => MBJ2025WeekendNight.range(date, { localizer }),
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

MBJ2025WeekendNight.range = (
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

MBJ2025WeekendNight.navigate = (
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

MBJ2025WeekendNight.title = () => `MTL BAL JAM 2025`
