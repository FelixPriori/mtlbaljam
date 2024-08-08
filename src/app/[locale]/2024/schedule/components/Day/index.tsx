'use client'
import styles from './styles.module.scss'
import Event from '../Event'
import { useTranslations } from 'next-intl'

export default function Day({
	day,
}: {
	day: 'friday' | 'saturday' | 'sunday'
}) {
	const t = useTranslations(`MtlBalJam.2024.schedulePage.schedule.${day}`)

	const eventList = t('eventsList').split(',')

	return (
		<div className={styles.day}>
			<div className={styles.titleWrapper}>
				<h3>{t('title')}</h3>
			</div>
			<ul className={styles.eventsList}>
				{eventList.map(e => (
					<Event
						key={e}
						title={t(`events.${e}.title`)}
						time={t(`events.${e}.time`)}
						location={t(`events.${e}.location`)}
						type={t(`events.${e}.type`)}
					/>
				))}
			</ul>
		</div>
	)
}
