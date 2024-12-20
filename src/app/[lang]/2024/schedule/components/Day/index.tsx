import styles from './styles.module.scss'
import Event from '../Event'
import { Days, EventList } from '../../sections/Schedule'

export default function Day({
	day,
	eventList,
}: {
	day: Days
	eventList: EventList[]
}) {
	return (
		<div className={styles.day}>
			<div className={styles.titleWrapper}>
				<h3>{day.title}</h3>
			</div>
			<ul className={styles.eventsList}>
				{eventList.map(e => (
					<Event
						key={e}
						title={day.events[e].title}
						time={day.events[e].time}
						location={day.events[e].location}
						type={day.events[e].type}
					/>
				))}
			</ul>
		</div>
	)
}
