import styles from './styles.module.scss'
import GoogleMaps from '@/app/[lang]/components/CustomGoogleMap'
import { DictionaryType } from '@/app/[lang]/dictionaries'

export default function Cenne({
	cenne,
}: {
	cenne: DictionaryType['mbj2024']['venuePage']['cenne']
}) {
	return (
		<section className={styles.mapSection}>
			<h2>{cenne.title}</h2>
			<div className={styles.content}>
				<div className={styles.mapContainer}>
					<GoogleMaps
						lat={cenne.position.lat}
						lng={cenne.position.lng}
						markerTitle={cenne.markerTitle}
						infoWindowText={cenne.infoWindowText}
						mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MBJ_MAP_ID as string}
					/>
				</div>
				<div className={styles.text}>
					<h3>{cenne.venueName}</h3>
					<p>{cenne.venueDescription}</p>
					<p>{cenne.venueAddress}</p>
					<a target="_blank" rel="norefferer" href={cenne.venueWebsite}>
						{cenne.venueWebsite}
					</a>
				</div>
			</div>
		</section>
	)
}
