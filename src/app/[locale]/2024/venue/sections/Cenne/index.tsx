'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import GoogleMaps from '@/app/[locale]/components/CustomGoogleMap'

export default function Cenne() {
	const t = useTranslations('MtlBalJam.2024.venuePage.cenne')
	return (
		<section className={styles.mapSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				<div className={styles.mapContainer}>
					<GoogleMaps
						lat={t('position.lat')}
						lng={t('position.lng')}
						markerTitle={t('markerTitle')}
						infoWindowText={t('infoWindowText')}
						mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MBJ_MAP_ID as string}
					/>
				</div>
				<div className={styles.text}>
					<h3>{t('venueName')}</h3>
					<p>{t('venueDescription')}</p>
					<p>{t('venueAddress')}</p>
					<a target="_blank" rel="norefferer" href={t('venueWebsite')}>
						{t('venueWebsite')}
					</a>
				</div>
			</div>
		</section>
	)
}
