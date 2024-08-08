'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import Day from '../../components/Day'
import Link from 'next/link'

type EventDays = 'friday' | 'saturday' | 'sunday'

const days: EventDays[] = ['friday', 'saturday', 'sunday']

export default function Schedule() {
	const t = useTranslations('MtlBalJam.2024.schedulePage.schedule')

	return (
		<section className={styles.scheduleSection}>
			<h2>{t('title')}</h2>
			<div className={styles.linkWrapper}>
				<Link className={styles.link} href={t('link.href')}>
					{t('link.text')}
				</Link>
			</div>
			<div className={styles.scheduleWrapper}>
				{days.map(d => (
					<Day key={d} day={d} />
				))}
			</div>
		</section>
	)
}
