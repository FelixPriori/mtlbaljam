'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import GoogleMaps from '@/app/[locale]/components/CustomGoogleMap'

const keys = ['casa', 'cenne', 'jarry'] as string[]

export default function ToMontreal() {
	const t = useTranslations('MtlBalJam.travelPage.toTheEvent')
	return (
		<section className={styles.toTheEventSection}>
			<h2>{t('title')}</h2>
			<div className={styles.content}>
				{keys.map(key => (
					<div key={key} className={styles.mode}>
						<div className={styles.mapContainer}>
							<GoogleMaps
								lat={t(`${key}.location.lat`)}
								lng={t(`${key}.location.lng`)}
								markerTitle={t(`${key}.location.markerTitle`)}
								infoWindowText={t(`${key}.location.infoWindowText`)}
								mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MBJ_MAP_ID as string}
								zoom={16}
							/>
						</div>
						<div>
							<h3 className={styles.modeTitle}>{t(`${key}.title`)}</h3>
							<p className={styles.modeEvents}>{t(`${key}.events`)}</p>
							<p className={styles.modeAddress}>{t(`${key}.address`)}</p>
							<p className={styles.intersection}>{t(`${key}.intersection`)}</p>
							<p className={styles.metro}>
								{t('metroPrefix')}
								{t(`${key}.metro`)}
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
