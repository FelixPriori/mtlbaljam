import { format } from 'date-fns'
import { CustomEventType } from '../sections/Schedule'
import styles from './textEvent.module.scss'

const formatTime = (date: Date) => format(date, 'hh:mm aa')

export default function TextEvent({ event }: { event: CustomEventType }) {
	return (
		<li className={styles.textEvent}>
			<p className={styles.time}>
				[{formatTime(new Date(event.start))} - {formatTime(new Date(event.end))}
				]
			</p>
			<p className={styles.title}>{event.title}</p>
		</li>
	)
}
