import type { Locales } from '@/i18n'
import type { ScheduleDay } from '../../scheduleUtils'
import ScheduleTabs from '../../components/ScheduleTabs'
import styles from './styles.module.scss'

export default function Schedule({
	days,
	lang,
	year,
	scheduleTitle,
	scheduleSoonLabel,
	venueLocation,
}: {
	days: ScheduleDay[]
	lang: Locales
	year: string
	scheduleTitle: string | null
	scheduleSoonLabel: string | null
	venueLocation: string | null
}) {
	const title = scheduleTitle ?? (lang === 'fr' ? 'Horaire' : 'Schedule')

	return (
		<section className={styles.scheduleSection}>
			<h2 className={styles.title}>{title}</h2>
			<ScheduleTabs
				days={days}
				lang={lang}
				year={year}
				scheduleSoonLabel={scheduleSoonLabel}
				venueLocation={venueLocation}
			/>
		</section>
	)
}
