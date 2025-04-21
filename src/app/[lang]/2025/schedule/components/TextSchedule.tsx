import { CustomEventType } from '../sections/Schedule'
import { format } from 'date-fns'
import * as dates from 'date-arithmetic'
import { Locales } from '@/i18n'
import { enCA, fr } from 'date-fns/locale'
import TextEvent from './TextEvent'
import styles from './textEvent.module.scss'

const isBeforeThreeAM = (event: CustomEventType) => {
	const hours = dates.hours(new Date(event.end))
	return hours >= 0 && hours <= 3
}

const breakEventsByDay = (events: CustomEventType[]) => {
	const friday: CustomEventType[] = []
	const saturday: CustomEventType[] = []
	const sunday: CustomEventType[] = []

	events.forEach(event => {
		const day = dates.day(new Date(event.start))
		console.log(day)
		if (day === 5) {
			friday.push(event)
		} else if (day === 6) {
			if (isBeforeThreeAM(event)) {
				friday.push(event)
			} else {
				saturday.push(event)
			}
		} else if (day === 0) {
			if (isBeforeThreeAM(event)) {
				saturday.push(event)
			} else {
				sunday.push(event)
			}
		}
	})
	return {
		friday,
		saturday,
		sunday,
	}
}

export default function TextSchedule({
	events,
	lang,
}: {
	events: CustomEventType[]
	lang: Locales
}) {
	const eventDays = breakEventsByDay(events)

	return (
		<div className={styles.textSchedule}>
			<h3 className={styles.day}>
				{format(new Date(eventDays.friday[0].start), 'EEEE d', {
					locale: lang === 'fr' ? fr : enCA,
				})}
			</h3>
			<ul>
				{eventDays.friday.map(event => (
					<TextEvent key={event.id} event={event} />
				))}
			</ul>
			<h3 className={styles.day}>
				{format(new Date(eventDays.saturday[0].start), 'EEEE d', {
					locale: lang === 'fr' ? fr : enCA,
				})}
			</h3>
			<ul>
				{eventDays.saturday.map(event => (
					<TextEvent key={event.id} event={event} />
				))}
			</ul>
			<h3 className={styles.day}>
				{format(new Date(eventDays.sunday[0].start), 'EEEE d', {
					locale: lang === 'fr' ? fr : enCA,
				})}
			</h3>
			<ul>
				{eventDays.sunday.map(event => (
					<TextEvent key={event.id} event={event} />
				))}
			</ul>
		</div>
	)
}
