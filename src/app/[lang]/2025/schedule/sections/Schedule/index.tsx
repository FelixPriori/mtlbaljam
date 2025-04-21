import styles from './styles.module.scss'
import Link from 'next/link'
import { DictionaryType } from '@/app/[lang]/dictionaries'
import { Locales } from '@/i18n'
import CustomDayCalendar from '../../components/CustomDayCalendar'
import CustomNightCalendar from '../../components/CustomNightCalendar'
import TextSchedule from '../../components/TextSchedule'

export type CustomEventType = {
	id: string
	start: string
	end: string
	title: string
}

export type CustomParsedEventType = {
	id: string
	start: Date
	end: Date
	title: string
}

export default function Schedule({
	schedule,
	lang,
}: {
	schedule: DictionaryType['mbj2025']['schedulePage']['schedule']
	lang: Locales
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
				<CustomDayCalendar events={schedule.events} lang={lang} />
				<CustomNightCalendar events={schedule.events} lang={lang} />
			</div>
			<h2>{schedule.textTitle}</h2>
			<TextSchedule events={schedule.events} lang={lang} />
		</section>
	)
}
