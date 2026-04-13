'use client'

import { useState } from 'react'
import type { Locales } from '@/i18n'
import type { ScheduleDay } from '../../scheduleUtils'
import { getDayLabel } from '../../scheduleUtils'
import DayPanel from '../DayPanel'
import styles from './styles.module.scss'

export default function ScheduleTabs({
	days,
	lang,
	year,
	scheduleSoonLabel,
	venueLocation,
}: {
	days: ScheduleDay[]
	lang: Locales
	year: string
	scheduleSoonLabel: string | null
	venueLocation: string | null
}) {
	const [activeDate, setActiveDate] = useState<string>(days[0]?.date ?? '')

	return (
		<div className={styles.tabs}>
			<div className={styles.tabList} role="tablist">
				{days.map((day) => (
					<button
						key={day.date}
						role="tab"
						aria-selected={activeDate === day.date}
						aria-controls={`panel-${day.date}`}
						className={styles.tab}
						data-active={String(activeDate === day.date)}
						onClick={() => setActiveDate(day.date)}
					>
						{getDayLabel(day.date, lang)}
					</button>
				))}
			</div>

			{days.map((day) => (
				<div
					key={day.date}
					id={`panel-${day.date}`}
					role="tabpanel"
					hidden={activeDate !== day.date}
					className={styles.panel}
				>
					<DayPanel day={day} lang={lang} year={year} scheduleSoonLabel={scheduleSoonLabel} venueLocation={venueLocation} />
				</div>
			))}
		</div>
	)
}
