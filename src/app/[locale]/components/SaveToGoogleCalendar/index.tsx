'use client'
import { Roboto } from 'next/font/google'
import styles from './styles.module.scss'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['700'],
	style: ['normal'],
})

export default function SaveToGoogleCalendar() {
	const t = useTranslations('MtlBalJam.header')
	return (
		<a
			className={`${styles.googleLink} ${roboto.className}`}
			target="_blank"
			href="https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=NHB2dmE2NWZpMGVicHQybnFmNzYxbGU3Y3QgY181NWIzOTE2YTcxNWIyYzg1MTBmYzY5MmQ1M2M1NWMzZDc4OWNjNDIzNDA5MzIxZGEyNjJmM2I5MzZmNzQyOGZkQGc&amp;tmsrc=c_55b3916a715b2c8510fc692d53c55c3d789cc423409321da262f3b936f7428fd%40group.calendar.google.com"
		>
			<Image
				src="/google-calendar.png"
				width={32}
				height={32}
				alt="google calendar logo"
			/>
			{t('googleCal')}
		</a>
	)
}
