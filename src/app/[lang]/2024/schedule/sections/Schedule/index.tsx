import styles from './styles.module.scss'
import Day from '../../components/Day'
import Link from 'next/link'
import { DictionaryType } from '@/app/[lang]/dictionaries'

type EventDays = 'friday' | 'saturday' | 'sunday'

const days: EventDays[] = ['friday', 'saturday', 'sunday']

export type Days =
	DictionaryType['mbj2024']['schedulePage']['schedule'][EventDays]

export type EventList = keyof Days['events']

export default function Schedule({
	schedule,
}: {
	schedule: DictionaryType['mbj2024']['schedulePage']['schedule']
}) {
	return (
		<section className={styles.scheduleSection}>
			<h2>{schedule.title}</h2>
			<div className={styles.linkWrapper}>
				<Link className={styles.link} href={schedule.link.href}>
					{schedule.link.text}
				</Link>
			</div>
			<div className={styles.scheduleWrapper}>
				{days.map(d => (
					<Day
						key={d}
						day={schedule[d]}
						eventList={Object.keys(schedule[d].events) as EventList[]}
					/>
				))}
			</div>
		</section>
	)
}
