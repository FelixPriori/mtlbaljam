'use client'
import { useTranslations } from 'next-intl'
import styles from './styles.module.scss'
import GoogleMaps from '@/app/[locale]/components/CustomGoogleMap'

const keys = ['plane', 'train', 'bus'] as string[]

export default function ToMontreal() {
	const t = useTranslations('MtlBalJam.travelPage.toMontreal')
	return (
		<section className={styles.toMontrealSection}>
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
								zoom={key === 'plane' ? 13 : 15}
							/>
						</div>
						<div>
							<h3 className={styles.modeTitle}>{t(`${key}.title`)}</h3>
							<p className={styles.modePlace}>{t(`${key}.place`)}</p>
							<p className={styles.modeAddress}>{t(`${key}.address`)}</p>
							{key === 'plane' && (
								<p>
									{t.rich(`${key}.details`, {
										br: () => <br />,
									})}
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

/*
// (-0.0005)
// (-0.0026142)
*/
