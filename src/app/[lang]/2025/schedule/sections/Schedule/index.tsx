import styles from './styles.module.scss'
import Link from 'next/link'
import { DictionaryType } from '@/app/[lang]/dictionaries'
import { Locales } from '@/i18n'
import CustomDayCalendar from '../../components/CustomDayCalendar'
import CustomNightCalendar from '../../components/CustomNightCalendar'
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
		</section>
	)
}
