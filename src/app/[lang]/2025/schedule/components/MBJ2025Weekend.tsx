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
import './styles.scss'

interface MBJ2025WeekendProps extends WeekProps {
	date: Date
	localizer: DateLocalizer
	max: Date
	min: Date
	scrollToTime: Date
}

export default function MBJ2025Weekend({
	date,
	localizer,
	max = localizer.endOf(new Date(), 'day'),
	min = localizer.startOf(new Date(), 'day'),
	scrollToTime = localizer.startOf(new Date(), 'day'),
	...props
}: MBJ2025WeekendProps) {
	const currRange = useMemo(
		() => MBJ2025Weekend.range(date, { localizer }),
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

MBJ2025Weekend.range = (
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

MBJ2025Weekend.navigate = (
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

MBJ2025Weekend.title = () => `MTL BAL JAM 2025`
